import { Component, OnInit } from '@angular/core';
import { ModelService } from '../services/model.service';
import { ModelMetadata } from '../models/model-metadata';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {

  models: ModelMetadata[]

  constructor(private modelService: ModelService) { }

  ngOnInit() {
    this.modelService.getModelsList().subscribe((objs) => {
      console.log(objs);
      this.models = objs.payload.map((modelMetadata) => ModelMetadata.fromJson(modelMetadata));
    })
  }

}
