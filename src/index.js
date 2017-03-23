var messages = require('./greeting.js');
import {multiply} from './mathStuff.js';

var style = require('./style/globalStyle.scss');

$('#app').html(`
	<div class=${style.box}>
		<p>Hello, World</p>
	</div>
`);

if (module.hot) {
	module.hot.accept()
}