import {bindable, autoinject} from 'aurelia-framework';
import { GifApi } from "../../api/gif-api";

@autoinject()
export class FileDropper {

	public uploader:HTMLElement;
	public droppedFiles:boolean = false;

	constructor(
		private apiService: GifApi
	){}

	public attached(){
		("drag,dragstart,dragend,dragover,dragenter,dragleave,drop").split(",").forEach((e)=>{
			this.uploader.addEventListener(e, this.stop, false);
		});
		("dragover,dragenter").split(",").forEach((e)=>{
			this.uploader.addEventListener(e, this.addDragClass, false);
		});
		("dragleave,dragend,drop").split(",").forEach((e)=>{
			this.uploader.addEventListener(e, this.removeDragClass, false);
		});

		this.uploader.addEventListener("drop", (e)=>this.submit(e), false);
	}

	public stop(e):void{
		e.preventDefault();
		e.stopPropagation();
		
	}

	public addDragClass(e){
		e.currentTarget.classList.add('is-dragover');
	}
	public removeDragClass(e){
		console.log("drop");
		console.log(e);
		e.currentTarget.classList.remove('is-dragover');
	}	

	public submit(e): void{
		debugger;
		let gifs = e.dataTransfer.files;
		let formData = new FormData();
		
		e.currentTarget.classList.add('is-uploading');
		for (let i = 0; i < gifs.length; i++) {
			formData.append('gifs', gifs[i]);
			console.log(gifs[i]);
		}

		setTimeout(()=>{
			alert('hi');
			this.apiService.uploadGif(formData).then((result)=>{
				console.log(result);
				e.currentTarget.classList.remove('is-uploading');
			});
		}, 100000);

	}	
}
