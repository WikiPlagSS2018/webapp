import { Component } from '@angular/core';
import { OutputComponent } from "./components/output.component";


@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
})
export class AppComponent  {
  hideInput: boolean;
  hideOutput: boolean;

  constructor() {
    this.hideInput = false;
    this.hideOutput = true;

  }

  toggleComponents() {
    this.hideInput = !this.hideInput;
    this.hideOutput = !this.hideOutput;
  }

}
