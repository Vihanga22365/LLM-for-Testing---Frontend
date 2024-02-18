import { Time } from '@angular/common';

export interface Timeline {
  meetingId: string;
  bankerId: string;
  customerId: string;
  bankerFirstName: string;
  bankerLastName: string;
  customerFirstName: string;
  customerLastName: string;
  hostType: string;
  meetingDate: Date;
  startTime: any;
  endTime: any;
}
