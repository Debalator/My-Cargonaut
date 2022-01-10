import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AdditemComponent } from '../additem/additem.component';

export interface DialogData {
    description: string;
    size: number;
    weight: number;
}

@Component({
    selector: 'app-createrequest',
    templateUrl: './createrequest.component.html',
    styleUrls: ['./createrequest.component.scss'],
})
export class CreaterequestComponent {
    constructor(
        private formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private api: ApiService,
        private dialog: MatDialog
    ) {}

    itemsInput: DialogData[] = [{ description: 'Koffer', size: 5, weight: 3 }];

    description!: string;
    size!: number;
    weight!: number;

    dataSend = false;

    requestForm = new FormGroup({
        startZip: new FormControl(),
        startCity: new FormControl(),
        startCountry: new FormControl(),
        destZip: new FormControl(),
        destCity: new FormControl(),
        destCountry: new FormControl(),
        priceInput: new FormControl(),
        startDate: new FormControl(),
        stopDate: new FormControl(),
        items: new FormControl(),
        persons: new FormControl(),
        moreInfo: new FormControl(),
    });

    minDate = new Date();

    sendDataRequest(message: string) {
        if (
            this.requestForm.value.startZip == null ||
            this.requestForm.value.startCity == null ||
            this.requestForm.value.startCountry == null ||
            this.requestForm.value.destZip == null ||
            this.requestForm.value.destCity == null ||
            this.requestForm.value.destCountry == null ||
            this.requestForm.value.startDate == null ||
            this.requestForm.value.stopDate == null ||
            this.requestForm.value.priceInput ==
                null /*|| this.requestForm.value.items == null */ ||
            this.requestForm.value.persons == null
        ) {
            this.snackbar.open('Alle benötigten Felder ausfüllen!', '', {
                duration: 2000,
            });
        } else {
            this.sendInput();
            this.requestForm.reset();
            this.snackbar.open(message, '', { duration: 2000 });
        }
    }

    public sendInput() {
        this.api
            .post('/api/requests', {
                startDate: this.requestForm.value.startDate,
                destDate: this.requestForm.value.stopDate,
                price: this.requestForm.value.priceInput,
                persons: this.requestForm.value.persons,
                startAddress: {
                    zip: this.requestForm.value.startZip,
                    city: this.requestForm.value.startCity,
                    country: this.requestForm.value.startCountry,
                },
                destAddress: {
                    zip: this.requestForm.value.destZip,
                    city: this.requestForm.value.destCity,
                    country: this.requestForm.value.destCountry,
                },
                items: this.itemsInput.values(),
            })
            .subscribe({
                next: (res: any) => {
                    console.log(res);
                },
                error: (e: any) => console.error(e),
                complete: () => (this.dataSend = true),
            });
    }

    clearDate(date: HTMLInputElement) {
        date.value = '';
    }

    add(): void {
        const dialogRef = this.dialog.open(AdditemComponent, {
            width: '350px',
            data: {
                description: this.description,
                size: this.size,
                weight: this.weight,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (
                result.description == null ||
                result.size == null ||
                result.weight == null
            ) {
                this.snackbar.open(
                    'Alle Felder für den Gegenstand ausfüllen!',
                    '',
                    { duration: 1000 }
                );
            } else {
                console.log('The dialog was closed');
                this.itemsInput.push({
                    description: result.description,
                    size: result.size,
                    weight: result.weight,
                });
            }
        });
    }

    remove(item: DialogData): void {
        const index = this.itemsInput.indexOf(item);

        if (index >= 0) {
            this.itemsInput.splice(index, 1);
        }
    }
}
