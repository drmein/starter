
var palettes = {
	'palette1': ['#010E25', '#072C67', '#253A7F', '#899CEB', '#4D63B6'],
	'palette2': ['#08030F', '#361C6D', '#D64A9F', '#CC8CCD', '#7C469A']
};

// Select a palette
selPalette = _.sample(Object.keys(palettes));

// set color variables
function createColors(){
	color1 = _.sample(palettes[selPalette]);
	color2 = _.sample(palettes[selPalette]);
	return color1, color2
};


// color page elements
function colorizePage(){
	$('#starter-header')
		.css('background-color', color1);
	$('body')
		.css('background-color', color2);
};


// Initialize
$(document).ready(function() {
	createColors();
	colorizePage();

})
