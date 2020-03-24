import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { from } from 'rxjs';
import { TaskService } from './services/task.service';
import { ModelService } from './services/model.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { RunnerDescriptionComponent } from './runner-description/runner-description.component';
import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions } from 'ngx-highlightjs';
import { RunnerListComponent } from './runner-list/runner-list.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function getHighlightLanguages() {
  return {
    python: () => import('highlight.js/lib/languages/python'),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ModelListComponent,
    ModelDetailComponent,
    TaskListComponent,
    TaskDetailComponent,
    NewTaskFormComponent,
    RunnerDescriptionComponent,
    RunnerListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'models',
        component: ModelListComponent
      },
      {
        path: 'models/:model_id',
        component: ModelDetailComponent
      },
      {
        path: 'tasks',
        component: TaskListComponent
      },
      {
        path: 'tasks/:task_id',
        component: TaskDetailComponent
      },
      {
        path: 'new_task',
        component: NewTaskFormComponent
      },
      {
        path: 'runners',
        component: RunnerListComponent
      },
      {
        path: 'runners/:runner_id',
        component: RunnerDescriptionComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ]),
    NgxJsonViewerModule,
    HighlightModule,
    NgbModule
  ],
  providers: [
    TaskService, 
    ModelService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        languages: getHighlightLanguages(),
        lineNumbers: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
