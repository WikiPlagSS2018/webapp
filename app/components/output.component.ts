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
   * Show output text in shortened version of not
   */
  shortened_text : boolean;

  /**
   * Text splitted into normal text and plag pieces to make a shorter output version available
   */
  text_plags : any[];

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
      this.plagPositions=this.plagPositionsService.getPlagPositions();

    // assigns tagged_input_text from json to local variable
    this.tagged_input_text = this.plagPositions.tagged_input_text;

    this.shortened_text = true;
    if(this.shortened_text){
      this.prepareTextForShortOutput();
    }
    // assigns plags from json to local variable
    this.plags = this.plagPositions.plags;

    this.alertNumberOfPlags(this.plagPositions.plags.length);
  }

  prepareTextForShortOutput(){
    this.text_plags = [];

    let charsBeforeAndAfterPlag = 100;
    let text = this.tagged_input_text;
    let nextStartTag = this.getNextStartTag(text, charsBeforeAndAfterPlag);
    while(text != ""){
      //Search for next plag elem, push to array and remove from original text
      let nextEndTag = this.getNextEndPos(text, charsBeforeAndAfterPlag);

      text = this.splitFirstPlanOccurrence(nextStartTag, nextEndTag, text);

      nextStartTag = this.getNextStartTag(text, charsBeforeAndAfterPlag);
    }

  }

  alertNumberOfPlags(plagCount: number){
    if(plagCount == 0){
      swal("Keine Ergebnisse", "Keine Plagiate im Text gefunden.", "success");
    } else{
      swal("Potentielle Plagiate", plagCount + " potentielle Plagiate gefunden.", "warning");
    }
  }


  getNextStartTag(text: string, charsBeforeAndAfterPlag: number){
    let startPos = text.indexOf("<span");
    //Adjust start tag position in case text is too short
    if(startPos-charsBeforeAndAfterPlag > 0) {
      return startPos - charsBeforeAndAfterPlag;
    } else if(startPos === -1){
      return -1;
    }
    return 0;
  }

  changeViewState(index: number){
    this.text_plags[index][2] = !this.text_plags[index][2];
  }

  getNextEndPos(text: string, charsBeforeAndAfterPlag: number){
    let nextEndTag = text.indexOf("</span>")+8;
    //Adjust end tag position
    if(nextEndTag+charsBeforeAndAfterPlag <= text.length-1) {
      return nextEndTag + charsBeforeAndAfterPlag;
    }
    return nextEndTag;
  }

  splitFirstPlanOccurrence(startPosOfPlag: number, endPosOfPlag: number, tagged_input_text: string){
    if(startPosOfPlag !== -1){
      let plagElem = tagged_input_text.substring(startPosOfPlag, endPosOfPlag);
      //Cut text by space seperator
      let firstSpacePos = 0;
      if(plagElem.substring(0, plagElem.indexOf(" ")).indexOf("<span") == -1){
        firstSpacePos = plagElem.indexOf(" ");
      }

      let lastSpacePos = plagElem.length-1;
      if(plagElem.substring(plagElem.lastIndexOf(" "), plagElem.length-1).indexOf("</span") == -1){
        lastSpacePos = plagElem.lastIndexOf(" ");
      }

      startPosOfPlag += firstSpacePos;

      //Search for rest of normal text, split at startPos position, push to text array and remove from original text
      tagged_input_text = this.removeTextBeforeSpanTag(tagged_input_text, startPosOfPlag);

      plagElem = plagElem.substring(firstSpacePos, lastSpacePos);

      this.text_plags.push(["plag", plagElem, true]);

      //Remove elem from original text
      tagged_input_text = tagged_input_text.replace(plagElem, "");
    } else {
      //Search for rest of normal text, split at startPos position, push to text array and remove from original text
      tagged_input_text = this.removeTextBeforeSpanTag(tagged_input_text, startPosOfPlag);
    }

    return tagged_input_text;
  }

  removeTextBeforeSpanTag(tagged_input_text: string, nextStartTag: number){
    let textBeforeSpanTag = "";
    if(tagged_input_text.indexOf("<span") !== -1){
      textBeforeSpanTag = tagged_input_text.substring(0, nextStartTag);

      if(textBeforeSpanTag != ""){
        //Add last part of text
        this.text_plags.push(["text", textBeforeSpanTag, false]);
      }
    } else {
      if(tagged_input_text != ""){
        //Add last part of text
        this.text_plags.push(["text", tagged_input_text, false]);
      }


      textBeforeSpanTag = tagged_input_text;
    }
    return tagged_input_text.replace(textBeforeSpanTag, "");
  }

  // listens for click events
  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (event.target.classList.contains('input_plag')) {
      // clicked on input_plag
      this.clickedPlagId = event.target.id;
      console.info("Clicked on plag with id " + this.clickedPlagId);

      this.highlightSelectedPlag(event);

      // array of wiki_excerpts is assigned
      this.articleListOfSelectedPlag = this.plags[this.clickedPlagId].wiki_excerpts;

      // reset textOfSelectedArticle
      this.textOfSelectedArticle = null;
    }
    else if (event.target.classList.contains('article_box')) {
      // clicked on article
      this.clickedArticleId = event.target.id;
      console.info("Clicked on article with id " + this.clickedArticleId);

      this.highlightSelectedArticle(event);

      this.getArticleURLFromWikipediaAPI();

      // excerpt text is assigned
      this.textOfSelectedArticle = this.articleListOfSelectedPlag[this.clickedArticleId].excerpt;
    }
    else if (event.target.classList.contains('wiki_plag')) {
      // Open corresponding Wikipedia article in pop-up
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
      this.prevSelArticle.classList.add("alert-info");
      this.prevSelArticle.classList.remove("alert-danger");
    }

    // highlighting
    event.target.classList.add("alert-danger");
    event.target.classList.remove("alert-info");
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
