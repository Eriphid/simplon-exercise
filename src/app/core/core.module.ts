import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryCarService } from './services/in-memory-car.service';
import { CarService } from './services/car.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromCore from '@core/store';
import { CarEffects } from '@core/store/effects/car.effects';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageEffects } from './store/effects/language.effects';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryCarService, { passThruUnknownUrl: true }),
    StoreModule.forRoot(fromCore.reducers, { runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
    EffectsModule.forRoot([
      CarEffects,
      LanguageEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'Simplon Exercise',
      maxAge: 50
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CarService
  ]
})
export class CoreModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
