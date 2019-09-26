import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Language } from '@core/models/language';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { ChangeLanguage } from '@core/store/actions/ui.actions';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  getLangs() {
    const langs: { [k: string]: { class: string, value: string } } = Object.keys(Language).reduce(
      (prev, lang) => Object.assign(prev, { [lang]: { class: lang, value: lang }}),
      {}
    );
    langs.en.class = 'gb';

    return Object.values(langs);
  }

  onClick(lang: Language) {
    this.store.dispatch(new ChangeLanguage(lang));
  }
}
