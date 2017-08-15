import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    token: string;
    constructor(private router: Router) {
        this.token = localStorage.getItem('access_token');
    }

    canActivate() {
        // properly check if the token is valid
        // Toma or Doru should implement a tokeninfo rest call 
        this.token = localStorage.getItem('access_token');
        if (this.token) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}