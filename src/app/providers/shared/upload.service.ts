import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Upload } from '../../models/upload.interface';
import { UploadTask } from '@angular/fire/storage/interfaces';
import { FireAuthService } from '../auth/fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private afs: AngularFireStorage,
              private fireAuth: FireAuthService) { }

  upload = (upload: Upload, path?: string): UploadTask => {
    path = path || 'images';
    let storageRef = this.afs.ref(path);
    return storageRef.child(upload.name).put(upload.file, {customMetadata: {
      uid: this.fireAuth.user.uid,
      photoURL: this.fireAuth.user.photoURL,
      email: this.fireAuth.user.email
    }});
  }
}
