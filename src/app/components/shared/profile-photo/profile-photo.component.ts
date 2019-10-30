import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent {

  @Input() size: string = '';
  @Input() circle: boolean = false;
  @Input() photoURL: string;
  @Input() viewProfile: boolean = true;

  constructor() { }

}
