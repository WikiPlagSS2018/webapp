import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

/**
 * A small services to decide if the router should redirect from output component to another component
 * The user will get a confirm message to agree changing the site
 */
@Injectable()
export class ChangeToInputComponentGuardService implements CanActivate {

  /**
   * Import a router
   * @param {Router} router dependency injection
   */
  constructor(private router: Router){
  }

  /**
   * Asks the user if he's absolutely sure to change from output component to another component
   * @returns {boolean}
   */
  canActivate() {
    if(this.router.url != "/output" || confirm("Wirklich wechseln?")){
      return true;
    }
    return false;
  }
}
