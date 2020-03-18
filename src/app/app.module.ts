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
        path: 'tasks',
        component: TaskListComponent
      }
    ])
  ],
  providers: [TaskService, ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
