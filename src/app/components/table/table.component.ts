import { Component, AfterViewInit } from '@angular/core';
import { PigReport } from 'src/app/PigReport';
import { ReportServiceService } from 'src/app/services/report.service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {
  reports: PigReport[] = [];

  constructor(private rs: ReportServiceService){}

  ngAfterViewInit(): void {
    this.rs.getReports().subscribe((reportsData: any)=>{
      // console.log(reportsData);
      for(let i = 0; i < Object.keys(reportsData).length; i++){
        // reportsData[i]['data']['id'] = reportsData[i]['key'];
        this.reports.push(reportsData[i]['data']);
      }
    })
  }

  deleteReport(report: PigReport){
    this.rs.deleteReport(report).subscribe(
      (e) => {
      (this.reports = this.reports.filter(r => r.id!== report.id));
      console.log(e);
      window.location.reload();
    })
  }

  updateStatus(report: PigReport){
    if(report.status === "RETRIEVED"){
      report.status = "READY FOR PICKUP";
    }else{
      report.status = "RETRIEVED";
    }
    this.rs.updateStatus(report).subscribe();
  }

  sortTime() {
    this.reports.sort(function (a, b) {
      return new Date(a.day).getTime() - new Date(b.day).getTime();
    });
  }

  sortLocation() {
    this.reports.sort(function (a, b) {
      var A = a.location.toUpperCase();
      var B = b.location.toUpperCase();
      return A < B ? -1 : A > B ? 1 : 0;
    });
  }

  sortStatus() {
    this.reports.sort(function (a, b) {
      var A = a.status.toUpperCase();
      var B = b.status.toUpperCase();
      return A < B ? -1 : A > B ? 1 : 0;
    });
  }

  sortName() {
    this.reports.sort(function (a, b) {
      var A = a.name.toUpperCase();
      var B = b.name.toUpperCase();
      return A < B ? -1 : A > B ? 1 : 0;
    });
  }
}
