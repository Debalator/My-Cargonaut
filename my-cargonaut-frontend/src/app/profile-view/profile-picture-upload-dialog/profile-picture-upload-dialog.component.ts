import { Component } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-profile-picture-upload-dialog',
  templateUrl: './profile-picture-upload-dialog.component.html',
  styleUrls: ['./profile-picture-upload-dialog.component.scss']
})
export class ProfilePictureUploadDialogComponent {
  selectedFile: File | undefined;

  constructor(private api: ApiService) { }

  uploadFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let selectedFile = files[0];
    let data: FormData = new FormData();
    data.append('file', selectedFile, selectedFile.name);
    this.api.post('/api/users/upload', data).subscribe();
  }
}
