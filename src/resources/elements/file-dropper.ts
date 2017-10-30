import {bindable, autoinject} from 'aurelia-framework';
import { GifApi } from "../../api/gif-api";

@autoinject()
export class FileDropper {

	public uploader:HTMLElement;

	@bindable
	public gifs: File[] = [];

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
		("dragend,dragleave,drop").split(",").forEach((e)=>{
			this.uploader.addEventListener(e, this.removeDragClass, false);
		});

		this.uploader.addEventListener("drop", (e)=>this.submit(e), false);
	}

	public gifsChanged(newValue, oldValue){
		console.log(newValue, oldValue);
	}
	public supportsDrag():boolean{
		var div = document.createElement('div');
		return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
	}

	public hasGifs():boolean{
		console.log(this.gifs);
		return this.gifs.length > 0;
	}
	public stop(e):void{
		e.preventDefault();
		e.stopPropagation();
	}

	public addDragClass(e){
		console.log("adddrag");
		e.currentTarget.classList.add('is-dragover');
	}
	public removeDragClass(e){
		console.log("remove drag");
		e.currentTarget.classList.remove('is-dragover');
	}	

	public submitManually(gifs):void{
		console.log(gifs);
		alert('hi');
	}
	public submit(e): void{
		console.log("before");
		console.log(e.currentTarget);
		var  eventThing = e;
		this.gifs = e.dataTransfer.files;
		let formData = new FormData();

		e.currentTarget.classList.add('is-uploading');
		for (let i = 0; i < this.gifs.length; i++) {
			formData.append('gifs', this.gifs[i]);
			console.log(this.gifs[i]);
		}

		this.apiService.uploadGif(formData).then((result)=>{
			console.log("after");
			console.log(eventThing.currentTarget);
			this.uploader.classList.remove('is-uploading');
			this.showDone();
		});
	}

	public showDone(){
		this.uploader.classList.add('is-done');
		this.gifs = [];
		setTimeout(()=>{
			this.uploader.classList.remove('is-done');
		},1000);
	}
}