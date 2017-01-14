import {Component, HostListener, Output, EventEmitter, Pipe, PipeTransform} from '@angular/core';
import {PlagPositionsService} from '../services/plag-positions.service';
import {ClickablePipe} from '../pipes/clickable.pipe';
import {DomSanitizer} from "@angular/platform-browser";
import {isUndefined} from "util";

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {
  }

  transform(value: any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
@Component({
  moduleId: 'module.id',
  selector: 'output-comp',
  templateUrl: './app/components/output.component.html',
  providers: [PlagPositionsService],
})
export class OutputComponent {
  @Output() newInputEventEmitter = new EventEmitter();

  plagPositions: PlagPositions[];
  _tagged_input_text: string;
  _plags: any[];
  articleListOfSelectedPlag: any;
  textOfSelectedArticle: any;
  clickedPlagId: number;
  clickedArticlId: number;
  prevSelPlag: any;
  prevSelArticle: any;

  constructor(private plagPositionsService: PlagPositionsService) {
    this.plagPositionsService.getPlagPositions().subscribe(plagPositions => {
      this.plagPositions = plagPositions;
      this._tagged_input_text = this.plagPositions && this.plagPositions[0].tagged_input_text;
      this._plags = this.plagPositions && this.plagPositions[0].plags;
      this.articleListOfSelectedPlag = this._plags[0].wiki_excerpts;
      this.textOfSelectedArticle = this.articleListOfSelectedPlag[0].excerpt;
    });
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (event.target.classList.contains('input_plag')) {
      //Highlight selected plag
      /*
      if(this.prevSelPlag){
        this.prevSelPlag.style.boxShadow = 'none';
      }
      event.target.style.boxShadow = '0 0 4px 1px black';
      this.prevSelPlag = event.target;
      */

      this.clickedPlagId = event.target.id;
      this.articleListOfSelectedPlag = this._plags[this.clickedPlagId].wiki_excerpts;
      this.textOfSelectedArticle = this.articleListOfSelectedPlag[0].excerpt;
    }
    if (event.target.classList.contains('wiki_title')) {
      this.clickedArticlId = event.target.id;

      //Highlight selected title
      /*
      this.textOfSelectedArticle = this.articleListOfSelectedPlag[this.clickedArticlId].excerpt;
      if(this.prevSelArticle){
        this.prevSelArticle.style.border = 'none';
      }
      event.target.style.border = '2px solid black';
      this.prevSelArticle = event.target;
      */
    }
  }

  newInput() {
    if (confirm('Do you really want to analyse a new text?')) {
      this.newInputEventEmitter.emit();
    }
  }
}

interface PlagPositions {
  tagged_input_text: string;
  plags: any[];
}
