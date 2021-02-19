import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList: BehaviorSubject<Event[]> = this.eventService.list$;
  testEvent: Observable<Event> = this.eventService.get(1);

  constructor(
    private eventService: EventService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.eventService.getAll();
  }

  onDelete(id: number): void {
    this.eventService.remove(id).subscribe(
      () => {
        this.toastr.success('Event has been successfully deleted.', 'Success!', { timeOut: 3000 });
        this.eventService.getAll();
      }
    );
  }

}
