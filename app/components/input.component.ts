import {Component, EventEmitter, Output} from '@angular/core';
import {PlagPositionsService} from "../services/plag-positions.service";


@Component({
  selector: 'input-comp',
  templateUrl: './app/components/input.component.html',
})
export class InputComponent{
  /**
   * Contains text entered by user
   */
  inputText:string;
  constructor(private s: PlagPositionsService){ }

  /**
   * Used to toggle from input.component to output.component in app.component
   */
  @Output() sendEventEmitter = new EventEmitter();

  /**
   * Called when send button was clicked
   * Emits event to toggle components
   */
  send() {
    //update PlagPosisitionService to current InputText
    this.s.updateInputText(this.inputText)
    //toggle OutputComponent
    this.sendEventEmitter.emit();
  }

}
