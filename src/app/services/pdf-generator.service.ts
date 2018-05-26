import { Injectable } from '@angular/core';
import { PlagResponse } from '../models/responses/plag-response';
import * as jsPDF from 'jspdf'
import { TextShorteningService } from './text-shortening.service';
import { SummarizedOutputTextPiece } from '../models/summarized-output-text-piece';


@Injectable()
export class PdfGeneratorService {

  splittedText: SummarizedOutputTextPiece[];
  constructor(private textShorteningService: TextShorteningService) { }

  generatePDF(plagResponse: PlagResponse){
    console.log("Generating a pdf is coming soon ..." + plagResponse);
    this.splittedText = this.textShorteningService.splittText(plagResponse.tagged_input_text);

    // Default export is a4 paper, portrait, using milimeters for units
    var doc = new jsPDF();

    //Print headline
    doc.setFontSize(22);
    let upperCorner = 20;
    doc.text(15, upperCorner, plagResponse.name);

    doc.setFontSize(18);
    upperCorner += 9;
    let plagCounter = 0;
    for(let i = 0; i < this.splittedText.length; i++){
      var splitTitle = doc.splitTextToSize(this.splittedText[i].text, 180);
      let pageHeight= doc.internal.pageSize.getHeight();
      if(this.splittedText[i].type == 'plag'){
        doc.setTextColor(255,0,0);
        plagCounter ++;
      } else{
        doc.setTextColor(0,0,0);
      }

      for(let j = 0; j < splitTitle.length; j++){
        //Print each row
        doc.text(15, upperCorner, splitTitle[j]);
        upperCorner += 9;
        if(upperCorner > pageHeight){
          doc.addPage();
          upperCorner = 20;
        }
      }

      //Print each link
      if(this.splittedText[i].type == 'plag'){
        for(let j = 0; j < plagResponse.plags[plagCounter-1].wiki_excerpts.length; j++){
          let link = '--> https://de.wikipedia.org/?curid=' + plagResponse.plags[plagCounter-1].wiki_excerpts[j].id;
          doc.text(15, upperCorner, link);
          upperCorner += 9;
          if(upperCorner > pageHeight){
            doc.addPage();
            upperCorner = 20;
          }
        }
      }
    }

    doc.save(plagResponse.name + '.pdf');
  }
}
