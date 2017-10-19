//Check contrast




//test colortable




// Select a palette
var palettes = {
	'palette1': ['#010E25', '#072C67', '#253A7F', '#899CEB', '#4D63B6'],
	'palette2': ['#08030F', '#361C6D', '#D64A9F', '#CC8CCD', '#7C469A'],
	'palette3': ['#4A3976', '#D4C1CD', '#31E0CA', '#341D21', '#8692BC'],
	'palette4': ['#3B8BE9', '#FAFBFB', '#4CD2F2', '#2C4BE4', '#143B6B'],
	'palette5': ['#2A221A', '#E8E2E1', '#785F5D', '#657B9A', '#849BB3'],
	'palette6': ['#0C44EC', '#FBAB04', '#C4D4FB', '#74B0F9', '#6D6C8A']

};
selPalette = _.sample(Object.keys(palettes));
// set color variables
function createColors() {
	var palcopy = _.cloneDeep(palettes);
	color1 = _.sample(palcopy[selPalette]);
	_.pull(palcopy[selPalette], color1);

	color2 = _.sample(palcopy[selPalette]);
	_.pull(palcopy[selPalette], color2);

	color3 = _.sample(palcopy[selPalette]);
	_.pull(palcopy[selPalette], color3);

	color4 = _.sample(palcopy[selPalette]);

	_.pull(palcopy[selPalette], color4);
	color5 = _.sample(palcopy[selPalette]);

	return color1, color2, color3, color4, color5
};
// color page elements
function colorizePage() {
	$('#starter-header')
		.css('background-color', color1);
	$('label')
		.css('color', color2);
	$('.btn-primary').css('background-color', color3);
	$('.btn-secondary').css('background-color', color5);
	$('#everything-box').css('background-color', color4)
	console.log(selPalette)
};

function reColorize() {
	selPalette = _.sample(Object.keys(palettes));
	createColors();
	colorizePage();
}


// Send Libinsight
function sendLi() {
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	url = 'https://jwu-ri.libinsight.com/add.php?wid=8&type=5&token=b79333cec0ea7b17fa33e06e13c3bc36';
	var form = new FormData($('form#add-record')[0]);
	for (var [key, value] of form.entries()) {
		console.log(key, value);
	}

	fetch(proxyUrl + url, {
		method: "POST",
		body: form,
		headers: {
			"Content-Type": "text/plain",
			'x-requested-with': 'browser'
		},
	})
};


// Initialize
$(document).ready(function() {
	createColors();
	colorizePage();


});
