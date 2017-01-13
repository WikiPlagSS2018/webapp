import {Component, HostListener} from '@angular/core';
import { PlagPositionsService } from '../services/plag-positions.service';
import { ClickablePipe } from '../pipes/clickable.pipe';

@Component({
  moduleId: 'module.id',
  selector: 'output-comp',
  templateUrl: './app/components/output.component.html',
  providers: [PlagPositionsService],
  })
export class OutputComponent  {

  plagPositions: PlagPositions[];
  _tagged_input_text: string

  constructor(private plagPositionsService: PlagPositionsService){
    this.plagPositionsService.getPlagPositions().subscribe(plagPositions => {this.plagPositions = plagPositions; this._tagged_input_text = this.plagPositions && this.plagPositions[0].tagged_input_text });
    //this.text = "Das ist ein tolles <span (click)=\"bla()\" class=\"input_plag\" id=0>Plagiat. Bla bla.</span> Bla!";
    //this.plagPositionsService.getPlagPositions().subscribe(plagPositions => console.log(plagPositions));

  }

  bla(id:any){
    console.log("id: " +id);
  }

  @HostListener('click', ['$event'])
  onClick(e:any) {
    if (e.target.classList.contains('input_plag')) {
      /*
       var id = e.target.id;
       this.bla(id);
       */
    }
  }



}

interface PlagPositions {
  tagged_input_text: string;
  plags: string[][];
}
