import {Injectable} from "@angular/core"
import {Http, Headers, RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map'

/**
 * gets mock json from file and provides it as service
 */
@Injectable()
export class PlagPositionsService {
  private inputText = "";


  /**
   * constructor of PlagPositionsService
   * @param http http service
   */
  constructor(private http: Http){
    console.info("init PlagPositionsService");
  }
  updateInputText(text: string){
    this.inputText = text;
  }

  /**
   * returns observable with plagPositions
   * @returns {Observable<R>} observable with plagPositions
   */
  getPlagPositions(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headers});
    return this.http.post('../wikiplag/analyse', this.inputText, options)
      .map(res => res.json());
    //return this.http.get('../mock.json')
    //  .map(res => res.json());
  }
}
