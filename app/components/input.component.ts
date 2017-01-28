import {Component, EventEmitter, Output} from '@angular/core';
import {WikiPlagAPIService} from '../services/wikiplag-api.service';

@Component({
  selector: 'input-comp',
  templateUrl: './app/components/input.component.html',
  providers: [WikiPlagAPIService],
})
export class InputComponent  {
  inputText:string;
  @Output() sendEventEmitter = new EventEmitter();

  constructor(private wikiPlagApiService: WikiPlagAPIService) {}

  send() {
    console.log("Hier ist send()");
    this.wikiPlagApiService.postInputText(this.inputText).subscribe(res => {
      console.log(res);});
    this.sendEventEmitter.emit();
    this.inputText = '';
  }
}
