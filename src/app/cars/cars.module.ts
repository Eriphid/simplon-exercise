import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarEditComponent } from './components/edit/edit.component';
import { CarOverviewComponent } from './components/overview/overview.component';
import { MatTableModule, MatIconModule, MatButtonModule } from '@angular/material';
import { CdkColumnDef } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CarEditComponent,
    CarOverviewComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  providers: [
    CdkColumnDef
  ]
})
export class CarsModule { }
