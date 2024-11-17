import { Component } from '@angular/core';
import {
  IonFooter,
  IonTitle,
  IonToolbar,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IonFooter, IonTitle, IonToolbar, IonText],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
