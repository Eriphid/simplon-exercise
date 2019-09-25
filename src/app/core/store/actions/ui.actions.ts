import { Action } from '@ngrx/store';
import { Language } from '@core/models/language';

export enum ActionTypes {
    ChangeLanguage = '[UI] Change language',
    ChangeDateFormat = '[UI] Change date format'
}

export class ChangeLanguage implements Action {
    readonly type = ActionTypes.ChangeLanguage;
    constructor(public language: Language) { }
}

export class ChangeDateFormat implements Action {
    readonly type = ActionTypes.ChangeDateFormat;
    constructor(public format: string) { }
}

export type Actions = ChangeLanguage | ChangeDateFormat;
