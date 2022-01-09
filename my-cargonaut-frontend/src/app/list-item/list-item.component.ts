import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
    @Input() headline = 'Hello';

    @Input() item = {
        title: '',
        description: '',
        stars: 0,
        price: 0,
        numberOfReviews: 0,
        image: '',
    };
}
