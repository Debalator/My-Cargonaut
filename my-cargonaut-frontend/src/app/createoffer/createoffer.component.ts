import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-createoffer',
  templateUrl: './createoffer.component.html',
  styleUrls: ['./createoffer.component.scss']
})

// export interface Offer {
//   start: string,
//   stop: string,
//   date: Date,
//   vehicle: Vehicle["id"],
//   space: number,
//   seats: number,
//   moreInfo: string;
// }
//
// export interface Vehicle {
//   id: number,
//   brand: string,
//   model: string,
//   seats: number,
//   space: number;
// }

export class CreateofferComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private snackbar: MatSnackBar) {

  }

  checkoutForm!: FormGroup;
  // checkoutForm = this.formBuilder.group({
  //   start: '',
  //   stop: '',
  //   date: '',
  //   vehicle: '',
  //   space: '',
  //   seats: '',
  //   moreInfo: ''
  // });

  //kein bereits vergangenes Datum auswählbar
  minDate = new Date();

  sendData(message: string){
    this.snackbar.open(message,'' ,{duration: 2000});
    this.checkoutForm.reset();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.checkoutForm = this.formBuilder.group({
      startInput: '',
      stopInput: '',
      dateInput: '',
      vehicleInput: '',
      spaceInput: '',
      seatsInput: '',
      moreInfoInput: ''
    })
  }
  // public createOffer(offer: Offer) {
  //   this.httpService.post("http://localhost:9090/...", {
  //     start: this.checkoutForm.start,
  //     stop: offer.stop,
  //     date: offer.date,
  //     vehicle: offer.vehicle,
  //     space: offer.space,
  //     seats: offer.seats,
  //     moreInfo: offer.moreInfo
  //   }).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //     },
  //     error: (e: any) => console.error(e),
  //     complete: () => console.info('complete')
  //   });
  // }
}
