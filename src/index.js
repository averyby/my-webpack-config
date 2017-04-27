var messages = require('./greeting.js');
import {multiply} from './mathStuff.js';
import $ from 'jquery';

var style = require('./style/globalStyle.scss');

import React from 'react';
import ReactDOM  from 'react-dom';

ReactDOM.render(
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Panel title</h3>
		</div>
		<div class="panel-body">
			Panel content
		</div>
	</div>,
	document.getElementById('app')
);

if (module.hot) {
	module.hot.accept()
}
