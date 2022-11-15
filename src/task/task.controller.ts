import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }
  @Get('/:id')
  async getTask(@Param('id') id: string) {
    return this.taskService.getTask(id);
  }
  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    return await this.taskService.createTask(task);
  }
}
