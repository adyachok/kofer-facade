import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { ModelMetadataListResponse } from '../models/model-metadata-list-response';

const SERVER_URL = 'http://localhost:8089'

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  getModelsList(): Observable<ModelMetadataListResponse> {
    return this.http.get<ModelMetadataListResponse>(SERVER_URL + "/model/");
  }
}
