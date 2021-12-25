import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatInput} from "@angular/material/input";
import {Observable} from "rxjs";
import { ApiService } from '../api/api.service';


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

  constructor(private formBuilder: FormBuilder, private snackbar: MatSnackBar, private api: ApiService) {

  }

  dataSend = false;

  checkoutForm = new FormGroup({
    startInput: new FormControl(''),
    stopInput: new FormControl(''),
    priceInput: new FormControl(''),
    startDate: new FormControl(''),
    stopDate: new FormControl(''),
    vehicleInput: new FormControl(''),
    spaceInput: new FormControl(''),
    seatsInput: new FormControl(''),
    moreInfo: new FormControl(''),
  });

  // checkoutForm = this.formBuilder.group({
  //   start: '',
  //   stop: '',
  //   date: '',
  //   vehicle: '',
  //   space: '',
  //   seats: '',
  //   moreInfo: ''
  // });

  // moreInfo: any;
  //kein bereits vergangenes Datum auswählbar
  minDate = new Date();



  sendData(message: string){
    //TODO: ERROR undefined
    this.sendInput();
    if(this.dataSend){
      this.snackbar.open(message,'' ,{duration: 2000});
      this.checkoutForm.reset('', {emitEvent: false});
    }



    // this.checkoutForm.value.reset;
  }

  //TODO: missing vehicle and more Info, Alert bei fehlenden Attributen

  public sendInput(){
    // console.log(this.checkoutForm.value.startDate)
    this.api.post("/api/offers", {
      startPoint: this.checkoutForm.value.startInput,
      destPoint: this.checkoutForm.value.stopInput,
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
  }

  clearDate(date: HTMLInputElement) {
    date.value = "";
  }

  ngOnInit() {
    this.checkoutForm;
  }

  // createForm(){
  //   this.checkoutForm = this.formBuilder.group({
  //     startInput: '',
  //     stopInput: '',
  //     dateInput: '',
  //     vehicleInput: '',
  //     spaceInput: '',
  //     seatsInput: '',
  //     moreInfoInput: ''
  //   })
  // }

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
