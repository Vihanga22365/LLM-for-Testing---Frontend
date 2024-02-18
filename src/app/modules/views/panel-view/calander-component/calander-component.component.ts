import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarDayViewBeforeRenderEvent, CalendarEvent, CalendarMonthViewBeforeRenderEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth, set } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { ResponseObject } from 'src/app/core/models/response-object.model';
import { Timeline } from 'src/app/core/models/timeline.model';
import { TimelineService } from 'src/app/core/services/timeline.service';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calander-component',
  templateUrl: './calander-component.component.html',
  styleUrls: ['./calander-component.component.scss'],
})
export class CalanderComponentComponent implements OnInit, OnDestroy {
  view: CalendarView = CalendarView.Month;
  calenderData!: Timeline[];

  getCalendarDataSubscription$!: Subscription;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  loading: boolean = false;

  constructor(private _timelineService: TimelineService) {}

  ngOnInit(): void {
    this.getCalanderDetails();
    setTimeout(() => {
      this.loading = true;
    }, 2000);
  }

  activeDayIsOpen!: boolean;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  async getData(userType: string, userId: string) {
    this.getCalendarDataSubscription$ = await this._timelineService.getCalanderDetails(userType, userId).subscribe({
      next: (response: ResponseObject) => {
        this.calenderData = response.data;
        console.log(this.calenderData);
        this.calenderData.forEach((timeline, index) => {
          const meetingTitle = `${timeline.bankerFirstName} Meeting with ${timeline.customerFirstName} - (${timeline.meetingId})`;
          const meetingStartTime = new Date(timeline.meetingDate).toISOString().substring(0, 10) + ' ' + timeline.startTime;
          const meetingEndTime = new Date(timeline.meetingDate).toISOString().substring(0, 10) + ' ' + timeline.endTime;
          let newColor: any;

          if (index % 3 === 0) {
            newColor = colors.blue;
          } else if (index % 3 === 1) {
            newColor = colors.yellow;
          } else if (index % 3 === 2) {
            newColor = colors.red;
          }

          this.events.push({
            title: meetingTitle,
            color: newColor,
            start: new Date(meetingStartTime),
            end: new Date(meetingEndTime),
          });
        });

        // this.cdr.markForCheck();
        // this.refresh.next(true);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async getCalanderDetails() {
    const userType: string = localStorage.getItem('logUserType') == 'employee' ? 'banker' : 'customer';
    const userId: string = localStorage.getItem('logUserId')!;

    this.getData(userType, userId);
  }

  ngOnDestroy(): void {
    this.getCalendarDataSubscription$?.unsubscribe();
  }
}
