<script setup lang="ts">
import { useFocusWithin } from '@vueuse/core';
import { computed, reactive, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import _capitalize from 'lodash/capitalize';
import AppContainer from '@/components/layout/AppContainer.vue';
import AppButton from '@/components/shared/AppButton.vue';
import { useTasklistStore } from '@/stores/tasklistStore';
import type { Filter, Task, TaskFilterByStatus, TaskFilterByType } from '@/types/taskList';
import { EnumTaskStatus, EnumTaskType } from '@/types/taskList';

// I18n
const { t } = useI18n();

// Filters
const filtersByType: Array<Filter> = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: EnumTaskType.personal,
    label: 'Personal',
  },
  {
    value: EnumTaskType.work,
    label: 'Work',
  },
  {
    value: EnumTaskType.shopping,
    label: 'Shopping',
  },
  {
    value: EnumTaskType.others,
    label: 'Others',
  },
];
const filtersByStatus: Array<Filter> = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: EnumTaskStatus.completed,
    label: 'Completed',
  },
  {
    value: EnumTaskStatus.uncompleted,
    label: 'Uncompleted',
  },
];

// Types list
const typesList: Array<{ value: EnumTaskType, label: string }> = [
  {
    value: EnumTaskType.personal,
    label: 'Personal',
  },
  {
    value: EnumTaskType.work,
    label: 'Work',
  },
  {
    value: EnumTaskType.shopping,
    label: 'Shopping',
  },
  {
    value: EnumTaskType.others,
    label: 'Others',
  },
];

// Task-list store
const tasksStore = useTasklistStore();
tasksStore.fetchData();

// Current TaskFilterByType
const currentFilterByType = ref<TaskFilterByType>('all');

// Current EnumTaskStatus
const currentFilterByStatus = ref<TaskFilterByStatus>('all');

// New task form
const newTaskForm = reactive<{ title: string, type: EnumTaskType }>({
  title: '',
  type: EnumTaskType.personal,
});

// Edited task
const editedTask = ref<Task | null>(null);

// Add task
function addTask() {
  if (!newTaskForm.title)
    return;

  tasksStore.addTask({
    id: new Date().getTime(),
    title: _capitalize(newTaskForm.title.trim()),
    type: newTaskForm.type,
    status: EnumTaskStatus.uncompleted,
  });

  resetTaskForm();
}

// Delete task
function deleteTask(id: number) {
  if (tasksStore.loading)
    return;
  tasksStore.deleteTask(id);
}

// Reset task
function resetTaskForm() {
  newTaskForm.title = '';
  newTaskForm.type = EnumTaskType.personal;
}

// Toggle task
function toggleTask(id: number) {
  if (tasksStore.loading)
    return;
  tasksStore.toggleTaskStatus(id);
}

// Clear completed tasks
function clearCompletedTasks() {
  if (tasksStore.loading)
    return;
  tasksStore.clearCompletedTasks();
}

// Filtered tasks by status and status
const filteredTasksByStatusAndType = computed(() => {
  if (currentFilterByStatus.value === 'all' && currentFilterByType.value === 'all')
    return tasksStore.taskList;

  if (currentFilterByStatus.value === 'all')
    return tasksStore.taskList.filter(task => task.type === currentFilterByType.value);

  if (currentFilterByType.value === 'all')
    return tasksStore.taskList.filter(task => task.status === currentFilterByStatus.value);

  return tasksStore.taskList.filter(task => task.status === currentFilterByStatus.value && task.type === currentFilterByType.value);
});

// Computed number of uncompleted tasks
const uncompletedTasksCount = computed(() => tasksStore.taskList.filter(task => task.status === EnumTaskStatus.uncompleted).length);

let beforeEditCache: Task | null = null;

function onMountedForm({ el }: { el: HTMLFormElement }) {
  const { focused } = useFocusWithin(el);

  // watch focused
  watch(focused, (focused) => {
    if (!focused) { // if focus is lost
      if (editedTask.value)
        // doneEdit(editedTask.value);
        cancelEdit(editedTask.value);
    }
  });
}

