import {Component, HostListener, Output, EventEmitter} from '@angular/core';
import {PlagPositionsService} from '../services/plag-positions.service';
import {WikipediaAPIService} from '../services/wikipedia-api.service';

@Component({
  moduleId: 'module.id',
  selector: 'output-comp',
  templateUrl: './app/components/output.component.html',
  providers: [PlagPositionsService, WikipediaAPIService],
})
export class OutputComponent {
  @Output() newInputEventEmitter = new EventEmitter();

  plagPositions: PlagPositions;
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

  constructor(private plagPositionsService: PlagPositionsService, private wikipediaAPIService: WikipediaAPIService) {
    this.plagPositionsService.getPlagPositions().subscribe(plagPositions => {
      console.log(plagPositions);

      this.plagPositions = plagPositions;
      this._tagged_input_text = this.plagPositions.tagged_input_text;
      this._plags = this.plagPositions.plags;
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
      this.wikipediaAPIService.getArticleData(this.clickedArticleWikiId).subscribe(articleData => {
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
      this.articleListOfSelectedPlag = null;
      this.textOfSelectedArticle = null;
      this.prevSelPlag.style.boxShadow = 'none';
      this.prevSelPlag.style.backgroundColor = '#b4302e';
      this.newInputEventEmitter.emit();

    }
  }
}

interface PlagPositions {
  tagged_input_text: string;
  plags: any[];
}
