import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { ModelMetadataListResponse } from '../models/model-metadata-list-response';
import { ModelMetadataResponse } from '../models/model-metadata-response';
import { ModelTaskResponse } from '../models/model-task-response';

const SERVER_URL = 'http://localhost:8089'

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  getModelsList(): Observable<ModelMetadataListResponse> {
    return this.http.get<ModelMetadataListResponse>(SERVER_URL + "/model/");
  }

  getModelMetadataById(model_id: string): Observable<ModelMetadataResponse> {
    return this.http.get<ModelMetadataResponse>(SERVER_URL + '/model/' + model_id + "/");
  }
}
