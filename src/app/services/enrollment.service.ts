import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
const BASE_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  rowValueChange$ = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  getEnrollees() {
    return this.http.get(`${BASE_URL}/enrollees`);
  }

  updateEnrollee(id: string, payload: any) {
    return this.http.put(`${BASE_URL}/enrollees/${id}`, payload);
  }
}
