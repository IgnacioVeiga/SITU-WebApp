import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { UserModel } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  GetUsers(pageIndex?: number, pageSize?: number): Observable<UserModel> {
    return this.api.GET<UserModel>('users');
  }

  CreateUser(user: UserModel): Observable<any> {
    return this.api.POST<UserModel>('users', user);
  }

  EditUser(user: UserModel): Observable<any> {
    return this.api.UPDATE<UserModel>(`users/${user.id}`, user);
  }
}
