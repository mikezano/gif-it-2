import {bindable, autoinject} from 'aurelia-framework';
import { GifApi } from "../api/gif-api";
import { DialogService } from "aurelia-dialog";
import {GifEmbedDialog} from "../resources/elements/gif-embed-dialog";

@autoinject()
export class Home{

    public gif:string;

    constructor(
        private apiService: GifApi,
        private dialogService: DialogService
    ){
    }

	public attached(): void {

		//setTimeout(() => { this.openDialog() }, 1000);
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
