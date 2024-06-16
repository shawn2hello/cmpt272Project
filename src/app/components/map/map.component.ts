import { Component, AfterViewInit } from '@angular/core';
import { PigReport } from 'src/app/PigReport';
import { ReportServiceService } from 'src/app/services/report.service.service';
import * as L from 'leaflet';

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  private map: any;
  private locations: string[] = [];

  constructor(private rs: ReportServiceService) {}

  ngAfterViewInit(): void { 
    this.map = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2hhd24yaGVsbG8iLCJhIjoiY2xiMGVnNWVvMDY4aTN2azhzdHBkMGpqdiJ9.PufKow1LZBuMLQobypdobA', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    this.rs.getReports().subscribe((reportsData: any) =>{
      for(let i = 0; i < Object.keys(reportsData).length; i++){
        let lat = reportsData[i]['data']['lat'];
        let long = reportsData[i]['data']['long'];
        let location = reportsData[i]['data']['location'];
        this.locations.push(String(lat)+String(long));
        let count = this.locations.filter((v) => (v === String(lat)+String(long))).length;

        L.marker([lat,long]).addTo(this.map)
        .bindPopup("<b>" + location + "</b><br />cases reported." + count).openPopup();
      }
    })
  }
}
