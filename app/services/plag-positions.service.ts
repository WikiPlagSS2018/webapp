import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import 'rxjs/add/operator/map'

/**
 * gets mock json from file and provides it as service
 */
@Injectable()
export class PlagPositionsService {
  private text = new Subject<string>();
  public text$ = this.text.asObservable();

  /**
   * constructor of PlagPositionsService
   * @param http http service
   */
  constructor(private http: Http){
    console.info("init PlagPositionsService");
  }

  /**
   * returns observable with plagPositions
   * @returns {Observable<R>} observable with plagPositions
   */
  getPlagPositions(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headers});
    return this.http.post('../wikiplag/analyse', text, options)
      .map(res => res.json());
    //return this.http.get('../mock.json')
    //  .map(res => res.json());
  }
}
