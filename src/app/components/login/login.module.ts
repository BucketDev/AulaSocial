import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AngularMaterialModule } from "../material/angular-material.module";

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatToolbarModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
