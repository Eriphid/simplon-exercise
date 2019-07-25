import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarEditComponent } from './components/edit/edit.component';
import { CarOverviewComponent } from './components/overview/overview.component';



@NgModule({
  declarations: [CarEditComponent, CarOverviewComponent],
  imports: [
    CommonModule
  ]
})
export class CarsModule { }
