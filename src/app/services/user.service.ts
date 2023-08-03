import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { UserModel } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly TABLE_NAME = 'users';

  constructor(private api: ApiService) { }

  GetUsers(pageIndex: number, pageSize: number): Observable<UserModel> {
    return this.api.GET<UserModel>(`${this.TABLE_NAME}?_page=${pageIndex}&_limit=${pageSize}`);
  }

  CreateUser(user: UserModel): Observable<any> {
    return this.api.POST<UserModel>(this.TABLE_NAME, user);
  }

  EditUser(user: UserModel): Observable<any> {
    return this.api.UPDATE<UserModel>(`${this.TABLE_NAME}/${user.id}`, user);
  }

  RemoveUser(id: number): Observable<any> {
    return this.api.DELETE<UserModel>(`${this.TABLE_NAME}/${id}`);
  }
}
