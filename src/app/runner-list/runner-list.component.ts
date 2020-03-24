import { Component, OnInit } from '@angular/core';
import { RunnerService } from '../services/runner.service';
import { Runner } from '../models/runner';

@Component({
  selector: 'app-runner-list',
  templateUrl: './runner-list.component.html',
  styleUrls: ['./runner-list.component.scss']
})
export class RunnerListComponent implements OnInit {

  runners: Runner[];

  constructor(private runnerService: RunnerService) { }

  ngOnInit(): void {
    this.runnerService.getRunners().subscribe((runners) => {
      this.runners = runners;
    })
  }

}
