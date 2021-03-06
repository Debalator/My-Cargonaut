import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api/api.service';

@Component({
    selector: 'app-createoffer',
    templateUrl: './createoffer.component.html',
    styleUrls: ['./createoffer.component.scss'],
})
export class CreateofferComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private api: ApiService
    ) {}

    dataSend = false;

    vehicles: any[] = [];
    // brand?: string;
    // model?: string;

    checkoutForm = new FormGroup({
        startZip: new FormControl(),
        startCity: new FormControl(),
        startCountry: new FormControl(),
        destZip: new FormControl(),
        destCity: new FormControl(),
        destCountry: new FormControl(),
        priceInput: new FormControl(),
        startDate: new FormControl(),
        stopDate: new FormControl(),
        vehicleInput: new FormControl(),
        spaceInput: new FormControl(),
        seatsInput: new FormControl(),
        moreInfo: new FormControl(),
    });

    //kein bereits vergangenes Datum auswählbar
    minDate = new Date();

    vehicle: any = null;

    sendData(message: string) {
        console.log(this.checkoutForm.value);
        if (
            this.checkoutForm.value.startZip == null ||
            this.checkoutForm.value.startCity == null ||
            this.checkoutForm.value.startCountry == null ||
            this.checkoutForm.value.destZip == null ||
            this.checkoutForm.value.destCity == null ||
            this.checkoutForm.value.destCountry == null ||
            this.checkoutForm.value.startDate == null ||
            this.checkoutForm.value.stopDate == null ||
            this.checkoutForm.value.priceInput == null ||
            !this.vehicle
        ) {
            this.snackbar.open('Alle benötigten Felder ausfüllen!', '', {
                duration: 2000,
            });
        } else {
            this.sendInput();
            // window.location.reload();
            this.checkoutForm.reset();
            this.snackbar.open(message, '', { duration: 2000 });
        }
    }

    applyVehicle(vehicle: any) {
        this.vehicle = vehicle;
    }

    public sendInput() {
        this.api
            .post('/api/offers', {
                startDate: this.checkoutForm.value.startDate,
                destDate: this.checkoutForm.value.stopDate,
                price: this.checkoutForm.value.priceInput,
                vehicle: this.vehicle.id,
                startAddress: {
                    zip: this.checkoutForm.value.startZip,
                    city: this.checkoutForm.value.startCity,
                    country: this.checkoutForm.value.startCountry,
                },
                destAddress: {
                    zip: this.checkoutForm.value.destZip,
                    city: this.checkoutForm.value.destCity,
                    country: this.checkoutForm.value.destCountry,
                },
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

    ngOnInit() {
        this.checkoutForm;
        this.getVehicles();
    }

    getVehicles() {
        this.api.get('/api/vehicles').subscribe({
            next: (res: any) => {
                console.log(res);
                this.vehicles = res;
            },
            error: (e: any) => console.error('get vehicles' + e),
            complete: () => console.info('complete'),
        });
    }
}
