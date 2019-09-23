import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { LoadCars } from '@core/store/actions/car.actions';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@core/models/language';
import { ChangeLanguage } from '@core/store/actions/language.actions';

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
  ) {
    const langKey = 'language';
    const storedLanguage = localStorage.getItem(langKey);
    if (storedLanguage) {
      store.dispatch(new ChangeLanguage(storedLanguage));
    } else {
      const browserLang = translate.getBrowserLang();
      if (Object.values(Language).includes(browserLang as Language)) {
        store.dispatch(new ChangeLanguage(browserLang));
      }
    }
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadCars());
  }
}
