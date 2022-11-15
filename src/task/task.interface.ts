export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  ON_PROGRESS = 'ON_PROGRESS',
  CLOSE = 'CLOSE',
}
