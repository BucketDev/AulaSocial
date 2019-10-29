import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AngularMaterialModule } from '../material/angular-material.module';

import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatProgressBarModule,
    MatToolbarModule
  ],
  declarations: [
    LoadingComponent,
    NavbarComponent
  ],
  exports: [
    LoadingComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
