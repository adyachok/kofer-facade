import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { from } from 'rxjs';
import { TaskService } from './services/task.service';
import { ModelService } from './services/model.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [
    AppComponent,
    ModelListComponent,
    ModelDetailComponent,
    TaskListComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
      }
    ]),
    NgxJsonViewerModule
  ],
  providers: [TaskService, ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
