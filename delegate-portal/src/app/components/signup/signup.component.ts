import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService, SignUpUser } from 'src/app/services/identity.service';
import { CrossFieldErrorMatcher } from './crossfield-error-matcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	readonly ValidationExpressions: { [key: string]: RegExp } = {
		EMAIL_REGEX: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
	};
	readonly siteKey = '6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1';
	captchaIsLoaded = false;
  captchaSuccess = false;
  captchaIsExpired = false;
	captchaResponse?: string;
	
	formGroup!: FormGroup;
	confirmStateMatcher = new CrossFieldErrorMatcher();

  constructor(private router: Router, private builder: FormBuilder, private cdr: ChangeDetectorRef, private identityService: IdentityService) { }

  ngOnInit() {
		this.formGroup = this.builder.group({
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.ValidationExpressions.EMAIL_REGEX)])],
			firstName: ['', Validators.compose([Validators.required])],
			lastName: ['', Validators.compose([Validators.required])],
			company: ['', Validators.compose([Validators.required])],
			recaptcha: ['', Validators.required],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			confirmPassword: ''
			}, { validator: this.passwordValidator }
		);
	}

	handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    this.cdr.detectChanges();
  }
	
	getEmailErrors(): string {
		let email = this.formGroup.get('email')!;
		if (email.hasError('required')) {
			return 'Email is required';
		}
		if (email.hasError('pattern')) {
			return 'Email has to be in the proper format';
		}
		return '';
	}

	getFirstNameErrors(): string {
		let firstName = this.formGroup.get('firstName')!;
		if (firstName.hasError('required')) {
			return 'First Name is required';
		}
		return '';
	}

	getLastNameErrors(): string {
		let lastName = this.formGroup.get('lastName')!;
		if (lastName.hasError('required')) {
			return 'Last Name is required';
		}
		return '';
	}

	getCompanyErrors(): string {
		let lastName = this.formGroup.get('company')!;
		if (lastName.hasError('required')) {
			return 'Company is required';
		}
		return '';
	}

	getPasswordErrors(): string {
		let password = this.formGroup.get('password')!;
		if (password.hasError('required')) {
			return 'Password is required';
		}
		if (password.hasError('minlength')) {
			return 'Password must be at least 6 characters';
		}
		return '';
	}

	getConfirmPasswordErrors(): string {
		let confirmPassword = this.formGroup.get('confirmPassword')!;
		if (confirmPassword.hasError('passwordsDoNotMatch')) {
			return 'Passwords have to match';
		}
		return ''; 
	}

	passwordValidator(form: FormGroup) {
    const condition =  form.get('password')!.value !== form.get('confirmPassword')!.value;
    return condition ? { passwordsDoNotMatch: true } : null;
  }

	cancel(): void {
    this.router.navigate(['/']);
	}

	signup(): void {

		let value = this.formGroup.getRawValue();
		let signUpUser = <SignUpUser>{
		 	firstName: value.firstName,
			lastName: value.lastName,
			company: value.company, 
		 	email: value.email,
			password: value.password,
		}
		this.identityService.signUp(signUpUser)
			.subscribe((res: any) => {
		}, (error: any) => {
			console.log(error);
		});	};	
}
