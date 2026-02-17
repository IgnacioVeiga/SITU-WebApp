import { inject, Injectable } from '@angular/core';
import { GenericAPIService } from './generic-api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = inject(GenericAPIService);

  GetUsers(pageIndex: number, pageSize: number, companyId: number): Observable<Page<User>> {
    return this.api.GET<Page<User>>(`users/${pageIndex}/${pageSize}/${companyId}`);
  }

  GetUser(id: number): Observable<User> {
    return this.api.GET<User>(`users/${id}`);
  }

  CreateUser(user: User): Observable<number> {
    return this.api.POST<number>('users', user);
  }

  EditUser(user: User): Observable<User> {
    return this.api.PUT<User>(`users/${user.id}`, user);
  }

  // This could be moved to another image service.
  SetProfilePic(imgFile: File, dni: number, userId: number): Observable<boolean> {
    const formData = new FormData();
    formData.append('imgFile', imgFile, imgFile.name);
    formData.append('dni', dni.toString());
    formData.append('userId', userId.toString());

    return this.api.POST<boolean>('images/upload/user-profile', formData);
  }

  RemoveUser(userId: number): Observable<void> {
    return this.api.DELETE<void>(`users/${userId}`);
  }
}
