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

  GetUsers(pageIndex: number, pageSize: number): Observable<Page<User>> {
    return this.api.GET<Page<User>>(`users/${pageIndex}/${pageSize}`);
  }

  GetUser(id: number): Observable<User> {
    return this.api.GET<User>(`users/${id}`);
  }

  CreateUser(user: User): Observable<User> {
    const payload = {
      dni: user.dni,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      role: user.role
    };
    return this.api.POST<User>('users', payload);
  }

  EditUser(user: User): Observable<User> {
    const payload = {
      dni: user.dni,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      role: user.role
    };
    return this.api.PUT<User>(`users/${user.id}`, payload);
  }

  // This could be moved to another image service.
  SetProfilePic(imgFile: File, dni: number, userId: number): Observable<void> {
    const formData = new FormData();
    formData.append('imgFile', imgFile, imgFile.name);
    formData.append('dni', dni.toString());
    formData.append('userId', userId.toString());

    return this.api.POST<void>('images/upload/user-profile', formData);
  }

  RemoveUser(userId: number): Observable<void> {
    return this.api.DELETE<void>(`users/${userId}`);
  }
}
