import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ahmed-mobasher-portfolio';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translateService: TranslateService,
    private languageService: LanguageService,
  ) { }

  ngOnInit(): void {
    this.languageService.initLanguage();

    // Title and description follow the active language.
    this.translateService.onLangChange.subscribe(() => this.applyMeta());
    this.applyMeta();

    AOS.init({
      once: true,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }

  private applyMeta(): void {
    this.translateService.get(['Meta.Title', 'Meta.Description']).subscribe(t => {
      this.titleService.setTitle(t['Meta.Title']);
      this.metaService.updateTag({ name: 'description', content: t['Meta.Description'] });
      this.metaService.updateTag({ property: 'og:title', content: t['Meta.Title'] });
      this.metaService.updateTag({ property: 'og:description', content: t['Meta.Description'] });
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: [
        'Ahmed Mobasher', 'Senior Frontend Engineer', 'Frontend Tech Lead',
        'Angular Developer', 'Angular Architect', 'TypeScript', 'RxJS', 'NgRx',
        'Angular Signals', 'Nx Monorepo', 'Micro Frontends', 'Frontend Architecture',
        'Design Systems', 'GraphQL', 'PrimeNG', 'AG Grid', 'Tailwind CSS',
        'Cypress', 'Playwright', 'CI/CD', 'Docker', 'Ionic',
        'AI-Assisted Development', 'Cairo', 'Egypt', 'Remote',
      ].join(', '),
    });
  }
}
