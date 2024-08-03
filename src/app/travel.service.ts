import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Travel } from './model/travel';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private apiUrl = 'http://localhost:3000/travels';
  private travelsSubject: BehaviorSubject<Travel[]> = new BehaviorSubject<Travel[]>([]);

  constructor(private http: HttpClient) {
    this.fetchTravels();
  }

  fetchTravels(): void {
    this.http.get<Travel[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching travels:', error);
        return throwError(error);
      })
    ).subscribe(travels => {
      this.travelsSubject.next(travels);
    });
  }

  getTravels(): Observable<Travel[]> {
    
    return this.http.get<Travel[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching travels:', error);
        throw error;
      })
    );
  }

  getTravel(id: string): Observable<Travel> {

    return this.http.get<Travel>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching travels:', error);
        throw error;
      })
    );
  }

  addTravels(newTravelData: any): void {
    this.getTravels().subscribe((travels: Travel[]) => {
      const lastId = travels.length > 0 ? Math.max(...travels.map(travel => +travel.id)) : 0;
      const newId = lastId + 1;

      const startDate = new Date(newTravelData.get('startDate').value).toISOString().split('T')[0];
      const endDate = new Date(newTravelData.get('endDate').value).toISOString().split('T')[0];

      const newTravel = {
        id: newId.toString(),
        startDate: startDate,
        endDate: endDate,
        country: newTravelData.get('country').value,
        city: newTravelData.get('city').value,
        activities: newTravelData.get('activities').value,
        comment: newTravelData.get('comment').value,
        rating: newTravelData.get('rating').value
      };

      this.http.post<any>(this.apiUrl, newTravel).subscribe(
        () => this.fetchTravels(),
        error => { 
          console.log(`Error adding travel:`, error);
          throw error;
        }
      );
    });
  }

  updateTravel(updatedTravelData: any, travelId: string): void {
    const travelUrl = `${this.apiUrl}/${travelId}`;
    this.http.put<any>(travelUrl, updatedTravelData).subscribe(
      () => this.fetchTravels(),
      error => { 
        console.log(`Error updating travel:`, error);
        throw error;
      }
    );
  }
  

  deleteTravels(travelIds: string[]) {
    travelIds.forEach(id => {
      const deleteUrl = `${this.apiUrl}/${id}`;
      this.http.delete<[]>(deleteUrl).subscribe(
        () => this.fetchTravels(),
        error => { 
          console.log(`Error deleting travel with ID ${id}:`, error);
          throw error;
        }
      );
    });
  }


}
