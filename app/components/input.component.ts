import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'input-comp',
  templateUrl: './app/components/input.component.html',
})
export class InputComponent  {
  inputText:string;
  @Output() sendEventEmitter = new EventEmitter();

  send() {
    this.sendEventEmitter.emit();
    this.inputText = '';
  }
}
