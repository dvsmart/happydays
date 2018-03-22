import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        if (localStorage.getItem('user') != null) {
            return true;
        }else{
            this.router.navigate(["/login"], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}