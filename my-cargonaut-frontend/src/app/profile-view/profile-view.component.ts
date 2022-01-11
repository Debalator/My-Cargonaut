import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api/api.service';
import { ProfilePictureUploadDialogComponent } from './profile-picture-upload-dialog/profile-picture-upload-dialog.component';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
    /*
    @Input() user = {
        uid: '',
        username: '',
        email: '',
        birthdate: '',
        userStarsRating: '',
        numberOfRatings: 0,
        profileImage: '',
    };
    */
    @Input() ratings = [
        {
            title: '',
            description: '',
            starsRating: 0,
            price: '',
        },
    ];

    user!: any;

    constructor(private api: ApiService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.api.get('/api/profile').subscribe((user) => (this.user = user));
    }

    openUploadImage() {
        this.dialog.open(ProfilePictureUploadDialogComponent);
    }
}
