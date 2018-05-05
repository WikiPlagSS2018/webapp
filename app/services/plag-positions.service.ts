import {Injectable} from "@angular/core"
import  {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map'

/**
 * transmits input text to cluster rest api and retrieves json output
 */
@Injectable()
export class PlagPositionsService {

    //post url cluster or localhost connection
    url:string = "http://localhost:8080/wikiplag/rest/analyse"

    //data
    data: string;


  /**
   * constructor of PlagPositionsService
   * @param http http service
   */
  constructor(private http: HttpClient){
    console.info("init PlagPositionsService");
  }


  /**
   * returns observable with plagPositions
   * @returns {Observable<R>} observable with plagPositions
   */
  getPlagPositions(){
    return this.data;
  }

  // server url
  postPlagServer(jsonObject){
    return this.http.get("../mock.json").map(res=>{return res;});
    return this.http.post(this.url,jsonObject).map(res=>{
        return res;});
  }

  testGetRequest(){
    return this.http.get(this.url).map(res => console.log(res));
  }

}
