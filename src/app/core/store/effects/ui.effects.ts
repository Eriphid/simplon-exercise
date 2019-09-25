import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromUIActions from '@core/store/actions/ui.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AppDateAdapter } from 'app/material/date.adapter';

@Injectable()
export class UIEffects {

  @Effect()
  ChangeLanguage$ = this.actions$.pipe(
    ofType(fromUIActions.ActionTypes.ChangeLanguage),
    switchMap((action: fromUIActions.ChangeLanguage) => this.translate.use(action.language)),
    tap((action: fromUIActions.ChangeLanguage) => localStorage.setItem('language', action.language)),
    switchMap(() => this.translate.get('date.format')),
    map((format: string) => new fromUIActions.ChangeDateFormat(format))
  );

  @Effect({dispatch: false})
  ChangeDateFormat$ = this.actions$.pipe(
    ofType(fromUIActions.ActionTypes.ChangeDateFormat),
    tap((action: fromUIActions.ChangeDateFormat) => AppDateAdapter.dateformat = action.format)
  );

  constructor(
    private translate: TranslateService,
    private readonly actions$: Actions) { }
}
