import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarEditComponent } from './components/edit/edit.component';
import { CarOverviewComponent } from './components/overview/overview.component';
import { MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, DateAdapter } from '@angular/material';
import { CdkColumnDef } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DatifyPipe } from './pipes/datify.pipe';
import { AppDateAdapter } from './shared/date.adapter';

@NgModule({
  declarations: [
    CarEditComponent,
    CarOverviewComponent,
    DatifyPipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    CdkColumnDef,
    { provide: DateAdapter, useClass: AppDateAdapter }
  ]
})
export class CarsModule { }
