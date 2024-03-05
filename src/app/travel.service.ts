import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Travel } from './store/travel.state'
@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private apiUrl = 'http://localhost:3000/travels';

  constructor(private http: HttpClient) { }

  getTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(this.apiUrl);
  }
}
