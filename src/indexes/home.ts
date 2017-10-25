import {bindable, autoinject} from 'aurelia-framework';
import { GifApi } from "../api/gif-api";
import { DialogService } from "aurelia-dialog";
import {GifEmbedDialog} from "../resources/elements/gif-embed-dialog";

@autoinject()
export class Home{

	public gif:string;
	public out:any;
	public gifData: Blob;
	public urlCreated: string;
	public base64src:string;

	constructor(
		private apiService: GifApi,
		private dialogService: DialogService
	){}

	public attached(): void {
		//setInterval(() => { this.getRandomGif() }, 3000);
	}

	public getRandomGif():void{
		this.apiService.getRandomGif().then((result:any)=>{
			console.log(result);
			this.base64src = "data:image/gif;base64," + result[0].data;
		});
	}

	public openDialog(): void {
		this.dialogService
			.open({
				viewModel: GifEmbedDialog,
				model: {
					firstName: 'Wade',
					middleName: 'Owen',
					lastName: 'Watts'
				}
			});
	}

	public submit(gifs): void{
		let formData = new FormData();
		
		for (let i = 0; i < gifs.length; i++) {
			formData.append('gifs', gifs[i]);
			console.log(gifs[i]);
			debugger;
			//this.apiService.uploadGif()
		}
		
	}
}
