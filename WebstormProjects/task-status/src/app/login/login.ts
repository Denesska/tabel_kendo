import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class Login {
    baseUrl = environment.baseUrl;

    constructor(public router: Router, public http: Http) {}

    login(event, username, password) {
        event.preventDefault();
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(`${this.baseUrl}/Account/Token`, headers,
            {
                body:
                `${encodeURIComponent("grant_type")}=password&
                 ${encodeURIComponent("Username")}=${username}&
                 ${encodeURIComponent("Password")}=${password}`
            })
            .map((res) => res.json())
            .subscribe(
            response => {
                debugger;
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('username', response.userName);
                localStorage.setItem('userId', response.userId);
                this.router.navigate(['home']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
    }
}
