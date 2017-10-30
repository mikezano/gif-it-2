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
		("dragend,dragleave,drop").split(",").forEach((e)=>{
			this.uploader.addEventListener(e, this.removeDragClass, false);
		});

		this.uploader.addEventListener("drop", (e)=>this.submit(e), false);
	}

	public supportsDrag():boolean{
		var div = document.createElement('div');
		return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
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

	public submit(e): void{
		console.log("before");
		console.log(e.currentTarget);
		var  eventThing = e;
		let gifs = e.dataTransfer.files;
		let formData = new FormData();

		e.currentTarget.classList.add('is-uploading');
		for (let i = 0; i < gifs.length; i++) {
			formData.append('gifs', gifs[i]);
			console.log(gifs[i]);
		}

		this.apiService.uploadGif(formData).then((result)=>{
			console.log("after");
			console.log(eventThing.currentTarget);
			this.uploader.classList.remove('is-uploading');
			this.uploader.classList.add('is-done');
			setTimeout(()=>{
				this.uploader.classList.remove('is-done');
			},1000);
		});
	}
}