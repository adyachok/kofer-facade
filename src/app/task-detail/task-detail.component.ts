import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ModelTask } from '../models/model-task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task: ModelTask;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const task_id = params.get('task_id');
      this.taskService.findTaskById(task_id).subscribe((taskResponse) => {
        this.task = ModelTask.fromJson(taskResponse.payload);
        this.pollTaskUntillReady()
      });
    })
    
  }

  pollTaskUntillReady(): void {    
    if (!['FINISHED', 'ERROR'].includes(this.task.state)) {
      setTimeout(() => {
        this.taskService
          .findTaskById(this.task._id)
          .subscribe(
            (taskResponse) => {
              this.task = taskResponse.payload;
              if (!['FINISHED', 'ERROR'].includes(this.task.state)) {
                this.pollTaskUntillReady();
              }
            })} , 2000)
    }
  }

}
