import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ModelTask } from '../models/model-task';
import { _ } from 'underscore';
import { TaskListResponse } from '../models/task-list-response';

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
      this.pollTaskUntillReady();
    })
  }

  pollTaskUntillReady(): void {
    
    if (this.isNotReadyTask()) {
      setTimeout(() => {
        this.taskService
          .getTasksList()
          .subscribe(
            (taskResponse: TaskListResponse) => {
              this.tasks = taskResponse.payload;
              if (this.isNotReadyTask) {
                this.pollTaskUntillReady();
              }
            })} , 2000)
    }
  }

  isNotReadyTask(): boolean {
      const result = _.filter(this.tasks, (task) => !['FINISHED', 'ERROR'].includes(task.state));
      return _.size(result) !== 0;
  }

}
