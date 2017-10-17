import {bindable, autoinject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@autoinject()
export class NavBar {
	@bindable
	public router:Router;
	public attached(){}
}
