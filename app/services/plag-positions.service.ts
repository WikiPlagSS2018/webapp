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


  /**
   * constructor of PlagPositionsService
   * @param http http service
   */
  constructor(private http: Http){
    console.info("init PlagPositionsService");
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Accept', 'application/json');
  }


  /**
   * returns observable with plagPositions
   * @returns {Observable<R>} observable with plagPositions
   */
getPlagPositions(){

    return  this.http.get("http://localhost:8080/wikiplag/rest/test",this.headers)
      .map(res => res.json()
    );
  }

  // server url
  postPlagServer(jsonObject){
    console.log(typeof(jsonObject))
    return this.http.post(this.url,jsonObject,this.headers).map(res => res.json()).subscribe(
     (response) => {
            /* this function is executed every time there's a new output */

           console.log("VALUE RECEIVED: "+response);


           //window.glres = response;

     },
     (err) => {
            /* this function is executed when there's an ERROR */
            console.log("ERROR: "+err);
     },
     () => {
            /* this function is executed when the observable ends (completes) its stream */
            console.log("COMPLETED");
     }
 );
  }

  testGetRequest(){
    return this.http.get(this.url).map(res => console.log(res));
  }

}
