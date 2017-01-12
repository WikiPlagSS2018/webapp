import {Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory} from '@angular/core';
import {OutputComponent} from "./components/output.component";

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
})
export class AppComponent  {
  name: string
  @ViewChild('subContainer1', {read: ViewContainerRef}) subContainer1: ViewContainerRef;

  constructor(
    private compFactoryResolver: ComponentFactoryResolver
  ) {
    this.name = 'Angular2'
    //this.addComponents()
  }

  addComponents(send) {

    //let compFactory: ComponentFactory<any>;

    let compFactory = this.compFactoryResolver.resolveComponentFactory(OutputComponent);
    this.subContainer1.createComponent(compFactory);

  }

}
