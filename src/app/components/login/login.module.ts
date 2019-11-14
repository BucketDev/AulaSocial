import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from "../material/angular-material.module";

import { LoginComponent } from './login.component';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedPipeModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
