import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoPipe } from './photo.pipe';
import { UriStyleSanitizerPipe } from './uri-style-sanitizer.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PhotoPipe,
    UriStyleSanitizerPipe
  ],
  exports: [
    PhotoPipe,
    UriStyleSanitizerPipe
  ]
})
export class SharedPipeModule { }
