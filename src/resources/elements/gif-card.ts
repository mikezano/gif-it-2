import {bindable, autoinject} from 'aurelia-framework';

@autoinject()
export class GifCard {
  @bindable
  public src:string;

  public attached(){

  }

  public srcChanged(o, n){

  }
}
