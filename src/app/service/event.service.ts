import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../model/event';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  serverUrl: string = 'http://localhost:3000/events';

  list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Event[]>(this.serverUrl).subscribe(events => this.list$.next(events));
  }

  get(id: number): Observable<Event> {
    return Number(id) === 0 ? of(new Event()) : this.http.get<Event>(`${this.serverUrl}/${Number(id)}`);
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(`${this.serverUrl}/${event.id}`, event);
  }

  create(event: Event): Observable<Event> {
    return this.http.post<Event>(this.serverUrl, event);
  }

  remove(id: number): Observable<Event> {
    return this.http.delete<Event>(`${this.serverUrl}/${id}`);
  }

}
