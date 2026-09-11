import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, style, query, transition, stagger, animate } from '@angular/animations'
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { AppLanguage, LanguageService } from 'src/app/services/language/language.service';
import { CV_PATH } from 'src/app/services/cv.constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger("animateMenu",[
      transition(":enter",[
        query("*", [
          style({opacity: 0, transform: "translateY(-50%)"}),
          stagger(50,[
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({opacity: 1, transform: "none"}))
          ])
        ])
      ])
    ])
  ]
})



export class HeaderComponent implements OnInit {

  responsiveMenuVisible: Boolean = false;
  pageYPosition: number;
  languageFormControl: FormControl= new FormControl();

  constructor(
    private router: Router,
    public analyticsService: AnalyticsService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {

    this.languageFormControl.valueChanges.subscribe(val => this.languageService.changeLanguage(val))

    this.languageFormControl.setValue(this.languageService.language)

  }

  go(elementId: string, analyticsEvent: string): void {
    this.analyticsService.sendAnalyticEvent(analyticsEvent, 'menu', 'click');
    this.responsiveMenuVisible = false;

    const target = document.getElementById(elementId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    this.router.navigate(['/']).then(() =>
      document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' })
    );
  }

  downloadCV(): void {
    this.analyticsService.sendAnalyticEvent('click_download_cv', 'menu', 'cv');
    window.open(CV_PATH, '_blank', 'noopener');
    this.responsiveMenuVisible = false;
  }

  @HostListener('window:scroll', ['getScrollPosition($event)'])
    getScrollPosition(event) {
        this.pageYPosition=window.pageYOffset
    }

    changeLanguage(language: AppLanguage) {
      this.languageFormControl.setValue(language);
    }
}
