import { Component } from '@angular/core';
import { OutputComponent } from "./components/output.component";


@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
})
export class AppComponent  {
  showInput: boolean;
  showOutput: boolean;

  constructor() {
    this.showInput = true;
    this.showOutput = false;

  }

  toggleComponents() {
    this.showInput = !this.showInput;
    this.showOutput = !this.showOutput;
  }

}
