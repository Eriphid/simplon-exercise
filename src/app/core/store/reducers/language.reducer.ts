import { Language } from '@core/models/language';
import { ActionTypes, ChangeLanguageSuccess } from '../actions/language.actions';

export function reducer(state: Language = Language.en, action: ChangeLanguageSuccess): Language {
    if (action.type !== ActionTypes.ChangeLanguageSuccess)
        return state;
    return action.language;
}