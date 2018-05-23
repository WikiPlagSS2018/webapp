import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { PlagResponse } from '../models/responses/plag-response';

/**
 * transmits input text to cluster rest api and retrieves json output
 */
@Injectable()
export class PlagPositionsService {

  //post url cluster or localhost connection
  url: string = 'http://localhost:8080/wikiplag/rest/analyse';
  //url:string = 'http://hadoop05.f4.htw-berlin.de:8080/wikiplag/rest/analyse';

  //data
  data: PlagResponse;


  /**
   * constructor of PlagPositionsService
   * @param http http service
   */
  constructor(private http: HttpClient) {
    console.info('init PlagPositionsService');
  }


  /**
   * returns observable with plagResponse
   * @returns {Observable<R>} observable with plagResponse
   */
  getPlagData() {
    return this.data;
  }

  /**
   * Post request to analyse the given input text
   * @param {string} inputText user input text
   * @returns {Observable<Object>}
   */
  checkForPlag(inputText: string) {
    /*return this.http.post<PlagResponse>(this.url, JSON.stringify({'text': inputText})).pipe(
      tap((result) => this.data = result)
    );*/
    return this.http.get<PlagResponse>('assets/mock2.json').pipe(
      tap((result) => this.data = result)
    );
  }
}
