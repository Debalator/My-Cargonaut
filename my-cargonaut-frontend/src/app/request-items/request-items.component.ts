import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-request-items',
    templateUrl: './request-items.component.html',
    styleUrls: ['./request-items.component.scss'],
})
export class RequestItemsComponent implements OnInit {
    @Output() saveItemsEvent = new EventEmitter<any[]>();

    items: any[] = [];

    constructor() {}

    ngOnInit(): void {}

    addItem() {
        this.items.push({
            description: '',
            size: 0,
            weight: 0,
        });
    }

    removeItem(index: number) {
        const copy = [...this.items];
        copy.splice(index, 1);
        this.items = copy;
    }

    save() {
        this.saveItemsEvent.emit(this.items);
    }
}
