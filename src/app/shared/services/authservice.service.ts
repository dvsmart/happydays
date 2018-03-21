import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    url = 'http://localhost:63159/api/Account';
  constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        debugger;
        return this.http.post<any>(this.url+'/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    create(model:any){
        return this.http.post<any>(this.url+'/register', model)
        .map(response => {
            if (response) {
                return response;
            }
        });
    }

}
