import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import tasksLocalStorageService from '@/services/tasksLocalStorageService';
import { EnumTaskStatus } from '@/types/taskList';
import type { EnumTaskType, Task } from '@/types/taskList';

export const useTasklistStore = defineStore('task-list', () => {
  // Task-list
  const taskList = ref<Array<Task>>([]);

  // Error
  const error = ref<string | null>(null);

  // Loading
  const loading = ref<boolean>(false);

  // Load tasks
  async function fetchData() {
    try {
      loading.value = true;
      error.value = null;
      taskList.value = await tasksLocalStorageService.getAllTasks();
    }
    catch (e) {
      error.value = (e as Error).message;
    }
    finally {
      loading.value = false;
    }
  }

  // Add task
  async function addTask({ id, title, type, status }: { id?: number, title: string, type: EnumTaskType, status: EnumTaskStatus }) {
    try {
      loading.value = true;
      error.value = null;
      const task: Task = {
        id: id ?? new Date().getTime(),
        title,
        type,
        status,
      };

      await tasksLocalStorageService.saveTask(task);
      taskList.value = await tasksLocalStorageService.getAllTasks();
    }
    catch (e) {
      error.value = (e as Error).message;
    }
    finally {
      loading.value = false;
    }
  }

  // Update task
  async function updateTask(task: Task) {
    try {
      loading.value = true;
      error.value = null;
      await tasksLocalStorageService.updateTask(task);
      taskList.value = await tasksLocalStorageService.getAllTasks();
    }
    catch (e) {
      error.value = (e as Error).message;
    }
    finally {
      loading.value = false;
    }
  }

  // Delete task
  async function deleteTask(id: number) {
    try {
      loading.value = true;
      error.value = null;
      await tasksLocalStorageService.deleteTask(id);
      taskList.value = await tasksLocalStorageService.getAllTasks();
    }
    catch (e) {
      error.value = (e as Error).message;
    }
    finally {
      loading.value = false;
    }
  }

  // toggle task status
  async function toggleTaskStatus(id: number) {
    try {
      loading.value = true;
      error.value = null;
      const index = taskList.value.findIndex(task => task.id === id);
      if (index > -1) {
        const task = taskList.value[index];
        task.status = taskList.value[index].status === EnumTaskStatus.completed ? EnumTaskStatus.uncompleted : EnumTaskStatus.completed;
        await tasksLocalStorageService.updateTask(task);
        taskList.value = await tasksLocalStorageService.getAllTasks();
      }
    }
    catch (e) {
      error.value = (e as Error).message;
    }
    finally {
      loading.value = false;
    }
  }

  // Clear completed tasks
  async function clearCompletedTasks() {
    try {
      loading.value = true;
      error.value = null;
      const completedTasks = taskList.value.filter(task => task.status === EnumTaskStatus.completed);
      await tasksLocalStorageService.deleteTasks(completedTasks.map(task => task.id));
      taskList.value = await tasksLocalStorageService.getAllTasks();
    }
    catch (e) {
      error.value = (e as Error).message;
    }
    finally {
      loading.value = false;
    }
  }

  return {
    taskList,
    error,
    loading,
    fetchData,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    clearCompletedTasks,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTasklistStore, import.meta.hot));
