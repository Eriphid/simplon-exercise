import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarEditComponent } from './components/edit/edit.component';
import { CarOverviewComponent } from './components/overview/overview.component';
import { MatTableModule } from '@angular/material';
import { CdkColumnDef } from '@angular/cdk/table';


@NgModule({
  declarations: [
    CarEditComponent,
    CarOverviewComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  providers: [
    CdkColumnDef
  ]
})
export class CarsModule { }
