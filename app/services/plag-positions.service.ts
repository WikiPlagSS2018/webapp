import {Injectable} from "@angular/core"
import {Http, Headers, RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map'

/**
 * gets mock json from file and provides it as service
 */
@Injectable()
export class PlagPositionsService {

    //post url
    url:string = "http://localhost:8080/wikiplag/rest/analyse"
    
    //data
    data: string;
    

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
    return this.data.json());
  }

  // server url
  postPlagServer(jsonObject){
    //  return this.http.get("../mock.json").map(res=>{return res;}); 
    return this.http.post(this.url,jsonObject).map(res=>{
        return res;});
  }

  testGetRequest(){
    return this.http.get(this.url).map(res => console.log(res));
  }

}
