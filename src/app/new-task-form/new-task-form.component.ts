import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ModelSelection } from '../models/model-selection';
import { ModelService } from '../services/model.service';
import { ModelMetadataResponse } from '../models/model-metadata-response';
import { ModelMetadata } from '../models/model-metadata';
import { CalculationItem } from '../models/calculation-item';
import { ModelTask } from '../models/model-task';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit {

  form: FormGroup;
  modelMetatada: ModelMetadata;

  constructor(
    private dataService: DataService, 
    private modelService: ModelService, 
    private taskService: TaskService, 
    private router: Router) { }

  ngOnInit() {
    this.dataService.currentModelIdSelection.subscribe(
      (modelId: string) => {
        if (modelId !== undefined) {
          this.modelService.getModelMetadataById(modelId).subscribe(
          (modelMetadateResponse: ModelMetadataResponse) => {
            this.modelMetatada = ModelMetadata.fromJson(modelMetadateResponse.payload);
            this.buildFormGroup();
            console.log(this.form);
          });
        }        
      });
    }

  buildFormGroup(): void {
    const fg = {};
    for (let us of this.modelMetatada.business_metadata.data.unitSteps) {
      for (let training_range of us.params.training_ranges) {
        const control_name = us.name + "." + training_range.name + "." + training_range.type;
        fg[control_name] = new FormControl('', [Validators.required])  
      }        
    }
    this.form = new FormGroup(fg)
  }

  submitTask(event: Event) {
    const calculationItems: CalculationItem[] = [];
    Object.keys(this.form.controls).forEach(key => {
      // this.form.controls[key].markAsDirty();
      const [unit_step, range_name, range_type] = key.split(".");
      const value = this.form.controls[key].value
      let calculationItem = new CalculationItem(range_name, range_type, value , unit_step);
      calculationItems.push(calculationItem);
    });
    // TODO: send data on remote Server
    // TODO: redirect to task detail page
    const modelTask = new ModelTask(undefined, this.modelMetatada.name, undefined, calculationItems, undefined);
    this.taskService.createTask(modelTask).subscribe((response) => {
      const task_id = response.payload.task_id;
      this.router.navigate(['tasks/' + task_id]);
    })
  }

}
