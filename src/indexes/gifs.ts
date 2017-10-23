import {bindable, autoinject} from 'aurelia-framework';
import {GifApi} from '../api/gif-api'

@autoinject()
export class Gifs{

	public gifSrcs: string[];
	constructor(
		private apiService: GifApi
	){
		this.gifSrcs = [];
	}

	public attached(){
		this.apiService.getAllGifs().then((result:any) =>{
			this.gifSrcs = result;
		});
	}
}

