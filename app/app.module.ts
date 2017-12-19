import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";

import {AppComponent}  from './app.component';
import {InputComponent} from "./components/input.component";
import {OutputComponent} from "./components/output.component";
import {SafeHtmlPipe} from "./pipes/safe-html.pipe";

import {PlagPositionsService} from "./services/plag-positions.service";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, JsonpModule],
  declarations: [AppComponent, InputComponent, OutputComponent, SafeHtmlPipe],
  providers: [PlagPositionsService],
  bootstrap: [AppComponent],
  entryComponents: [OutputComponent]
})
export class AppModule {
}
