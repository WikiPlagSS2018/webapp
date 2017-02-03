import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import 'rxjs/add/operator/map'

@Injectable()
export class PlagPositionsService {
  constructor(private http: Http){
    console.info("init PlagPositionsService");
  }

  getPlagPositions(){
    return this.http.get('../mock.json')
      .map(res => res.json());
  }
}
