import {bindable, autoinject} from 'aurelia-framework';

@autoinject()
export class GifCard {
	@bindable
	public src:string;

	public attached(){}

	public srcChanged(o, n){}

	public imagePath(src) {
		console.log(src);
		let s = "success4.gif"
		return require("../gifs/" + src);
	}
}

//Solving the require problem
//https://stackoverflow.com/questions/37241662/using-require-with-a-variable-vs-using-a-string-in-webpack/37241982
//https://stackoverflow.com/questions/31694346/webpack-can-not-require-variable-the-request-of-a-dependency-is-an-expression/33048000#33048000
//https://webpack.github.io/docs/context.html