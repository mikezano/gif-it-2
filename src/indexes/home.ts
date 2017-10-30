import {bindable, autoinject} from 'aurelia-framework';
import { GifApi } from "../api/gif-api";
import { DialogService } from "aurelia-dialog";
import {GifEmbedDialog} from "../resources/elements/gif-embed-dialog";
import {Letter} from "../resources/elements/letter"
import {moveBefore} from 'aurelia-dragula';

@autoinject()
export class Home{

	public gif:string;
	public out:any;
	public gifData: Blob;
	public urlCreated: string;
	public base64src:string;
	public letters: Letter[];

	constructor(
		private apiService: GifApi,
		private dialogService: DialogService
	){}

	public attached(): void {
		setInterval(() => { this.getRandomGif() }, 3000);
		this.letters = [
			new Letter(),
			new Letter(),
			new Letter()
		];
	}


	public drop(item, target, source, sibling){
		alert('yo');
	}

	public supportsDrag():boolean{
		var div = document.createElement('div');
		return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
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
		}

		this.apiService.uploadGif(formData).then((result)=>{
			console.log(result);
		});		
		
	}
}
