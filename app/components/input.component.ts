import {Component, EventEmitter, NgModule, Output} from '@angular/core';
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
  myAnimationClasses = {
    bounceInLeft: true,
    bounceOutRight: false
  };

  minimumTextLength = 100;

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
    //TODO: Do some other validations like length validation
    if(this.inputText != "" && this.inputText != undefined && this.minimumTextLength <= this.inputText.length){
      //Animation handling
      this.myAnimationClasses = {
        bounceInLeft: false,
        bounceOutRight: true
      };
      // post these json file to server
      var json = JSON.stringify({"text": this.inputText })
      this.plagPositionsService.postPlagServer(json).subscribe(res=>{
        //set the data to the result
        this.plagPositionsService.data=res
        console.log("sent to output component")
        //switch to other component
        this.sendEventEmitter.emit();
      })
    } else if(this.inputText == "" || this.inputText == undefined){
      //Empty textarea
      swal("Bitte Text eingeben", "Bitte geben Sie einen Text zum analysieren ein!", "warning");
    } else{
      swal("Bitte mehr Text eingeben", "Bitte geben Sie mindestes " + this.minimumTextLength + " Zeichen zum analysieren ein!", "warning");
    }
  }

  /**
   * open a given txt file and read using FileReader
   * @param event
   */
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
