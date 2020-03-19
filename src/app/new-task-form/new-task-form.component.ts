import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ModelSelection } from '../models/model-selection';
import { ModelService } from '../services/model.service';
import { ModelMetadataResponse } from '../models/model-metadata-response';
import { ModelMetadata } from '../models/model-metadata';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit {

  form: FormGroup;
  modelMetatada: ModelMetadata;

  constructor(private dataService: DataService, private modelService: ModelService) { }

  ngOnInit() {
    this.dataService.currentModelIdSelection.subscribe(
      (modelId: string) => {
        if (modelId !== undefined) {
          this.modelService.getModelMetadataById(modelId).subscribe(
          (modelMetadateResponse: ModelMetadataResponse) => {
            this.modelMetatada = ModelMetadata.fromJson(modelMetadateResponse.payload);
            console.log(this.modelMetatada)
            this.buildFormGroup();
          });
        }        
      });
    }

  buildFormGroup(): void {
    const fg = {};
    for (const item of this.modelMetatada.business_metadata.data.unitSteps[0].params.training_ranges) {
      fg[item.name] = new FormControl(item.name, [Validators.required])    
    }
    this.form = new FormGroup(fg)
  }

}
