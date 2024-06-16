import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { PigReport } from '../PigReport';
import { upload } from '../upload';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  private apiUrl = 'https://272.selfip.net/apps/nD69H7LdHB/collections/reports/documents/'
  
  constructor(private http:HttpClient) {}

  //SERVER METHODS
  getReports(): Observable<PigReport[]>{
    return this.http.get<PigReport[]>(this.apiUrl);
  }

  deleteReport(report: PigReport): Observable<PigReport>{
    const url = `${this.apiUrl}/${report.id}`;
    return this.http.delete<PigReport>(url);
  }

  createReport(report: upload): Observable<upload>{
    return this.http.post<upload>(this.apiUrl, report, httpOptions);
  }

  // updateStatus(report: PigReport): Observable<PigReport>{
  //   const url = `${this.apiUrl}/${report.id}`;
  //   const jsonReport = JSON.stringify(report);
  //   //have to create HTTP body
  //   const httpBody = {"key": ${report.id}, "data": ${jsonReport}};
  //   //console.log(httpBody);
  //   return this.http.put<PigReport>(url, httpBody, httpOptions);
  // }

  updateStatus(report: PigReport): Observable<upload>{
    const url = `${this.apiUrl}/${report.id}`;
    //const jsonReport = JSON.stringify(report);
    const httpBody: upload = new upload;
    httpBody.key = report.id;
    httpBody.data = report;
    return this.http.put<upload>(url, httpBody, httpOptions);
  }
}