function editTask(todo: Task) {
  if (tasksStore.loading)
    return;
  beforeEditCache = { ...todo };
  editedTask.value = todo;
}

function cancelEdit(todo: Task) {
  editedTask.value = null;
  if (beforeEditCache) {
    todo.title = beforeEditCache.title;
    todo.type = beforeEditCache.type;
  }
}

function doneEdit(todo: Task) {
  if (editedTask.value) {
    editedTask.value = null;
    todo.title = _capitalize(todo.title.trim());
    if (!todo.title)
      deleteTask(todo.id);
    else
      tasksStore.updateTask(todo);
  }
}

function onMountedInput({ el }: { el: HTMLInputElement }) {
  el.focus();
}
</script>

<template>
  <div class="mt-8 lg:mt-14 mb-10 lg:mb-16">
    <AppContainer>
      <h2 class="heading-2 mb-8">
        {{ t('pages.tasks.taskTitle') }} <span v-if="tasksStore?.loading" class="text-sm text-info">Processing...</span>
      </h2>
      <p v-if="tasksStore?.error" class="bg-danger text-danger-content px-3 py-2 rounded my-12">
        {{ tasksStore.error }}
      </p>

      <h3 class="heading-3">
        {{ t('pages.tasks.addTask') }}
      </h3>
      <!-- Form - Add task   -->
      <form class="mt-4 mb-6" @submit.prevent="addTask">
        <div class="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-3">
          <!-- Title -->
          <div class="md:col-span-2">
            <label for="taskTitle" class="block mb-2">{{ t('pages.tasks.form.title') }}</label>
            <input
              id="taskTitle"
              v-model="newTaskForm.title"
              type="text"
              class="w-full form-input"
              :placeholder="t('pages.tasks.form.titlePlaceholder') "
              required
            >
          </div>

          <!-- Task type -->
          <div class="md:col-span-2">
            <label for="taskType" class="block mb-2">{{ t('pages.tasks.form.type') }}</label>
            <select
              id="taskType"
              v-model="newTaskForm.type"
              class="w-full form-select"
            >
              <option v-for="type in typesList" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="btn btn--primary btn--lg h-10 md:col-span-2 self-end justify-self-start"
            :disabled="!newTaskForm.title"
          >
            {{ t('pages.tasks.form.add') }}
          </button>
        </div>
      </form>

      <!-- Tasks list -->
      <h3 class="heading-3">
        {{ t('pages.tasks.taskList') }}
      </h3>

      <!-- Filters   -->
      <div class="flex flex-col gap-1.5 my-4 md:flex-row md:items-center md:gap-6 md:my-6">
        <div class="flex items-baseline gap-x-3">
          <label for="filterByType">{{ t('pages.tasks.filterByType') }}</label>
          <select
            id="filterByType"
            v-model="currentFilterByType"
            class="form-select"
          >
            <option v-for="filter in filtersByType" :key="filter.value" :value="filter.value">
              {{ filter.label }}
            </option>
          </select>
        </div>
        <div class="flex items-baseline gap-x-3">
          <label for="filterByStatus">{{ t('pages.tasks.filterByStatus') }}</label>
          <select
            id="filterByStatus"
            v-model="currentFilterByStatus"
            class="form-select"
          >
            <option v-for="filter in filtersByStatus" :key="filter.value" :value="filter.value">
              {{ filter.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Task list -->
      <TransitionGroup name="fade" tag="ul" class="relative bg-white rounded-md border border-neutral">
        <template v-if="!tasksStore.taskList?.length">
          <li>
            <p class="px-4 py-3">
              {{ t('pages.tasks.noTasks') }}
            </p>
          </li>
        </template>
        <template v-else-if="filteredTasksByStatusAndType?.length">
          <li
            v-for="item in filteredTasksByStatusAndType" :key="item.id"
            class="relative flex flex-wrap md:items-center gap-x-3 gap-y-0 border-b last:border-b-0"
          >
            <p class="flex-grow py-2 px-3 md:py-3 md:px-4">
              <span :style="item.status === EnumTaskStatus.completed ? 'text-decoration: line-through;' : ''" @dblclick="editTask(item)">{{ item.title }}</span>&nbsp;
              <span class="badge badge--is-neutral"><span>{{ item.type }}</span></span>
            </p>
            <div class="flex items-center gap-x-3 py-2 px-3 md:py-0 md:px-4">
              <button class="btn btn--icon btn--sm" @click="editTask(item) ">
                <span class="sr-only">{{ t('pages.tasks.edit') }}</span>
                <Icon icon="material-symbols:edit" :inline="true" />
              </button>
              <button class="btn btn--icon btn--sm" @click="deleteTask(item.id) ">
                <Icon icon="material-symbols:delete" :inline="true" />
                <span class="sr-only">{{ t('pages.tasks.delete') }}</span>
              </button>
              <label class="flex items-center text-sm" :for="`taskCompleted-${item.id}`">
                <span class="mr-2">{{ t('pages.tasks.completed') }}</span>
                <input :id="`taskCompleted-${item.id}`" type="checkbox" :checked="item.status === EnumTaskStatus.completed" class="form-checkbox" @change="toggleTask(item.id)">
              </label>

              <!-- Edit task form -->
              <form
                v-if="item === editedTask"
                class="absolute inset-0 w-full h-full px-3 py-2 backdrop-blur-md bg-white/20"
                @submit.prevent="doneEdit(item)"
                @vue:mounted="onMountedForm"
              >
                <div class="flex flex-col md:flex-row items-center gap-3">
                  <label for="editTaskTitle" class="">{{ t('pages.tasks.form.title') }}</label>
                  <input
                    id="editTaskTitle"
                    v-model="item.title"
                    class="form-input py-1 text-sm min-w-[30%]"
                    type="text"
                    @vue:mounted="onMountedInput"
                    @keydown.enter.prevent=""
                  >
                  <label for="editTaskType" class="">{{ t('pages.tasks.form.type') }}</label>
                  <select
                    id="editTaskType"
                    v-model="editedTask.type"
                    class="form-select text-sm py-1"
                  >
                    <option v-for="type in typesList" :key="type.value" :value="type.value">
                      {{ type.label }}
                    </option>
                  </select>
                  <div class="flex gap-2 ml-auto">
                    <AppButton
                      size="sm"
                      color-variant="ghost"
                      :disabled="tasksStore.loading"
                      @click="cancelEdit(item)"
                    >
                      {{ t('common.cancel') }}
                    </AppButton>
                    <AppButton
                      size="sm"
                      color-variant="accent"
                      :disabled="tasksStore.loading"
                      type="submit"
                    >
                      {{ t('common.submit') }}
                    </AppButton>
                  </div>
                </div>
              </form>
            </div>
          </li>
        </template>
        <template v-else>
          <p class="px-4 py-3">
            {{ t('pages.tasks.filterNoResults') }}
          </p>
        </template>
      </TransitionGroup>

      <!-- Footer -->
      <div class="flex items-center mt-2 text-muted-text">
        <p v-if="filteredTasksByStatusAndType?.length > 0" class="text-sm">
          {{ t('pages.tasks.uncompletedTasks', { count: uncompletedTasksCount }) }}
        </p>
        <!-- Delete completed tasks     -->
        <AppButton
          v-if="uncompletedTasksCount < tasksStore.taskList.length"
          size="sm"
          color-variant="neutral"
          class="md:ml-auto"
          :disabled="tasksStore.loading"
          @click="clearCompletedTasks"
        >
          {{ t('pages.tasks.deleteCompleted') }}
        </AppButton>
      </div>
    </AppContainer>
  </div>
</template>

<style scoped lang="scss">
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
