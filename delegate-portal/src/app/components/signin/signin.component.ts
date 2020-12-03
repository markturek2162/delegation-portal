import { Component, OnInit } from '@angular/core';
import { IdentityService, SignInUser } from 'src/app/services/identity.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user!: SignInUser;

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
    this.user = { email: '', password: '' };
  }

  signIn() {
    this.identityService.signIn(this.user)
      .subscribe((res: any) => {
      }, (error: any) => {
      });
  }
}
