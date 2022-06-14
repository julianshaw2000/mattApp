import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../_environments/environment';
import { User } from '../_models/User';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users')
  }

  saveUser(user: User): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'users', user)
  }

  deleteUser(id: string): Observable<any> {
    {
      return this.http.delete(this.baseUrl + 'users' + '/' + id)
    }


  }
}
