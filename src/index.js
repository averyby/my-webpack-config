var messages = require('./greeting.js');
import {multiply} from './mathStuff.js';
import $ from 'jquery';

var style = require('./style/globalStyle.scss');

$('#app').html(`
	<div class=${style.box}>
		<p>3 * 4 = ${multiply(3, 4)}</p>
	</div>
`);

if (module.hot) {
	module.hot.accept()
}
