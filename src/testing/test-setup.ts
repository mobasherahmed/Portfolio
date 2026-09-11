import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import en from '../assets/i18n/en.json';

/**
 * The templates iterate over translated arrays (jobs, case studies, skills), so a
 * no-op loader would hand *ngFor a raw key string and every spec would fail on a
 * differ error. Loading the real en.json keeps the specs honest: if a content key
 * is renamed or dropped, the component specs catch it.
 */
class TestTranslateLoader implements TranslateLoader {
  getTranslation(): Observable<any> {
    return of(en);
  }
}

export function configureComponentTest(declarations: any[]) {
  const configured = TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      NoopAnimationsModule,
      ReactiveFormsModule,
      NgbModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TestTranslateLoader },
      }),
    ],
    declarations,
    schemas: [NO_ERRORS_SCHEMA],
  });

  // Without an active language the pipe echoes the key back, and *ngFor over a
  // translated array would receive a bare string.
  const translate = TestBed.inject(TranslateService);
  translate.setDefaultLang('en');
  translate.use('en');

  return configured.compileComponents();
}

/** Services here depend on HttpClient and/or TranslateService. */
export function configureServiceTest() {
  return TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TestTranslateLoader },
      }),
    ],
  });
}
