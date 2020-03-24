import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Runner } from '../models/runner';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunnerService {

  constructor() { }

  public getRunnerById(id: string): Observable<Runner> {
    return of(Runner.createBlank());
  }

  public getRunners(): Observable<Runner[]> {
    return of([Runner.createBlank(), Runner.createBlank(), Runner.createBlank(), Runner.createBlank()]);
  }
}
