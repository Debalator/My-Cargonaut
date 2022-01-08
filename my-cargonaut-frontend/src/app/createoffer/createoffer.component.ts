import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Component({
    selector: 'app-createoffer',
    templateUrl: './createoffer.component.html',
    styleUrls: ['./createoffer.component.scss'],
})

export class CreateofferComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private snackbar: MatSnackBar, private api: ApiService) {

  }

  dataSend = false;

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

  sendData(message: string) {
    if (this.checkoutForm.value.startZip == null || this.checkoutForm.value.startCity == null
      || this.checkoutForm.value.startCountry == null || this.checkoutForm.value.destZip == null
      || this.checkoutForm.value.destCity == null || this.checkoutForm.value.destCountry == null
      || this.checkoutForm.value.startDate == null || this.checkoutForm.value.stopDate == null
      || this.checkoutForm.value.priceInput == null || this.checkoutForm.value.spaceInput == null
      || this.checkoutForm.value.seatsInput == null /* && this.checkoutForm.value.vehicleInput != null */) {
      this.snackbar.open('Alle benötigten Felder ausfüllen!', '', { duration: 2000 });
    } else {
      this.sendInput();
      // window.location.reload();
      this.checkoutForm.reset();
      this.snackbar.open(message, '', { duration: 2000 });
    }
  }

  //TODO: missing vehicle and more Info, Skalierung Fenstergröße

  public sendInput() {
    this.api.post("/api/addresses", {
      zip: this.checkoutForm.value.startZip,
      city: this.checkoutForm.value.startCity,
      country: this.checkoutForm.value.startCountry,
    }).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e: any) => console.error('startAddress' + e),
      complete: () => console.log('startAddress sent'),
    });
    this.api.post("/api/addresses", {
      zip: this.checkoutForm.value.destZip,
      city: this.checkoutForm.value.destCity,
      country: this.checkoutForm.value.destCountry,
    }).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e: any) => console.error('destAddress' + e),
      complete: () => console.log('destAddress sent'),
    })
    this.api.post("/api/offers", {
      startAddress: this.checkoutForm.value.startZip + ' ' + this.checkoutForm.value.startCity + ' ' + this.checkoutForm.value.startCountry,
      destAddress: this.checkoutForm.value.destZip + ' ' + this.checkoutForm.value.destCity + ' ' + this.checkoutForm.value.destCountry,
      startDate: this.checkoutForm.value.startDate,
      destDate: this.checkoutForm.value.stopDate,
      price: this.checkoutForm.value.priceInput,
      //vehicleInput: this.checkoutForm.value.vehicleInput,
      space: this.checkoutForm.value.spaceInput,
      seats: this.checkoutForm.value.seatsInput,
      //moreInfo: this.checkoutForm.value.moreInfo
    }).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e: any) => console.error(e),
      complete: () => this.dataSend = true,
    });

  clearDate(date: HTMLInputElement) {
    date.value = "";
  }

  ngOnInit() {
    this.checkoutForm;
  }
}
