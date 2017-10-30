import {bindable, autoinject} from 'aurelia-framework';

@autoinject()
export class Letter {

	@bindable
	public char:string = "Y";
}
