import {Component, EventEmitter, Output} from '@angular/core';
import {PlagPositionsService} from '../services/plag-positions.service';

@Component({
  selector: 'input-comp',
  templateUrl: './app/components/input.component.html',
  providers: [PlagPositionsService],
})
export class InputComponent{
  /**
   * Contains text entered by user
   */
  inputText:string;

  minimumSentenceLength = 6

  threshold = 0.85

  maxDistanceBetweenNgrams = 6

  maxAverageDistance = 3

  secondaryThreshold = 0.80

  constructor(private plagPositionsService: PlagPositionsService) {}

  /**
   * Used to toggle from input.component to output.component in app.component
   */
  @Output() sendEventEmitter = new EventEmitter();

  /**
   * Called when send button was clicked
   * Emits event to toggle components
   */
  send() {
    // post these json file to server
    var json = JSON.stringify({})
    this.plagPositionsService.postPlagServer(json)

    this.sendEventEmitter.emit();

  }

  openFile(event) {
    var input = event.target;
    for (var index = 0; index < input.files.length; index++) {
        var  reader = new FileReader();

        reader.onload = () => {
            var text = reader.result;
            this.inputText = text
        }
        reader.readAsBinaryString(input.files[index]);

    };
  }

}
