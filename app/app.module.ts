import {NgModule}      from '@angular/core';
import {FormsModule} from "@angular/forms";
import  {HttpClientModule, HttpClientJsonpModule} from "@angular/common/http";


import {AppComponent}  from './app.component';
import {InputComponent} from "./components/input.component";
import {OutputComponent} from "./components/output.component";
import {AboutComponent} from "./components/about.component";
import {SafeHtmlPipe} from "./pipes/safe-html.pipe";
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, HttpClientJsonpModule],
  declarations: [AppComponent, InputComponent, OutputComponent, SafeHtmlPipe, AboutComponent],
  bootstrap: [AppComponent],
  entryComponents: [OutputComponent]
})
export class AppModule {
}
