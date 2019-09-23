import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromLanguageActions from '@core/store/actions/language.actions';
import { catchError, map, switchMap, switchAll, mergeAll, tap } from 'rxjs/operators';
import { CarService } from '@core/services/car.service';
import { of, Observable, Subscriber } from 'rxjs';
import { Action } from '@ngrx/store';
import { Car } from '@core/models/car';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageEffects {

  @Effect()
  ChangeLanguage$ = this.actions$
    .pipe(
      ofType(fromLanguageActions.ActionTypes.ChangeLanguage),
      switchMap((action: fromLanguageActions.ChangeLanguage) => this.translate.use(action.language).pipe(
          map(() => new fromLanguageActions.ChangeLanguageSuccess(action.language))
      )),
      tap((action: fromLanguageActions.ChangeLanguageSuccess) => localStorage.setItem("language", action.language)),
      catchError((error) => of(new fromLanguageActions.ChangeLanguageFailed(error)))
    );

  constructor(
    private translate: TranslateService,
    private readonly actions$: Actions) { }
}
