import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { TaskListResponse } from '../models/task-list-response';
import { ModelTaskResponse } from '../models/model-task-response';
import { environment } from 'src/environments/environment';
import { ModelTask } from '../models/model-task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasksList(): Observable<TaskListResponse> {
    return this.http.get<TaskListResponse>(environment.serverUrl + "/task/");
  }

  findTaskById(taskId: string): Observable<ModelTaskResponse> {
    return this.http.get<ModelTaskResponse>(environment.serverUrl + "/task/" + taskId + "/");
  }

  createTask(task: ModelTask): Observable<any> {
    return this.http.post(environment.serverUrl + '/task/', task);
  }
}
