import {Injectable} from "@angular/core"
import {Http} from "@angular/http"

import 'rxjs/add/operator/map'

@Injectable()
export class WikiAPIService {
  constructor(private http: Http){
    console.info("init WikiAPIService");
  }

  getArticleData(ArticleId:any){
    return this.http.get('https://de.wikipedia.org/w/api.php?action=query&prop=info&pageids=' +ArticleId
      +'&inprop=url&format=json&origin=*')
      .map(res => res.json());
  }
}
