import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private readonly TABLE_NAME = 'buses';

  constructor(private api: ApiService) { }
}
