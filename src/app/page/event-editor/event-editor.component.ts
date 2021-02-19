import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  updating: boolean = false;

  // 1. Kiolvasni az id paramétert az url-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap(params => this.eventService.get(params.id))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  onUpdate(form: NgForm, event: Event): void {
    this.updating = true;
    if (event.id === 0) {
      this.eventService.create(event).subscribe(
        () => {
          this.toastr.success('New event has been successfully created.', 'Success!', { timeOut: 3000 });
          this.router.navigate([''])
        }
      );
    } 
    else {
      this.eventService.update(event).subscribe(
        () => {
          this.toastr.success('Event has been successfully updated.', 'Success!', { timeOut: 3000 });
          this.router.navigate([''])
        }
      );
    }
  }

}
