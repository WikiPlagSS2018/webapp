import {Component, EventEmitter, Output} from '@angular/core';
import {WikiPlagAPIService} from '../services/wikiplag-api.service';

@Component({
  selector: 'input-comp',
  templateUrl: './app/components/input.component.html',
})
export class InputComponent  {
  inputText:string;
  @Output() sendEventEmitter = new EventEmitter();



  send() {
       this.sendEventEmitter.emit();
  }
}
