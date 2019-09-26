import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarEditComponent } from './components/edit/edit.component';
import { CarOverviewComponent } from './components/overview/overview.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '@core/core.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'app/material/material.module';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { ConfirmDialogComponent } from './components/overview/confirm-dialog/confirm-dialog.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';

const TranslateRootModule = TranslateModule.forChild({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
});

@NgModule({
  declarations: [
    CarEditComponent,
    CarOverviewComponent,
    LanguageSelectorComponent,
    ConfirmDialogComponent,
    LoadingOverlayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateRootModule,
    MaterialModule
  ],
  providers: [
    CdkColumnDef
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  exports: [
    TranslateModule,
    ConfirmDialogComponent
  ]
})
export class CarsModule { }
