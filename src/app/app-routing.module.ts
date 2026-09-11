import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArchiveComponent } from './components/archive/archive.component';

/**
 * Language is handled as a URL prefix (/en, /ar) so that the links shared on the
 * CV and on LinkedIn resolve to a real, crawlable route instead of being pushed
 * onto the URL client-side after bootstrap.
 */
const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'projects', component: ArchiveComponent },

  { path: 'en', component: HomeComponent },
  { path: 'en/projects', component: ArchiveComponent },

  { path: 'ar', component: HomeComponent },
  { path: 'ar/projects', component: ArchiveComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
