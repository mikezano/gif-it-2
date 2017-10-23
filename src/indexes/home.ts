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

    constructor(
        private apiService: GifApi,
		private dialogService: DialogService
    ){
    }

	public attached(): void {

		//setTimeout(() => { this.openDialog() }, 1000);
		this.apiService.getAllGifs().then((result:any) =>{
			console.log(result[0]);
			this.out = result[0];
			this.gifData = new Blob([this.out.data], {type: "image/png"});			
			console.log(this.gifData);
			this.urlCreated = URL.createObjectURL(this.gifData);
			console.log(this.urlCreated);
		});
		// setInterval(() => {
		// 	this.apiService.getRandomGif().then(result => {
        //         debugger;
		// 		this.gif = result;
		// 	});

		// }, 3000);  
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
}
