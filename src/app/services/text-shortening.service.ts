import { Injectable } from '@angular/core';
import { SummarizedOutputTextPiece } from '../models/summarized-output-text-piece';

@Injectable()
export class TextShorteningService {

  shortenedPlagarismText: SummarizedOutputTextPiece[];
  constructor() { }


  getNextEndPos(text: string, charsBeforeAndAfterPlag: number) {
    let nextEndTag = text.indexOf('</span>') + 8;
    //Adjust end tag position
    if (nextEndTag + charsBeforeAndAfterPlag <= text.length - 1) {
      return nextEndTag + charsBeforeAndAfterPlag;
    }
    return nextEndTag;
  }

  splitFirstPlanOccurrence(startPosOfPlag: number, endPosOfPlag: number, tagged_input_text: string) {
    if (startPosOfPlag !== -1) {
      let plagElem = tagged_input_text.substring(startPosOfPlag, endPosOfPlag);
      //Cut text by space seperator
      let firstSpacePos = 0;
      if (plagElem.substring(0, plagElem.indexOf(' ')).indexOf('<span') == -1) {
        firstSpacePos = plagElem.indexOf(' ');
      }

      let lastSpacePos = plagElem.length - 1;
      if (plagElem.substring(plagElem.lastIndexOf(' '), plagElem.length - 1).indexOf('</span') == -1) {
        lastSpacePos = plagElem.lastIndexOf(' ');
      }

      startPosOfPlag += firstSpacePos;

      //Search for rest of normal text, split at startPos position, push to text array and remove from original text
      tagged_input_text = this.removeTextBeforeSpanTag(tagged_input_text, startPosOfPlag);

      plagElem = plagElem.substring(firstSpacePos, lastSpacePos);

      this.shortenedPlagarismText.push({type: 'plag', text: plagElem, active: true});

      //Remove elem from original text
      tagged_input_text = tagged_input_text.replace(plagElem, '');
    } else {
      //Search for rest of normal text, split at startPos position, push to text array and remove from original text
      tagged_input_text = this.removeTextBeforeSpanTag(tagged_input_text, startPosOfPlag);
    }

    return tagged_input_text;
  }

  removeTextBeforeSpanTag(tagged_input_text: string, nextStartTag: number) {
    let textBeforeSpanTag = '';
    if (tagged_input_text.indexOf('<span') !== -1) {
      textBeforeSpanTag = tagged_input_text.substring(0, nextStartTag);

      if (textBeforeSpanTag != '') {
        //Add last part of text
        this.shortenedPlagarismText.push({type: 'text', text: textBeforeSpanTag, active: false});
      }
    } else {
      if (tagged_input_text != '') {
        //Add last part of text
        this.shortenedPlagarismText.push({type: 'text', text: tagged_input_text, active: false});
      }


      textBeforeSpanTag = tagged_input_text;
    }
    return tagged_input_text.replace(textBeforeSpanTag, '');
  }


  getNextStartTag(text: string, charsBeforeAndAfterPlag: number) {
    let startPos = text.indexOf('<span');
    //Adjust start tag position in case text is too short
    if (startPos - charsBeforeAndAfterPlag > 0) {
      return startPos - charsBeforeAndAfterPlag;
    } else if (startPos === -1) {
      return -1;
    }
    return 0;
  }

  shorteningText(text: string) {
    this.shortenedPlagarismText = [];

    let charsBeforeAndAfterPlag = 100;
    let nextStartTag = this.getNextStartTag(text, charsBeforeAndAfterPlag);
    while (text != '') {
      //Search for next plag elem, push to array and remove from original text
      let nextEndTag = this.getNextEndPos(text, charsBeforeAndAfterPlag);

      text = this.splitFirstPlanOccurrence(nextStartTag, nextEndTag, text);

      nextStartTag = this.getNextStartTag(text, charsBeforeAndAfterPlag);
    }

    return this.shortenedPlagarismText;
  }
}
