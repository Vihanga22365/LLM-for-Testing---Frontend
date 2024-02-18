import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline.model';
import { environment } from 'src/environments/environment';
import { ResponseObject } from '../models/response-object.model';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  constructor(private _httpClinet: HttpClient) {}

  createTimeline(timeline: Timeline) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('countryCode', 'US');
    headers = headers.set('businessCode', 'GCB');
    headers = headers.set('uuid', '123456');

    return this._httpClinet.post<ResponseObject>(environment.MEETING_SERVICE_URL, timeline, { headers: headers });
  }

  getCalanderDetails(userType: string, userId: string) {
    return this._httpClinet.get<ResponseObject>(`${environment.MEETING_SERVICE_URL}/${userType}/${userId}`);
  }
}
