import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "../api/api.service";

@Component({
  selector: 'app-createrequest',
  templateUrl: './createrequest.component.html',
  styleUrls: ['./createrequest.component.scss']
})
export class CreaterequestComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private snackbar: MatSnackBar, private api: ApiService) { }


  dataSend = false;

  requestForm = new FormGroup({
    startInput: new FormControl(),
    stopInput: new FormControl(),
    priceInput: new FormControl(),
    startDate: new FormControl(),
    stopDate: new FormControl(),
    items: new FormControl(),
    persons: new FormControl(),
    moreInfo: new FormControl(),
  });

  minDate = new Date();

  sendDataRequest(message: string){
    if(this.requestForm.value.startInput == null || this.requestForm.value.stopInput == null
      || this.requestForm.value.startDate == null || this.requestForm.value.stopDate == null
      || this.requestForm.value.priceInput == null || this.requestForm.value.items == null
      || this.requestForm.value.persons == null)
    {
      this.snackbar.open('Fill out required fields','' ,{duration: 2000});
    } else {
      this.sendInput();
      window.location.reload();
      this.snackbar.open(message,'' ,{duration: 2000});
    }
  }

  public sendInput(){
    this.api.post("/api/offers", {
      startAddress: this.requestForm.value.startInput,
      destAddress: this.requestForm.value.stopInput,
      startDate: this.requestForm.value.startDate,
      destDate: this.requestForm.value.stopDate,
      price: this.requestForm.value.priceInput,
      items: this.requestForm.value.items,
      persons: this.requestForm.value.persons,
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

  ngOnInit(): void {
  }

}
