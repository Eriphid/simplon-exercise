import { NgModule } from '@angular/core';
import { MatTableModule, MatIconModule, MatButtonModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule, MatSortModule, MatInputModule, MatSelectModule, MatDatepickerModule } from '@angular/material';
import { DateAdapter } from '@angular/material';
import { AppDateAdapter } from './date.adapter';

@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  exports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter }
  ]
})
export class MaterialModule { }
