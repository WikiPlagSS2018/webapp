import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'input-comp',
  templateUrl: './app/components/input.component.html',
})
export class InputComponent implements OnInit, OnDestroy{
  /**
   * Contains text entered by user
   */
  inputText:string;
  service:Subscription;
  constructor(private s: PlagPositionsService){

  }

  ngOnInit() {
    //subscribe to text attribute of PlagPositionsService
    this.service = this.s.text$.subscribe(data => this.inputText = data);
  }

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
    this.service = this.s.text$.subscribe(data => this.inputText = data);
    //toggle OutputComponent
    this.sendEventEmitter.emit();
  }
  ngOnDestroy(){
    if(this.service){
      this.service.unsubscribe();
    }
  }
}
