import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { TaskListResponse } from '../models/task-list-response';
import { ModelTaskResponse } from '../models/model-task-response';

const SERVER_URL = 'http://localhost:8089'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasksList(): Observable<TaskListResponse> {
    return this.http.get<TaskListResponse>(SERVER_URL + "/task/");
  }

  findTaskById(taskId: string): Observable<ModelTaskResponse> {
    return this.http.get<ModelTaskResponse>(SERVER_URL + "/task/" + taskId + "/");
  }
}
