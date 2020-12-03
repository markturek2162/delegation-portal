import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'delegate-portal';

  constructor(private router: Router) {

  }

  signin() {
    this.router.navigate(['signin']);
  }

  signup() {
    this.router.navigate(['signup']);
  }
}
