import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api/api.service';
import { ProfilePictureUploadDialogComponent } from './profile-picture-upload-dialog/profile-picture-upload-dialog.component';
import { LoginServiceService } from '../login-page/login-service.service';

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
    ratings: any[] = [];

    user!: any;

    constructor(
        private api: ApiService,
        private dialog: MatDialog,
        private loginService: LoginServiceService
    ) {}

    ngOnInit(): void {
        this.api.get('/api/profile').subscribe((user) => (this.user = user));
        this.api
            .get(`/api/users/${this.loginService.id}/ratings`)
            .subscribe((res) => {
                this.ratings = res;
                console.log(res);
            });
    }

    openUploadImage() {
        this.dialog.open(ProfilePictureUploadDialogComponent);
    }
}
