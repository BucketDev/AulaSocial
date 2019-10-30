import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatButtonModule,
    MatRippleModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatRippleModule,
    MatSnackBarModule
  ]
})
export class AngularMaterialModule { }
