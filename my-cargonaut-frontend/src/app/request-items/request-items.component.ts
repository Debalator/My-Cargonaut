import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-request-items',
    templateUrl: './request-items.component.html',
    styleUrls: ['./request-items.component.scss'],
})
export class RequestItemsComponent {
    @Output() saveItemsEvent = new EventEmitter<any[]>();

    items: any[] = [];

    constructor(public snackbar: MatSnackBar) {}

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
        for (const item of this.items) {
            if (!item.description || !item.size || !item.weight) {
                this.snackbar.open('Bitte alle Daten ausfüllen', '', {
                    duration: 2000,
                });
                return;
            }
        }
        // this.saveItemsEvent.emit(this.items);
    }
}
