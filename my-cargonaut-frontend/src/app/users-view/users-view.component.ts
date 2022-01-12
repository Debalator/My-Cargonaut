import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-users-view',
    templateUrl: './users-view.component.html',
    styleUrls: ['./users-view.component.scss'],
})
export class UsersViewComponent implements OnInit {
    user: any = {};
    ratings: any[] = [];
    isLoading = true;

    constructor(private api: ApiService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const userID = +params['id'];
            this.api.get(`/api/users/${userID}`).subscribe((user) => {
                this.user = user;
                this.isLoading = false;
                console.log(user);
            });
            this.api
                .get(`/api/users/${userID}/ratings`)
                .subscribe((ratings) => {
                    console.log(ratings);
                    this.ratings = ratings;
                });
        });
    }
}
