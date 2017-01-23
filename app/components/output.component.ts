import {Component, HostListener, Output, EventEmitter, AfterViewChecked} from '@angular/core';
import {PlagPositionsService} from '../services/plag-positions.service';

@Component({
  moduleId: 'module.id',
  selector: 'output-comp',
  templateUrl: './app/components/output.component.html',
  providers: [PlagPositionsService],
})
export class OutputComponent implements AfterViewChecked{
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
  firstLoad = true;

  constructor(private plagPositionsService: PlagPositionsService) {
    this.plagPositionsService.getPlagPositions().subscribe(plagPositions => {
      this.plagPositions = plagPositions;
      this._tagged_input_text = this.plagPositions && this.plagPositions[0].tagged_input_text;
      this._plags = this.plagPositions && this.plagPositions[0].plags;
      this.articleListOfSelectedPlag = this._plags[0].wiki_excerpts;
      this.textOfSelectedArticle = this.articleListOfSelectedPlag[0].excerpt;
    });
  }

  ngAfterViewChecked(): void {
    if(this.firstLoad){
      var input_plag_elements = <HTMLElement[]><any>document.getElementsByClassName('input_plag');
      if(input_plag_elements[0]){
        // console.log(input_plag_elements[0]);
        input_plag_elements[0].style.boxShadow = '0 0 4px 1px gray';
        input_plag_elements[0].style.background = 'lightcoral';
        this.prevSelPlag = input_plag_elements[0];
        this.firstLoad = false;
      }

      var article_box_elements = <HTMLElement[]><any>document.getElementsByClassName('article_box');
      // console.log(article_box_elements);
      if(article_box_elements[0]){
        // console.log(article_box_elements[0]);
        article_box_elements[0].style.background = '#b4302e';
        article_box_elements[0].style.color = 'white';
        this.prevSelArticle = article_box_elements[0];
      }
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (event.target.classList.contains('input_plag')) {
      this.clickedPlagId = event.target.id;
      console.info("Clicked on plag with id " + this.clickedPlagId);

      //Highlight selected plag

      if(this.prevSelPlag){
        this.prevSelPlag.style.boxShadow = 'none';
        this.prevSelPlag.style.backgroundColor = '#b4302e';
      }
      event.target.style.boxShadow = '0 0 4px 1px gray';
      event.target.style.background = 'lightcoral';
      this.prevSelPlag = event.target;

      this.articleListOfSelectedPlag = this._plags[this.clickedPlagId].wiki_excerpts;
      this.textOfSelectedArticle = this.articleListOfSelectedPlag[0].excerpt;

      var article_box_elements = <HTMLElement[]><any>document.getElementsByClassName('article_box');
      console.log(article_box_elements);
      if(article_box_elements[0]){
        console.log('colorized article_box');
        article_box_elements[0].style.background = '#b4302e';
        article_box_elements[0].style.color = 'white';
        this.prevSelArticle = article_box_elements[0];
      }
    }
    if (event.target.classList.contains('article_box')) {
      this.clickedArticlId = event.target.id;
      console.info("Clicked on article with id " + this.clickedArticlId);

      //Highlight selected title

       if(this.prevSelArticle){
       this.prevSelArticle.style.border = 'none';
       this.prevSelArticle.style.background = 'white';
       this.prevSelArticle.style.color = 'black';
       }
       event.target.style.background = '#b4302e';
       event.target.style.color = 'white';
       this.prevSelArticle = event.target;


      this.textOfSelectedArticle = this.articleListOfSelectedPlag[this.clickedArticlId].excerpt;
    }
    if (event.target.classList.contains('wiki_plag')) {
      console.info("Clicked on excerpt");
      window.open('https://de.wikipedia.org');
    }

  }

  newInput() {
    if (confirm('Do you really want to analyze a new text?')) {
      this.newInputEventEmitter.emit();
    }
  }
}

interface PlagPositions {
  tagged_input_text: string;
  plags: any[];
}
