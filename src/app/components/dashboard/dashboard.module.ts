import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AngularMaterialModule } from '../material/angular-material.module';
import { EventsComponent } from './events/events.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { MyGroupsComponent } from './my-groups/my-groups.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    SharedModule,
    SharedPipeModule
  ],
  declarations: [
    DashboardComponent,
    EventsComponent,
    MyGroupsComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
