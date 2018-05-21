import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Used to toggle from output.component to input.component in app.component
   */
  @Output() newInputEventEmitter = new EventEmitter();

  /**
   * true when input.component is displayed
   */
  showInput: boolean;

  /**
   * true when outpout.component is displayed
   */
  showOutput: boolean;

  /**
   * True when about.component is displayed
   */
  showAbout: boolean;

  /**
   * at launch input.component is displayed and output.component is not displayed
   */
  constructor() {
    this.showInput = true;
    this.showOutput = false;
    this.showAbout = false;
  }

  /**
   * Toggles a certain component
   * @param {string} name name of component
   */
  toggleComponent(name: string) {
    if (name == 'input' && (!this.showOutput || confirm('Zurück zur Texteingabe?'))) {
      this.showInput = true;
      this.showOutput = false;
      this.showAbout = false;
    } else if (name == 'output') {
      this.showInput = false;
      this.showOutput = true;
      this.showAbout = false;
    } else if (name == 'about') {
      this.showInput = false;
      this.showOutput = false;
      this.showAbout = true;
    }
  }
}
