import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as mabbox from 'mapbox-gl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '@env/environment';

(mabbox as any).accessToken = environment.mapboxAccessToken;

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
