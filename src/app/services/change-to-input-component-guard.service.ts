import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class ChangeToInputComponentGuardService implements CanActivate {

  constructor(private router: Router){

  }
  canActivate() {
    if(this.router.url != "/output" || confirm("Wirklich wechseln?")){
      return true;
    }
    return false;
  }
}
