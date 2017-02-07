import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'input-comp',
  templateUrl: './app/components/input.component.html',
})
export class InputComponent  {
  /**
   * Contains text entered by user
   */
  inputText:string;

  /**
   * Used to toggle from input.component to output.component in app.component
   */
  @Output() sendEventEmitter = new EventEmitter();

  /**
   * Called when send button was clicked
   * Emits event to toggle components
   */
  send() {
       this.sendEventEmitter.emit();
  }
}
