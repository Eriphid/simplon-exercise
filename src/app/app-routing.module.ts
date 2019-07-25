import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarEditComponent } from './cars/components/edit/edit.component';
import { CarOverviewComponent } from './cars/components/overview/overview.component';

const routes: Routes = [
  { path: 'app/cars/overview', component: CarOverviewComponent },
  { path: 'app/cars/edit/:id', component: CarEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
