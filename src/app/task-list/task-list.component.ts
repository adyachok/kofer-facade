import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ModelTask } from '../models/model-task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public tasks: ModelTask[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasksList().subscribe((objs) => {
      this.tasks = objs.payload.map((task) => ModelTask.fromJson(task));
    })
  }

}
