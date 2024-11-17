import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideIonicAngular()
  ]
});