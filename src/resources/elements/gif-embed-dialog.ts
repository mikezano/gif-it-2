import {DialogController} from "aurelia-dialog";
import { autoinject } from 'aurelia-framework';
//import {ZeroClipboardService} from "../../Services/ZeroClipboardService";
import {BindingEngine} from 'aurelia-framework';
//import {ObserverLocator} from 'aurelia-framework';

@autoinject()
export class GifEmbedDialog {

	public width: number = 100;
	public height: number = 100;
	public category: string = "All";
	public fullEmbedCode:string = "";
	public fullEmbedCodeAlt:string = "";
	public showCustom:boolean = false;

	constructor(public controller: DialogController, public be:BindingEngine) {
		//this.controller = controller;
		//this.controller.settings.lock = true;
	}

	private setFullEmbedCode(): void {
		this.fullEmbedCode = this.embedCode();
	}


	public attached(): void {

		this.setFullEmbedCode();
		this.be.propertyObserver(this, 'width').subscribe(() => {this.setFullEmbedCode();});
		this.be.propertyObserver(this, 'height').subscribe(() => {this.setFullEmbedCode();});
		this.be.propertyObserver(this, 'category').subscribe(() => { this.setFullEmbedCode(); });

		// ZeroClipboardService.setUpWithCallback("copy-embed-code", () => {
		// 	this.controller.ok();
		// 	return this.embedCode();
		// });
	}

	public updateEmbedCode(size: string) {

		this.showCustom = false;
		switch(size) {
			case 'Small':
				this.width = 100;
				this.height = 100;
				break;
			case 'Medium':
				this.width = 200;
				this.height = 200;
				break;
			case 'Large':
				this.width = 300;
				this.height = 300;
				break;
			case 'Custom':
				this.showCustom = true;
				break;
		}
	}

	public embedCode(): string {
		return `<a id="gif-it"
 height="${this.height}" width="${this.width}" category="${this.category}"
 href="javascript:
  var%20s%20=%20document.createElement('script');
  s.type='text/javascript';
  document.body.appendChild(s);
  s.src='//imagebin-tst.intel.com/Content/gifit.js';
  void(0);">
    Gif It!
</a>`;
    }

    public triggerGifCode(): string {
        return `var gif = document.getElementById('gifit'); gif.click();`;
    }
}