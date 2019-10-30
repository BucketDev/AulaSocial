import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AngularMaterialModule } from '../material/angular-material.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';

import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    SharedPipeModule,
    MatProgressBarModule,
    MatToolbarModule
  ],
  declarations: [
    LoadingComponent,
    NavbarComponent,
    ProfilePhotoComponent
  ],
  exports: [
    LoadingComponent,
    NavbarComponent,
    ProfilePhotoComponent
  ]
})
export class SharedModule { }
