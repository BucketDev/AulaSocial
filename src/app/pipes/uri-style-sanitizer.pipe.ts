import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'uriStyleSanitizer'
})
export class UriStyleSanitizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(uri: string): any {
    return  this.domSanitizer.bypassSecurityTrustStyle(`url(${uri})`);

  }

}
