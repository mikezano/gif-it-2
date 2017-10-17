import { autoinject, bindable } from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

@autoinject()
export class App {
  public router:Router;
  public message:string = "Hi";
  
  constructor(){
  }

  public configureRouter(config:RouterConfiguration, router:Router){    

    config.title="Zano";
    config.map([
      { route: ['', 'test'], name: 'Test',      moduleId: PLATFORM.moduleName('./indexes/test'), nav: true, title: 'Test' },
      { route: ['', 'home'], name: 'Home',      moduleId:  PLATFORM.moduleName('./indexes/home'), nav: true, title: 'Home' },
      { route: ['gifs'], name: 'Gifs',      moduleId: PLATFORM.moduleName('./indexes/gifs'), nav: true, title: 'Gifs' }
    ]);

    this.router = router;
  }
}