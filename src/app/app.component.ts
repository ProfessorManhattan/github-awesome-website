import { Component } from '@angular/core';
import { IonApp, IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DataViewComponent } from './components/data-view/data-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonApp,
    IonContent,
    HeaderComponent,
    FooterComponent,
    DataViewComponent,
  ],
  template: `
    <ion-app>
      <app-header
        (searchChange)="dataView.searchTerm = $event; dataView.filterData()"
        (languageChange)="dataView.activeLanguage$.next($event); dataView.filterData()"
        (resetFilters)="dataView.searchTerm = ''; dataView.activeLanguage$.next(''); dataView.filterData()">
      </app-header>
      <ion-content>
        <app-data-view #dataView></app-data-view>
      </ion-content>
    </ion-app>
  `,
})
export class AppComponent {
  name = 'Ionic Angular App';
}
