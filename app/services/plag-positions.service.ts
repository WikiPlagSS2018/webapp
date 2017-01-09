import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import 'rxjs/add/operator/map'

@Injectable()
export class PlagPositionsService {
  constructor(private http: Http){
    console.log("init...")
  }

  getPlagPositions(){
    return this.http.get('http://localhost:3004/plag_positions')
      .map(res => res.json());
  }
}
