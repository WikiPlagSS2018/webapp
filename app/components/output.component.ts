import {Component, HostListener, Output, EventEmitter} from '@angular/core';
import { PlagPositionsService } from '../services/plag-positions.service';
import { ClickablePipe } from '../pipes/clickable.pipe';

@Component({
  moduleId: 'module.id',
  selector: 'output-comp',
  templateUrl: './app/components/output.component.html',
  providers: [PlagPositionsService],
  })
export class OutputComponent  {
  @Output()
  toggleEventEmitter:EventEmitter<string> = new EventEmitter();
  plagPositions: PlagPositions[];
  _tagged_input_text: string;
  _plags: any[];
  articleListOfSelectedPlag: any;
  textOfSelectedArticle: any;


  constructor(private plagPositionsService: PlagPositionsService){
    this.plagPositionsService.getPlagPositions().subscribe(plagPositions => {this.plagPositions = plagPositions;
      this._tagged_input_text = this.plagPositions && this.plagPositions[0].tagged_input_text;
      this._plags = this.plagPositions && this.plagPositions[0].plags;
      this.articleListOfSelectedPlag = this._plags[0].wiki_excerpts;
      this.textOfSelectedArticle = this.articleListOfSelectedPlag[0].excerpt;
        console.log(this._plags[0].wiki_excerpts[0].title)});




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
      console.log("input_plag");
    }
    if (e.target.classList.contains('wiki_title')) {
      console.log("wiki_title");
    }
  }

  newInput() {
    this.toggleEventEmitter.emit();
  }




}

interface PlagPositions {
  tagged_input_text: string;
  plags: any[];
}
