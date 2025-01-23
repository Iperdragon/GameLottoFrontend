import { Component } from '@angular/core';
import {Registration} from '../../model/Registration';
import {FormsModule} from '@angular/forms';
import {CredentialServiceService} from '../../services/credential-service.service';
import {HttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private servizioCredenziali:CredentialServiceService) {
  }

  register:Registration={username:"", password:"", email:""};

  submit()
  {
    this.servizioCredenziali.register(this.register)
  }
}
