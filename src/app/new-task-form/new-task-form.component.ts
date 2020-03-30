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
import { RunnerService } from '../services/runner.service';
import { zip } from 'rxjs';
import { RunnerListResponse } from '../models/runner-list-response';
import { Runner } from '../models/runner';
import { TaskListResponse } from '../models/task-list-response';



@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit {

  form: FormGroup;
  modelMetatada: ModelMetadata;
  runners: Runner[]
  useRunner = false
  selectedRunner: Runner

  constructor(
    private dataService: DataService, 
    private modelService: ModelService, 
    private taskService: TaskService, 
    private router: Router, 
    private runnerService: RunnerService) { }

  ngOnInit() {

    this.dataService.currentModelIdSelection.subscribe(
      (modelId: string) => {
        if (modelId !== undefined) {
          const model$ = this.modelService.getModelMetadataById(modelId);
          const runner$ = this.runnerService.getRunners();

          zip(model$, runner$, 
            (modelMetadateResponse: ModelMetadataResponse, 
              runnerListResponse: RunnerListResponse) => ({modelMetadateResponse, runnerListResponse}))
            .subscribe( pair => {
              console.log(pair);
              this.modelMetatada = ModelMetadata.fromJson(pair.modelMetadateResponse.payload);
              this.runners = pair.runnerListResponse.payload as Runner[];
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
    fg['selectedRunnerCheckbox'] = new FormControl();
    fg['selectedRunner'] = new FormControl({value:'', disabled: true});
    this.form = new FormGroup(fg)
  }

  submitTask(event: Event) {
    const runnerSelectionControl = this.form.get('selectedRunner');

    const calculationItems: CalculationItem[] = [];
    Object.keys(this.form.controls).forEach(key => {
      if (!['selectedRunner', 'selectedRunnerCheckbox'].includes(key)) {
        const [unit_step, range_name, range_type] = key.split(".");
        const value = this.form.controls[key].value
        let calculationItem = new CalculationItem(range_name, range_type, value , unit_step);
        calculationItems.push(calculationItem);
      }      
    });
    // TODO: send data on remote Server
    // TODO: redirect to task detail page
    let modelTask: ModelTask;
    if (runnerSelectionControl.enabled) {
      modelTask = new ModelTask(undefined, this.modelMetatada.name, undefined, calculationItems, undefined, runnerSelectionControl.value);
    } else {
      modelTask = new ModelTask(undefined, this.modelMetatada.name, undefined, calculationItems, undefined);
    }    
    this.taskService.createTask(modelTask).subscribe((response) => {
      const task_id = response.payload.task_id;
      this.router.navigate(['tasks/' + task_id]);
    })
  }

  changeRunnerSelectionState() {
    const control = this.form.get('selectedRunner');
    if (control.disabled) {
      control.enable();
    } else {
      control.disable();
    }
  }

}
