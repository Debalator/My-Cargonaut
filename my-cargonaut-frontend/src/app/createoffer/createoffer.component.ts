import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-createoffer',
  templateUrl: './createoffer.component.html',
  styleUrls: ['./createoffer.component.scss']
})


export class CreateofferComponent {

  checkoutForm = this.formBuilder.group({
    start: '',
    stop: '',
    date: '',
    vehicle: '',
    space: '',
    seats: '',
    moreInfo: ''
  });

  constructor(private formBuilder: FormBuilder) {

  }

  onSubmit(): void {
    // Process checkout data here
    // this.items = this.cartService.clearCart();
    console.warn('Your offer has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }



}
