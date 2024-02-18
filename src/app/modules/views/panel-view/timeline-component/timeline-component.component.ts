import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { el } from 'date-fns/locale';
import { Subscription } from 'rxjs';
import { Timeline } from 'src/app/core/models/timeline.model';
import { TimelineService } from 'src/app/core/services/timeline.service';
import { HostType } from 'src/app/core/utils/hostType';

@Component({
  selector: 'app-timeline-component',
  templateUrl: './timeline-component.component.html',
  styleUrls: ['./timeline-component.component.scss'],
})
export class TimelineComponentComponent implements OnInit, OnDestroy {
  timelineForm!: FormGroup;
  meetingIdFormControl = new FormControl('', [Validators.required]);
  bankerIdFormControl = new FormControl('', [Validators.required]);
  customerIdFormControl = new FormControl('', [Validators.required]);
  bankerFirstNameFormControl = new FormControl('', [Validators.required]);
  bankerLastNameFormControl = new FormControl('', []);
  customerFirstNameFormControl = new FormControl('', [Validators.required]);
  customerLastNameFormControl = new FormControl('', []);
  hostTypeFormControl = new FormControl('', [Validators.required]);
  meetingDateFormControl = new FormControl('', [Validators.required]);
  startTimeFormControl = new FormControl('', [Validators.required]);
  endTimeFormControl = new FormControl('', [Validators.required]);

  hostType: HostType[] = [{ name: 'FA' }, { name: 'RM' }];

  createTimelineSubscription$!: Subscription;

  constructor(private _formBuilder: FormBuilder, private _timelineService: TimelineService, private _snackBar: MatSnackBar) {}

  openSnackBar(message: any, emoji: any) {
    this._snackBar.open(message, emoji, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      // duration: 3000,
    });
  }

  ngOnInit(): void {
    this.timelineForm = this._formBuilder.group({
      meetingId: this.meetingIdFormControl,
      bankerId: this.bankerIdFormControl,
      customerId: this.customerIdFormControl,
      bankerFirstName: this.bankerFirstNameFormControl,
      bankerLastName: this.bankerLastNameFormControl,
      customerFirstName: this.customerFirstNameFormControl,
      customerLastName: this.customerLastNameFormControl,
      hostType: this.hostTypeFormControl,
      meetingDate: this.meetingDateFormControl,
      startTime: this.startTimeFormControl,
      endTime: this.endTimeFormControl,
    });
  }

  submitTimelineForm() {
    if (this.timelineForm.valid) {
      const timelineFormData: Timeline = this.timelineForm.getRawValue();
      timelineFormData.startTime = timelineFormData.startTime + ':00';
      timelineFormData.endTime = timelineFormData.endTime + ':00';
      this.createTimelineSubscription$ = this._timelineService.createTimeline(timelineFormData).subscribe({
        next: (response) => {
          if (response.status === 'CREATED') {
            let message = response.message;
            this.openSnackBar(message, '😋');
          } else {
            let message = 'Meeting Create Unsuccessful';
            this.openSnackBar(message, '😭');
          }
        },
        error: (error) => {
          console.log(error);
          let message = 'Meeting Create Unsuccessful';
          this.openSnackBar(message, '😭');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.createTimelineSubscription$?.unsubscribe();
  }
}
