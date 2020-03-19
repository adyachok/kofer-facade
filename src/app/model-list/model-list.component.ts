import { Component, OnInit } from '@angular/core';
import { ModelService } from '../services/model.service';
import { ModelMetadata } from '../models/model-metadata';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {

  models: ModelMetadata[]

  constructor(private modelService: ModelService, private dataService: DataService, private router: Router) { }

  triggerNewTaskCreation(event:Event) {
    const target = event.target as HTMLElement;;
    const id = target.attributes.getNamedItem('id').value;
    this.dataService.setModelId(id);
    this.router.navigate(['/new_task']);
  }

  ngOnInit() {
    this.modelService.getModelsList().subscribe((objs) => {
      this.models = objs.payload.map((modelMetadata) => ModelMetadata.fromJson(modelMetadata));
    })
  }

}
