import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarEditComponent } from './components/edit/edit.component';
import { CarOverviewComponent } from './components/overview/overview.component';
import { MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CdkColumnDef } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    CdkColumnDef
  ]
})
export class CarsModule { }
