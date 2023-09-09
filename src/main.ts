import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import * as emailEffect from './app/contact-form/store/effects';
import * as emailSentSuccess from './app/contact-form/store/effects';

import { contactFormFeatureKey, contactFormReducer } from './app/contact-form/store/reducer';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';


if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        importProvidersFrom(IonicModule.forRoot({})),
        provideRouter(routes),
        provideStore(),
        provideHttpClient(),
        provideState(contactFormFeatureKey, contactFormReducer),
        provideEffects(emailEffect, emailSentSuccess),
    ],
});
