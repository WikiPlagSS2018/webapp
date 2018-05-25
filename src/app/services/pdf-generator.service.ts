import { Injectable } from '@angular/core';
import { PlagResponse } from '../models/responses/plag-response';

@Injectable()
export class PdfGeneratorService {

  constructor() { }

  generatePDF(plagResponse: PlagResponse){
    console.log("Generating a pdf is coming soon ..." + plagResponse);
  }
}
