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
    ){
    }

	public attached(): void {

		//setTimeout(() => { this.openDialog() }, 1000);
		this.apiService.getAllGifs().then((result:any) =>{
			console.log(result[1]);
			this.out = result[1];
			let stuff = new Uint8Array(this.out);
			this.gifData = new Blob([this.out.data], {type: "image/gif"});			
			console.log(this.gifData);
			this.urlCreated = URL.createObjectURL(this.gifData);
			console.log(this.urlCreated);
			this.base64src = "data:image/gif;base64," + this.out.data;
			//this.base64src = btoa(this.out.data);
			//console.log(this.base64src);
			//var reader = new FileReader();
			// reader.readAsDataURL(this.gifData); 
			// reader.onloadend = ()=> {
			// 			   let base64data = reader.result;
			// 			   console.log("")
			// 			   console.log(base64data );
			// 			   this.base64src = base64data;
			// }
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
