import { Component } from '@angular/core';
import { PlagPositionsService } from '../services/plag-positions.service'

@Component({
  moduleId: 'module.id',
  selector: 'output-comp',
  templateUrl: './app/components/output.component.html',
  providers: [PlagPositionsService]
})
export class OutputComponent  {
  plagPositions: PlagPositions[];

  constructor(private plagPositionsService: PlagPositionsService){
    this.plagPositionsService.getPlagPositions().subscribe(plagPositions => this.plagPositions = plagPositions);
    //this.plagPositionsService.getPlagPositions().subscribe(plagPositions => console.log(plagPositions));
  }

}

interface PlagPositions {
  tagged_input_text: string;
  plags: string[][];
}
