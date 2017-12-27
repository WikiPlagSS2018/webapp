import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import 'rxjs/add/operator/map'

/**
 * gets mock json from file and provides it as service
 */
@Injectable()
export class PlagPositionsService {

    url:string = ""

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
    return this.http.get('../mock.json')
      .map(res => res.json());
  }

  // server url
  postPlagServer(jsonObject){
    return this.http.post(this.url,jsonObject).map(res => res.json());
  }

}
