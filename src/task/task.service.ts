import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.interface';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTask(id: string) {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  createTask(task: CreateTaskDto) {
    const { description, title } = task;
    const newTask: Task = {
      title,
      description,
      id: uuid(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }
}
