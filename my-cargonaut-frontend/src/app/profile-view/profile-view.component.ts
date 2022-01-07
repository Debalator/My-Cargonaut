import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  @Input() user = {
    uid: "",
    username: "",
    email: "",
    birthdate: "",
    userStarsRating: "",
    numberOfRatings: 0,
    profileImage: "",
  }

  @Input() ratings = [{
    title: "",
    description: "",
    starsRating: 0,
    price: ""
  }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
