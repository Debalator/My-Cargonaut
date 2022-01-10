import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api/api.service';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
    @Input() order: any;

    rating = {
        title: '',
        description: '',
        stars: 5,
    };

    constructor(private api: ApiService, private snackbar: MatSnackBar) {}

    ngOnInit(): void {
        if (this.order.rating) {
            const { title, description, stars } = this.order.rating;
            console.log('DAAD');

            this.rating = {
                title,
                description,
                stars,
            };
        }
    }

    saveRating() {
        const path = `/api/orders/${this.order.id}/rating`;

        if (this.order.rating)
            this.api
                .patch(`${path}/${this.order.rating.id}`, this.rating)
                .subscribe(() => {
                    this.snackbar.open('Bewertung geupdated!', '', {
                        duration: 2000,
                    });
                });
        else
            this.api.post(path, this.rating).subscribe(() => {
                this.snackbar.open('Bewertung erstellt!', '', {
                    duration: 2000,
                });
            });
    }
}
