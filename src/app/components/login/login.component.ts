import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CredentialServiceService} from '../../services/credential-service.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent
{
  constructor(private servizioCredenziali:CredentialServiceService, private http:HttpClient) {
  }

  credenziali={username:"", password:""};

  login()
  {
    this.servizioCredenziali.login(this.credenziali)
  }
}
