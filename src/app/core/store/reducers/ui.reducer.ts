import { Language } from '@core/models/language';
import * as fromUIActions from '../actions/ui.actions';

export interface State {
    language: Language;
    dateformat: string;
}

const initialState: State = {
    language: undefined,
    dateformat: undefined
};

export function reducer(state: State = initialState, action: fromUIActions.Actions): State {
    switch (action.type) {
        case fromUIActions.ActionTypes.ChangeLanguage:
            return {
                ...state,
                language: action.language
            };
        case fromUIActions.ActionTypes.ChangeDateFormat:
            return {
                ...state,
                dateformat: action.format
            };
        default:
            return state;
    }
}
