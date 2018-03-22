import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    url = 'http://localhost:63159/api/Account';
  constructor(private http: HttpClient) { }

    login(user: any) {
        return this.http.post<any>(this.url+'/authenticate', user)
            .map(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
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
