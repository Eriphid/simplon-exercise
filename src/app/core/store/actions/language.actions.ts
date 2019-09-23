import { Action } from '@ngrx/store';
import { Language } from '@core/models/language';

export enum ActionTypes {
    ChangeLanguage = "[Language] Change language",
    ChangeLanguageSuccess = "[Language] Change language success",
    ChangeLanguageFailed = "[Language] Change language failed"
}

export class ChangeLanguage implements Action {
    readonly type = ActionTypes.ChangeLanguage;
    constructor(public language: Language) { }
}

export class ChangeLanguageSuccess implements Action {
    readonly type = ActionTypes.ChangeLanguageSuccess;
    constructor(public language: Language) { }
}
export class ChangeLanguageFailed implements Action {
    readonly type = ActionTypes.ChangeLanguageFailed;
    constructor(public error: any) { }
}