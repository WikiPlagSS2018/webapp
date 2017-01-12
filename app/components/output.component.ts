import {Component} from '@angular/core';
import { PlagPositionsService } from '../services/plag-positions.service';

@Component({
  moduleId: 'module.id',
  selector: 'output-comp',
  templateUrl: './app/components/output.component.html',
  providers: [PlagPositionsService]
})
export class OutputComponent  {

  plagPositions: PlagPositions[];
  _tagged_input_text: string

  constructor(private plagPositionsService: PlagPositionsService){
    this.plagPositionsService.getPlagPositions().subscribe(plagPositions => {this.plagPositions = plagPositions; this._tagged_input_text = this.plagPositions && this.plagPositions[0].tagged_input_text });
    //this.text = "Das ist ein tolles <span (click)=\"bla()\" class=\"input_plag\" id=0>Plagiat. Bla bla.</span> Bla!";
    //this.plagPositionsService.getPlagPositions().subscribe(plagPositions => console.log(plagPositions));

  }

  bla(){
    console.log("bla!!!!!!!!!!")
  }
}

interface PlagPositions {
  tagged_input_text: string;
  plags: string[][];
}
