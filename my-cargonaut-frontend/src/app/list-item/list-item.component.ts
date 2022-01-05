import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() headline = "Hello"

  @Input() item = {
    title :"", 
    decription:"", 
    stars : 0,
    price : 0, 
    numberOfReviews: 0,
    image: ""

  }

  constructor() { }

  ngOnInit(): void {
  }

}
