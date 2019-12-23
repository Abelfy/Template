import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { User } from '../../models/user';
import { first } from 'rxjs/operators';
import { delay } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  url : string;
  user: User = new User();
  type: [] = [];
  returnUrl : string;
  loading = false;
  error :'';

  constructor(
    private AuthSrv: AuthentificationService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.user = new User();

    this.loginForm = this.formBuilder.group({
      email: [this.user.login, Validators.compose([Validators.email, Validators.required])],
      password: [this.user.pwd, Validators.required]
    });
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  onMdpOublie() {
  }

  onChangePwd() {
  }

  login() {
    this.AuthSrv.login(this.loginForm.value).pipe( delay( 1000 ),first())    
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
    },
      error => {
        this.error = error;
        this.loading = false;
    });
  }
}
