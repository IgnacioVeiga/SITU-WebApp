import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly TABLE_NAME = 'users';

  constructor(private api: ApiService) { }

  GetUsers(pageIndex: number, pageSize: number, companyId?: number): Observable<UserModel> {
    if (!companyId) {
      companyId = 0;
    }
    return this.api.GET<UserModel>(`${this.TABLE_NAME}?companyId=${companyId}&_page=${pageIndex}&_limit=${pageSize}`);
  }

  GetUser(userId: number): Observable<any> {
    return this.api.GET<any>(`${this.TABLE_NAME}/${userId}`);
  }

  CreateUser(user: UserModel): Observable<any> {
    return this.api.POST<UserModel>(this.TABLE_NAME, user);
  }

  EditUser(user: UserModel): Observable<any> {
    return this.api.UPDATE<UserModel>(`${this.TABLE_NAME}/${user.id}`, user);
  }

  RemoveUser(userId: number): Observable<any> {
    return this.api.DELETE<UserModel>(`${this.TABLE_NAME}/${userId}`);
  }
}
