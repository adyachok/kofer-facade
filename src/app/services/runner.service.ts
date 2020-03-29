import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Runner } from '../models/runner';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RunnerResponse } from '../models/runner-response';
import { RunnerListResponse } from '../models/runner-list-response';

@Injectable({
  providedIn: 'root'
})
export class RunnerService {

  constructor(private http: HttpClient) { }

  public getRunnerById(runnerId: string): Observable<RunnerResponse> {
    return this.http.get<RunnerResponse>(environment.serverUrl + "/runner/" + runnerId + "/");
  }

  public getRunners(): Observable<RunnerListResponse> {
    return this.http.get<RunnerListResponse>(environment.serverUrl + "/runner/");
  }
}
