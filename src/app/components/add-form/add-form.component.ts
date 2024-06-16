import { Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms'
import { ReportServiceService } from 'src/app/services/report.service.service';
import {Router} from '@angular/router';
import { upload } from 'src/app/upload';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit{
  createdReport: upload = new upload;
  form: FormGroup;
  Breed: string[] = ['Micro Pig', 'Chester White', 'Berkshire Pig', 'Duroc Pig'];
  Location: string[] = [];
  Long: number[] = [];
  Lat: number[] = [];

  constructor(private router:Router, private rs: ReportServiceService){
    let FormControls = {
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      pid: new FormControl('', Validators.required),
      breed: new FormControl('Micro Pig', Validators.required),
      notes: new FormControl(''),
      long: new FormControl(''),
      lat: new FormControl(''),
      enterLocation: new FormControl(false),
      location: new FormControl('', Validators.required),
      status: new FormControl('READY FOR PICK UP'),
    }
    this.form = new FormGroup(FormControls);
  }
  
  ngOnInit(): void {
     // grab locations and long lat from server
     this.rs.getReports().subscribe((reportsData)=>{
      // console.log(reportsData);
      for(let i = 0; i< Object.keys(reportsData).length; i++){
        if(!this.Location.includes(reportsData[i]['data']['location'])){
          this.Location.push(reportsData[i]['data']['location']);
          this.Long.push(reportsData[i]['data']['long']);
          this.Lat.push(reportsData[i]['data']['lat']);
        }
      }
     })
    //  console.log(this.Location);
    //  console.log(this.Long);
    //  console.log(this.Lat);
  }

  // Generate Unique ID
  uniqueID(): string{return String((new Date()).getTime());}

  onSubmit() {
    var longitude: number;
    var latitude: number;
    var key: string = this.uniqueID();
    var time: Date = new Date();
    var finalTime: string = time.toLocaleString();
    if(this.Location.indexOf(this.form.get('location').value) != -1){
      longitude = this.Long[this.Location.indexOf(this.form.get('location').value)];
      latitude = this.Lat[this.Location.indexOf(this.form.get('location').value)];
    } else {
      longitude = this.form.get('long').value;
      latitude = this.form.get('lat').value;
    }

    const data ={
      name: this.form.get('name').value,
      phone: this.form.get('number').value,
      pid: this.form.get('pid').value,
      breed: this.form.get('breed').value,
      notes:this.form.get('notes').value,
      location: this.form.get('location').value,
      long:longitude,
      lat:latitude,
      status: 'READY FOR PICK UP',
      day: finalTime,
      id: key,
    }
    this.createdReport.key = key;
    this.createdReport.data = data;

    // console.log(this.createdReport);

     // call addReport
    this.rs.createReport(this.createdReport).subscribe();
    // head back to main page
    this.router.navigateByUrl('/');
  }
}
