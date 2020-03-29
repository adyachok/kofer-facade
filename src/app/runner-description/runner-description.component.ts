import { Component, OnInit } from '@angular/core';
import {Runner} from '../models/runner'
import { RunnerService } from '../services/runner.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RunnerResponse } from '../models/runner-response';


@Component({
  selector: 'app-runner-description',
  templateUrl: './runner-description.component.html',
  styleUrls: ['./runner-description.component.scss']
})
export class RunnerDescriptionComponent implements OnInit {

  activeTab: string = 'description';

  runner : Runner;
 

  constructor(private runnerService: RunnerService, private route: ActivatedRoute) { }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const runner_id = params.get('runner_id');
      this.runnerService.getRunnerById(runner_id).subscribe((runnerResponse: RunnerResponse) => {
        this.runner = runnerResponse.payload;
      })
  })
    
  }


}
