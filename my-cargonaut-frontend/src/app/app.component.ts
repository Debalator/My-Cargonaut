import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MyCargonaut';

  //Delete these example items later
  exampleItem1 = {
    title: "Gießen - Berlin - 3 Sitze",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    stars: 4,
    price: 20,
    numberOfReviews: 409,
    image: "https://cataas.com/cat?width=500&height=500"
  }
  exampleItem2 = {
    title: "Leipzig - Gießen - 1 Sitz",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    stars: 3,
    price: 50,
    numberOfReviews: 1204,
    image: "https://cataas.com/cat?width=502&height=502"
  }
  exampleUser1 = {
    uid: "34",
    username: "fahrmitmir",
    email: "werner@werner.de",
    birthdate: "01.01.2000",
    userStarsRating: "3",
    numberOfRatings: 420,
    profileImage: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400",
  }

  exampleRatings = [
    {
      title: "Dresden - Leipzig",
      description: "Super fahrt ",
      starsRating: 5,
      price: "120"
    },
    {
      title: "Gießen - Marburg",
      description: "Umzug hat super geklappt ",
      starsRating: 4,
      price: "3"
    },
    {
      title: "Gießen - Marburg",
      description: "Umzug hat super geklappt ",
      starsRating: 4,
      price: "3"
    },
    {
      title: "Gießen - Marburg",
      description: "Umzug hat super geklappt ",
      starsRating: 4,
      price: "3"
    }
  ]
}
