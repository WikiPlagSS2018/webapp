import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputComponent } from './components/input.component';
import { OutputComponent } from './components/output.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AboutComponent } from './components/about.component';
import { AlertService } from './services/alert.service';
import { FormsModule } from '@angular/forms';
import { PlagPositionsService } from './services/plag-positions.service';
import { HttpClientModule } from '@angular/common/http';
import { WikipediaAPIService } from './services/wikipedia-api.service';
import { TextShorteningService } from './services/text-shortening.service';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    OutputComponent,
    SafeHtmlPipe,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AlertService, PlagPositionsService, WikipediaAPIService, TextShorteningService],
  bootstrap: [AppComponent]
})
export class AppModule { }
