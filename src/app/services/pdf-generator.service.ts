import { Injectable } from '@angular/core';
import { PlagResponse } from '../models/responses/plag-response';
// import * as jsPDF from 'jspdf';
import { TextShorteningService } from './text-shortening.service';
import { SummarizedOutputTextPiece } from '../models/summarized-output-text-piece';


@Injectable()
export class PdfGeneratorService {

  splittedText: SummarizedOutputTextPiece[];
  constructor(private textShorteningService: TextShorteningService) { }

  generatePDF(plagResponse: PlagResponse) {
    /*console.log('Generating a pdf');
    this.splittedText = this.textShorteningService.splittText(plagResponse.tagged_input_text);


    // Default export is a4 paper, portrait, using milimeters for units
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Print headline
    doc.setFontSize(22);
    let upperCorner = 20;
    doc.text(15, upperCorner, plagResponse.name);

    doc.setFontSize(18);
    upperCorner += 9;
    let plagCounter = 0;

    // Go through each piece of text
    for (let i = 0; i < this.splittedText.length; i++) {
      if (this.splittedText[i].type === 'plag') {
        this.splittedText[i].text = this.removeHTML(this.splittedText[i].text);
        // Plagiarisms will be in red color
        doc.setTextColor(255, 0, 0);
        plagCounter ++;
      } else {
        doc.setTextColor(0, 0, 0);
      }

      // Split the text into lines with length of 180mm
      const splitTitle = doc.splitTextToSize(this.splittedText[i].text, 180);


      for (let j = 0; j < splitTitle.length; j++) {
        // Print each row to pdf
        doc.text(15, upperCorner, splitTitle[j]);
        upperCorner += 9;

        // Create a new page in case the old is to short for given text
        if (upperCorner > pageHeight) {
          doc.addPage();
          upperCorner = 20;
        }
      }

      // Print each link of an plagiarism
      if (this.splittedText[i].type === 'plag') {
        for (let j = 0; j < plagResponse.plags[plagCounter - 1].wiki_excerpts.length; j++) {
          const link = '--> https://de.wikipedia.org/?curid=' + plagResponse.plags[plagCounter - 1].wiki_excerpts[j].id;
          doc.text(15, upperCorner, link);
          upperCorner += 9;
          if (upperCorner > pageHeight) {
            doc.addPage();
            upperCorner = 20;
          }
        }
      }
    }

    doc.save(plagResponse.name + '.pdf');*/
  }

  removeHTML(textWithHTML: string): string {
    return textWithHTML.replace( /(<([^>]+)>)/ig, '');
  }
}
