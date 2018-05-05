import {Component, HostListener, Output, EventEmitter} from '@angular/core';
import {PlagPositionsService} from '../services/plag-positions.service';
import {WikipediaAPIService} from '../services/wikipedia-api.service';

@Component({
  moduleId: 'module.id',
  selector: 'output-comp',
  templateUrl: './app/components/output.component.html'
})
/**
  * Displays json provided by PlagPositionsService
  */
export class OutputComponent {
  /**
   * Used to toggle from output.component to input.component in app.component
   */
  @Output() newInputEventEmitter = new EventEmitter();

  /**
   * object read from json
   */
  plagPositions: PlagPositions;

  /**
   * input text with tags
   */
  tagged_input_text: string;

  /**
   * plagiarised articles and excerpts
   */
  plags: any[];

  /**
   * list of articles for currently selected plagiarised part
   */
  articleListOfSelectedPlag: any;

  /**
   * text of selected article
   */
  textOfSelectedArticle: any;

  /**
   * id of clicked plagiarised part
   */
  clickedPlagId: number;

  /**
   * id of clicked article
   */
  clickedArticleId: number;

  /**
   * previously selected plagiarised part. used to reset highlighting
   */
  prevSelPlag: any;

  /**
   * previously selected article. used to reset highlighting
   */
  prevSelArticle: any;

  /**
   * wikipedia-internal article id for clicked article
   */
  clickedArticleWikiId : number;

  /**
   * wikipedia url of clicked article
   */
  articleUrl: any;

  /**
   * Initialises objects and subscribes to service
   * @param plagPositionsService service for getting mocked json
   * @param wikipediaAPIService service for querying wikipedia api
   */
  constructor(private plagPositionsService: PlagPositionsService, private wikipediaAPIService: WikipediaAPIService) {
      this.tagged_input_text = "Lädt ..." // displayed while service is loading

      // assigns plagPositions from json to local variable
      this.plagPositions=this.plagPositionsService.getPlagPositions()
      console.log(this.plagPositions);
      let potentialPlags = this.plagPositions.plags.length;
      if(potentialPlags == 0){
        swal("Keine Ergebnisse", "Keine Plagiate im Text gefunden.", "success");
      } else{
        swal("Potentielle Plagiate", potentialPlags + " potentielle Plagiate gefunden.", "warning");
      }


      // assigns tagged_input_text from json to local variable
      this.tagged_input_text = this.plagPositions.tagged_input_text;

      // assigns plags from json to local variable
      this.plags = this.plagPositions.plags;

  }

  // listens for click events
  @HostListener('click', ['$event'])
  onClick(event: any) {
    // clicked on input_plag
    if (event.target.classList.contains('input_plag')) {
      this.clickedPlagId = event.target.id;
      console.info("Clicked on plag with id " + this.clickedPlagId);

      this.highlightSelectedPlag(event);

      // array of wiki_excerpts is assigned
      this.articleListOfSelectedPlag = this.plags[this.clickedPlagId].wiki_excerpts;

      // reset textOfSelectedArticle
      this.textOfSelectedArticle = null;

      // reset highlighting of article
      if(this.prevSelArticle){
        this.prevSelArticle.style.border = 'none';
        this.prevSelArticle.style.background = 'white';
        this.prevSelArticle.style.color = 'black';
      }
    }

    // clicked on article
    if (event.target.classList.contains('article_box')) {
      this.clickedArticleId = event.target.id;
      console.info("Clicked on article with id " + this.clickedArticleId);

      this.highlightSelectedArticle(event);

      this.getArticleURLFromWikipediaAPI();

      // excerpt text is assigned
      this.textOfSelectedArticle = this.articleListOfSelectedPlag[this.clickedArticleId].excerpt;
    }

    // Open corresponding Wikipedia article in pop-up
    if (event.target.classList.contains('wiki_plag')) {
      window.open(this.articleUrl)
    }

  }

  /**
   * disables highlighting of previous selected plagiarised part and highlights selected plagiarised part
   * @param event event of clicked element
   */
  highlightSelectedPlag(event: any) {
    // disables highlighting
    if(this.prevSelPlag){
      this.prevSelPlag.style.boxShadow = 'none';
      this.prevSelPlag.style.backgroundColor = '#b4302e';
    }

    // highlighting
    event.target.style.boxShadow = '0 0 4px 1px gray';
    event.target.style.background = 'lightcoral';
    this.prevSelPlag = event.target;
  }

  /**
   * disables highlighting of previous selected article and highlights selected article
   * @param event event of clicked element
   */
  highlightSelectedArticle(event: any) {
    // disables highlighting
    if(this.prevSelArticle){
      this.prevSelArticle.style.border = 'none';
      this.prevSelArticle.style.background = 'white';
      this.prevSelArticle.style.color = 'black';
    }

    // highlighting
    //TODO: Apply bootstrap classes
    event.target.style.background = '#b4302e';
    event.target.style.color = 'white';
    this.prevSelArticle = event.target;
  }

  /**
   * get article url from wikipedia api
   */
  getArticleURLFromWikipediaAPI() {
    this.clickedArticleWikiId = this.plags[this.clickedPlagId].wiki_excerpts[this.clickedArticleId].id;
    this.wikipediaAPIService.getArticleData(this.clickedArticleWikiId).subscribe(articleData => {
      this.articleUrl = articleData.query.pages[this.clickedArticleWikiId].fullurl
    });
  }

  /**
   * called when "Neuer Text" button was clicked
   */
  newInput() {
    this.newInputEventEmitter.emit();
  }
}

/**
 * interface for received json
 */
interface PlagPositions {
  tagged_input_text: string;
  plags: any[];
}
