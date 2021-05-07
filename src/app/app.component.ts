import { Component } from '@angular/core';
import {ActivationEnd, NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  bgColor: string;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        // console.log(event.snapshot.data?.class);
        this.bgColor = event.snapshot.data?.class;
      }
    });

  }

}
