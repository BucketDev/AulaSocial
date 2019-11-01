import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Upload } from '../../../models/upload.interface';
import { UploadService } from '../../../providers/shared/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  upload: Upload;
  uploading: boolean = false;
  uploaded: boolean = false;

  @Output() photoUrl = new EventEmitter<string>()
  @Input() label: string;
  @Input() path: string;

  constructor(private uploadService: UploadService) {
    this.upload = {
      name: '',
      file: null,
      createdAt: new Date()
    }
  }

  ngOnInit() {
  }

  fileSelected = (inputFile: HTMLInputElement) => {
    let file = inputFile.files.item(0);
    this.upload.name = file.name;
    this.upload.file = file;
  }

  uploadFile = () => {
    let uploadTask = this.uploadService.upload(this.upload, this.path);
    this.uploading = true;
    uploadTask.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL: string) => {
        this.uploading = false;
        this.uploaded = true;
        this.photoUrl.emit(downloadURL)
      });
    });
  }

  deleteFile = () => {
    this.upload = {
      name: '',
      file: null,
      createdAt: new Date()
    }
    let fileInput: HTMLInputElement = document.querySelector('input[type=file]');
    fileInput.value = '';
  }

}
