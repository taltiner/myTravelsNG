import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TravelState } from './store/travel.state'
@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private apiUrl = 'http://localhost:3000/travels';

  constructor(private http: HttpClient) { }

  getTravels(): Observable<TravelState[]> {
    return this.http.get<TravelState[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching travels:', error);
        throw error; // Rethrow the error to be handled by the caller
      })
    );
  }
}
