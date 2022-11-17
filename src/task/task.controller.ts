import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAllTasks() {}
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getTaskbById(id);
  }
  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    return;
  }
}
