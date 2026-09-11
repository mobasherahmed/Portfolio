import { TestBed } from '@angular/core/testing';
import { configureServiceTest } from 'src/testing/test-setup';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    configureServiceTest();
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mark Arabic as RTL and English as LTR', () => {
    service.changeLanguage('ar');
    expect(service.isRtl()).toBeTrue();
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');

    service.changeLanguage('en');
    expect(service.isRtl()).toBeFalse();
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
  });

  it('should ignore an unsupported language', () => {
    service.changeLanguage('en');
    service.changeLanguage('es' as any);
    expect(service.language).toBe('en');
  });
});
