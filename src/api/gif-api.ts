import { autoinject } from 'aurelia-framework';
import { ApiService } from './api-service';

@autoinject()
export class GifApi {

	public root:string= "http://localhost:8000/gifs";
	constructor(private apiService: ApiService) { }

	public getAllGifs(): Promise<string[]> {
		return this.apiService.get(`${this.root}/all`, json => json);
	}

	public getGifsByCategory(category: string): Promise<string[]> {
		return this.apiService.get(`${this.root}/${category}`, json => json);
	}

	public getRandomGif(): Promise<string> {
		return this.apiService.get(`${this.root}/random/`, json => json);
	}

	public uploadGif(gif): Promise<string> {
		return this.apiService.post(`${this.root}/upload/`, gif, json => json);
	}
}