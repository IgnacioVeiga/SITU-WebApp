import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly TABLE_NAME = 'users';

  constructor(private api: ApiClientService) { }

  GetUsers(pageIndex: number, pageSize: number, companyId: number): Observable<Page<User>> {
    return this.api.GET<any>(`${this.TABLE_NAME}/list/${pageIndex}/${pageSize}/${companyId}`);
  }

  GetUser(id: number): Observable<User> {
    return this.api.GET<User>(`${this.TABLE_NAME}/get/${id}`);
  }

  CreateUser(user: User): Observable<User> {
    return this.api.POST<User>(this.TABLE_NAME, user);
  }

  EditUser(user: User): Observable<User> {
    return this.api.PUT<User>(`${this.TABLE_NAME}/${user.id}`, user);
  }

  SetProfilePic(imgFile: File, dni: number, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('imgFile', imgFile, imgFile.name);
    formData.append('dni', dni.toString());
    formData.append('userId', userId.toString())

    return this.api.POST<any>('images/upload/user-profile', formData);
  }

  RemoveUser(userId: number): Observable<boolean> {
    return this.api.DELETE<any>(`${this.TABLE_NAME}/${userId}`);
  }
}
