import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent {
    @Input() user = {
        uid: '',
        username: '',
        email: '',
        birthdate: '',
        userStarsRating: '',
        numberOfRatings: 0,
        profileImage: '',
    };

    @Input() ratings = [
        {
            title: '',
            description: '',
            starsRating: 0,
            price: '',
        },
    ];
}
