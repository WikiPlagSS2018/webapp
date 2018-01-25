import { Component } from '@angular/core';
import { OutputComponent } from "./components/output.component";
import {PlagPositionsService} from './services/plag-positions.service';
import {WikipediaAPIService} from './services/wikipedia-api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  providers: [PlagPositionsService, WikipediaAPIService],
})

/**
 * angular 2 root component
 */
export class AppComponent  {
  /**
   * true when input.component is displayed
   */
  showInput: boolean;

  /**
   * true when outpout.component is displayed
   */
  showOutput: boolean;

  /**
   * at launch input.component is displayed and output.component is not displayed
   */
  constructor() {
    this.showInput = true;
    this.showOutput = false;
  }

  /**
   * toggles displayed components when button is clicked
   */
  toggleComponents() {
    this.showInput = !this.showInput;
    this.showOutput = !this.showOutput;
  }

}
