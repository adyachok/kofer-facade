import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelSelection } from '../models/model-selection';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Look: https://fireship.io/lessons/sharing-data-between-angular-components-four-methods/
  
  private modelSelectionSource = new BehaviorSubject<string>(undefined);
  currentModelIdSelection = this.modelSelectionSource.asObservable();

  constructor() { }

  setModelId(selection: string) {
    this.modelSelectionSource.next(selection);
  }
}
