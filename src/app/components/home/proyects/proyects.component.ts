import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss']
})
export class ProyectsComponent implements OnInit, OnDestroy {

  customOptions!: OwlOptions;

  /**
   * Owl lays its stage out with absolute offsets computed at creation time. Left
   * in LTR under dir="rtl" it positioned the stage at left:-19215px and pushed
   * documentElement.scrollWidth to 11439px, which squeezed the whole page into a
   * narrow column. It has to be told the direction, and rebuilt when it changes.
   */
  carouselEnabled = true;

  /** Keeps the archive link inside the active language prefix (/en, /ar). */
  get archiveLink(): string[] {
    return ['/', this.languageService.language, 'projects'];
  }

  private langSub?: Subscription;

  constructor(
    public analyticsService: AnalyticsService,
    public languageService: LanguageService,
  ) { }

  ngOnInit(): void {
    this.customOptions = this.buildOptions();

    this.langSub = this.languageService.translateService.onLangChange.subscribe(() => {
      this.customOptions = this.buildOptions();
      this.carouselEnabled = false;
      setTimeout(() => (this.carouselEnabled = true));
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  private buildOptions(): OwlOptions {
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      navSpeed: 700,
      items: 1,
      autoplay: true,
      autoplayTimeout: 6000,
      nav: false,
      dots: true,
      rtl: this.languageService.isRtl(),
    };
  }
}
