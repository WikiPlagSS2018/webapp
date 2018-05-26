import { Injectable } from '@angular/core';
import { PlagResponse } from '../models/responses/plag-response';
import * as jsPDF from 'jspdf'


@Injectable()
export class PdfGeneratorService {

  constructor() { }

  generatePDF(plagResponse: PlagResponse){
    console.log("Generating a pdf is coming soon ..." + plagResponse);
    // Default export is a4 paper, portrait, using milimeters for units
    var doc = new jsPDF();

    doc.setFontSize(22);
    doc.text(plagResponse.name);

    doc.setFontSize(18);

    var splitTitle = doc.splitTextToSize(plagResponse.tagged_input_text, 180);
    doc.text(15, 20, splitTitle);
    doc.save('a4.pdf');
  }
}
