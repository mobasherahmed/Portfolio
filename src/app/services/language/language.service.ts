import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location, DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

export type AppLanguage = 'en' | 'ar';

const SUPPORTED: AppLanguage[] = ['en', 'ar'];
const STORAGE_KEY = 'am.lang';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: AppLanguage = 'en';

  constructor(
    public translateService: TranslateService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  initLanguage(): void {
    this.translateService.addLangs(SUPPORTED);
    this.translateService.setDefaultLang('en');
    this.applyLanguage(this.resolveInitialLanguage(), false);
  }

  changeLanguage(language: AppLanguage): void {
    if (!SUPPORTED.includes(language)) { return; }
    this.applyLanguage(language, true);
  }

  isRtl(): boolean {
    return this.language === 'ar';
  }

  /**
   * Order of precedence: explicit URL prefix (so a shared /ar link always wins),
   * then a previous choice, then the browser locale.
   */
  private resolveInitialLanguage(): AppLanguage {
    const fromUrl = this.location.path().split('/').filter(Boolean)[0];
    if (SUPPORTED.includes(fromUrl as AppLanguage)) {
      return fromUrl as AppLanguage;
    }

    const stored = this.safeRead(STORAGE_KEY);
    if (SUPPORTED.includes(stored as AppLanguage)) {
      return stored as AppLanguage;
    }

    const browser = (navigator.language || 'en').toLowerCase();
    return browser.startsWith('ar') ? 'ar' : 'en';
  }

  private applyLanguage(language: AppLanguage, updateUrl: boolean): void {
    this.language = language;
    this.translateService.use(language);
    this.safeWrite(STORAGE_KEY, language);

    const html = this.document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');

    if (updateUrl) {
      const rest = this.location.path().split('/').filter(Boolean);
      if (SUPPORTED.includes(rest[0] as AppLanguage)) { rest.shift(); }
      this.location.go(['', language, ...rest].join('/'));
    }
  }

  private safeRead(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  private safeWrite(key: string, value: string): void {
    try { localStorage.setItem(key, value); } catch { /* private mode */ }
  }
}
