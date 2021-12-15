import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  username: string;

  constructor() {
    this.username = ""
   }

  ngOnInit(): void {
  }

  save(){
    console.log(this.username)
  }

}
