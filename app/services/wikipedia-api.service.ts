import {Injectable} from "@angular/core"
import  {HttpClient} from "@angular/common/http";

import 'rxjs/add/operator/map'

/**
 * gets wikipedia URL and provides it as service
 */
@Injectable()
export class WikipediaAPIService {
  /**
   * constructor of PlagPositionsService
   * @param http http service
   */
  constructor(private http: HttpClient){
    console.info("init WikipediaAPIService");
  }

  /**
   * returns observable with article data
   * @returns {Observable<R>} observable with article data
   */
  getArticleData(ArticleId:any){
    return this.http.get('https://de.wikipedia.org/w/api.php?action=query&prop=info&pageids=' +ArticleId
      +'&inprop=url&format=json&origin=*');
  }
}
