import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { LoadCars } from '@core/store/actions/car.actions';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@core/models/language';
import { ChangeLanguage } from '@core/store/actions/ui.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    private readonly store: Store<State>,
    private readonly translate: TranslateService
  ) { }

  loadLanguage() {
    const langKey = 'language';
    const storedLanguage = localStorage.getItem(langKey);
    let lang: Language;
    if (storedLanguage) {
      lang = storedLanguage as Language;
    } else {
      lang = this.translate.getBrowserLang() as Language;
    }

    if (!Object.values(Language).includes(lang)) {
      lang = Language.en;
    }

    this.store.dispatch(new ChangeLanguage(lang));
  }

  ngOnInit(): void {
    // this.store.dispatch(new LoadCars());
    this.loadLanguage();
  }
}
