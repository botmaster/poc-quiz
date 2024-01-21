// Type fot task types
export enum EnumTaskType { personal = 'personal', work = 'work', shopping = 'shopping', others = 'others' }

// Type for task status
export enum EnumTaskStatus { completed = 'completed', uncompleted = 'uncompleted' }

// Type for filters by type
export type TaskFilterByType = 'all' | EnumTaskType;

// Type for filters by status
export type TaskFilterByStatus = 'all' | EnumTaskStatus;

// Task interface
export interface Task {
  id: number
  title: string
  type: EnumTaskType
  status: EnumTaskStatus
}

// Filter interface
export interface Filter {
  value: TaskFilterByType | TaskFilterByStatus
  label: string
}
