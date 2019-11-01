import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AngularMaterialModule } from '../material/angular-material.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';

import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularMaterialModule,
    SharedPipeModule,
    MatProgressBarModule,
    MatToolbarModule
  ],
  declarations: [
    LoadingComponent,
    NavbarComponent,
    ProfilePhotoComponent,
    UploadComponent
  ],
  exports: [
    LoadingComponent,
    NavbarComponent,
    ProfilePhotoComponent,
    UploadComponent
  ]
})
export class SharedModule { }
