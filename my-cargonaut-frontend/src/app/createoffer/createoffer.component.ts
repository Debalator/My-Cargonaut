import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-createoffer',
  templateUrl: './createoffer.component.html',
  styleUrls: ['./createoffer.component.scss']
})


export class CreateofferComponent {
  constructor(private formBuilder: FormBuilder, private snackbar: MatSnackBar) {

  }

  checkoutForm = this.formBuilder.group({
    start: '',
    stop: '',
    date: '',
    vehicle: '',
    space: '',
    seats: '',
    moreInfo: ''
  });

  //kein bereits vergangenes Datum auswählbar
  minDate = new Date();

  sendData(message: string){
    this.snackbar.open(message,'' ,{duration: 2000});
  }



  onSubmit(): void {
    // Process checkout data here
    // this.items = this.cartService.clearCart();
    console.warn('Your offer has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }



}
