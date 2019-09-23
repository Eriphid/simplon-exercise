import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Language } from '@core/models/language';

export const featureSelector = createFeatureSelector<Language>("language");
export const languageSelector = createSelector(
    featureSelector,
    (state: Language) => state
)