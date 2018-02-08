import {Component, EventEmitter, Output} from '@angular/core';
import {PlagPositionsService} from '../services/plag-positions.service';

@Component({
  selector: 'input-comp',
  templateUrl: './app/components/input.component.html'
})
/**
 * Transmits inputText to PlagPositionsService
 * Capable of reading from .txt files
 */
export class InputComponent{
 
  buttonDisabled = false

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
    this.buttonDisabled = true;
    var json = JSON.stringify({"text": this.inputText })
    this.plagPositionsService.postPlagServer(json).subscribe(res=>{
        //set the data to the result
        this.plagPositionsService.data=res
        console.log("sent to output component")
        //switch to other component
        this.sendEventEmitter.emit();
    })

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
