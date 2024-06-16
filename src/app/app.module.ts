import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { TableComponent } from './components/table/table.component';
import { ButtonComponent } from './components/button/button.component';
import { TableItemComponent } from './components/table-item/table-item.component';
import { MainComponent } from './components/main/main.component';

const appRoutes: Routes =[
  {path: '', component: MainComponent},
  {path: 'addForm', component: AddFormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AddFormComponent,
    TableComponent,
    ButtonComponent,
    TableItemComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
