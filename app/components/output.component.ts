import {Component, HostListener, Output, EventEmitter} from '@angular/core';
import {PlagPositionsService} from '../services/plag-positions.service';
import {WikiAPIService} from '../services/wiki-api.service';

@Component({
  moduleId: 'module.id',
  selector: 'output-comp',
  templateUrl: './app/components/output.component.html',
  providers: [PlagPositionsService, WikiAPIService],
})
export class OutputComponent {
  @Output() newInputEventEmitter = new EventEmitter();

  plagPositions: PlagPositions[];
  _tagged_input_text: string;
  _plags: any[];
  articleListOfSelectedPlag: any;
  textOfSelectedArticle: any;
  clickedPlagId: number;
  clickedArticleId: number;
  prevSelPlag: any;
  prevSelArticle: any;
  clickedArticleWikiId : number;
  articleUrl: any;

  constructor(private plagPositionsService: PlagPositionsService, private wikiAPIService: WikiAPIService) {
    this.plagPositionsService.getPlagPositions().subscribe(plagPositions => {
      this.plagPositions = plagPositions;
      this._tagged_input_text = this.plagPositions && this.plagPositions[0].tagged_input_text;
      this._plags = this.plagPositions && this.plagPositions[0].plags;
    });
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
      this.textOfSelectedArticle = null;
    }
    if (event.target.classList.contains('article_box')) {
      this.clickedArticleId = event.target.id;
      console.info("Clicked on article with id " + this.clickedArticleId);

      //Highlight selected title
       if(this.prevSelArticle){
       this.prevSelArticle.style.border = 'none';
       this.prevSelArticle.style.background = 'white';
       this.prevSelArticle.style.color = 'black';
       }
       event.target.style.background = '#b4302e';
       event.target.style.color = 'white';
       this.prevSelArticle = event.target;

       // Get article URL from Wikipedia API
      this.clickedArticleWikiId = this._plags[this.clickedPlagId].wiki_excerpts[this.clickedArticleId].id;
      this.wikiAPIService.getArticleData(this.clickedArticleWikiId).subscribe(articleData => {
        this.articleUrl = articleData.query.pages[this.clickedArticleWikiId].fullurl
      });

      this.textOfSelectedArticle = this.articleListOfSelectedPlag[this.clickedArticleId].excerpt;
    }
    // Open corresponding Wikipedia article in pop-up
    if (event.target.classList.contains('wiki_plag')) {
      window.open(this.articleUrl)
    }

  }

  newInput() {
    if (confirm('Wirklich neuen Text analysieren?')) {
      this.newInputEventEmitter.emit();

    }
  }
}

interface PlagPositions {
  tagged_input_text: string;
  plags: any[];
}
