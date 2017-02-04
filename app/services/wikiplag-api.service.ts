
import {Injectable} from "@angular/core"
import {Http, Headers, RequestOptions, Response} from "@angular/http"

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

/**
 * unfinished class to access wikiplag api
 */
@Injectable()
export class WikiPlagAPIService {

  private wikiplagUrl = 'http://wikiplag.f4.htw-berlin.de/wikiplag/analyse';


  constructor(private http: Http){
    console.info("init WikiPlagAPIService");
  }

  getArticleData(ArticleId:any): Observable<any>{
    return this.http.get(this.wikiplagUrl +ArticleId
      )
      .map(res => res.json());
  }

  postInputText (inputText: string): Observable<any> {
    //inputText = "{\"text\": \"" + inputText +"\"}";
    inputText = "text=" +inputText;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.wikiplagUrl, inputText, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error("Fehlermeldung: " +errMsg);
    return Observable.throw(errMsg);
  }

}
