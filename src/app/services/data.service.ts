import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelSelection } from '../models/model-selection';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private modelSelectionSource = new BehaviorSubject<string>(undefined);
  currentModelIdSelection = this.modelSelectionSource.asObservable();

  constructor() { }

  setModelId(selection: string) {
    this.modelSelectionSource.next(selection);
  }
}
