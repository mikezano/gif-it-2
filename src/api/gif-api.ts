import { autoinject } from 'aurelia-framework';
import { ApiService } from './api-service';

@autoinject()
export class GifApi {

    public root:string= "http://localhost:8000/";
    constructor(private apiService: ApiService) { }

    public getAllGifs(): Promise<string[]> {
        return this.apiService.get(`${this.root}uploads/all`, json => json);
    }

    public getGifsByCategory(category: string): Promise<string[]> {
        return this.apiService.get(`${this.root}api/Gif/GetAllGifs/` + category, json => json);
    }

    public getRandomGif(): Promise<string> {
        return this.apiService.get(`${this.root}api/Gif/GetRandomGif/`, json => json);
    }
}