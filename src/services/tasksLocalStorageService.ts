import type { Task } from '@/types/taskList';
import { randomInteger, sleep } from '@/utils/utils';

class TasksLocalStorageService {
  private readonly STORAGE_KEY = 'TASK_LIST';

  async getAllTasks(): Promise<Task[]> {
    const tasksJson = localStorage.getItem(this.STORAGE_KEY);

    await sleep({ delay: randomInteger(20, 800), errorMessage: 'Error while fetching tasks', errorProbability: 0 });
    if (tasksJson)
      return JSON.parse(tasksJson);

    return [];
  }

  async saveTask(task: Task) {
    const tasks = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    tasks.push(task);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  async updateTask(task: Task): Promise<void> {
    const tasks = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const index = tasks.findIndex((t: Task) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
    else {
      throw new Error(`Task with id ${task.id} not found`);
    }
  }

  async deleteTask(taskId: number) {
    const tasks = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const index = tasks.findIndex((t: Task) => t.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
    else {
      throw new Error(`Task with id ${taskId} not found`);
    }
  }

  async deleteTasks(taskIds: number[]) {
    const tasks = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    taskIds.forEach((taskId) => {
      const index = tasks.findIndex((t: Task) => t.id === taskId);
      if (index !== -1)
        tasks.splice(index, 1);

      else
        throw new Error(`Task with id ${taskId} not found`);
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }
}

export default new TasksLocalStorageService();
