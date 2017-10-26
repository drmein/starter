//Check contrast




//test colortable




// Select a palette
var palettes = {
	'palette1': ['#010E25', '#072C67', '#253A7F', '#899CEB', '#4D63B6'],
	'palette2': ['#08030F', '#361C6D', '#D64A9F', '#CC8CCD', '#7C469A'],
	'palette3': ['#4A3976', '#D4C1CD', '#31E0CA', '#341D21', '#8692BC'],
	'palette4': ['#3B8BE9', '#FAFBFB', '#4CD2F2', '#2C4BE4', '#143B6B'],
	'palette5': ['#2A221A', '#E8E2E1', '#785F5D', '#657B9A', '#849BB3'],
	'palette6': ['#0C44EC', '#FBAB04', '#C4D4FB', '#74B0F9', '#6D6C8A'],
	'palette7': ['#E8D0A9', '#B7AFA3', '#C1DAD6', '#F5FAFA', '#ACD1E9', '#6D929B'],
	'palette8': ['#771100', '#CC6633', '#FF9900', '#999999', '#CCCCCC']

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
	$('.btn-primary').mouseenter(function() {
		$(this).css('background-color', color2);
	}).mouseleave(function() {
		$(this).css('background-color', color3);
	});;

	$('.btn-secondary').css('background-color', color4);
	$('.btn-secondary').mouseenter(function() {
		$(this).css('background-color', color5);
	}).mouseleave(function() {
		$(this).css('background-color', color4);
	});;

	$('#everything-box label').css('color', color4);

	console.log(selPalette)
};


function reColorize() {
	selPalette = _.sample(Object.keys(palettes));
	createColors();
	colorizePage();
};

function saveJson(data) {

	var json = data;
	var blob = new Blob([json], {
		type: "application/json"
	});
	var url = URL.createObjectURL(blob);

	var a = document.createElement('a');
	a.download = "backup.json";
	a.href = url;
	a.text = String(Object.values(savedColors));


	$('#main').append(a)
	$('#main').append('<br>')
}

function saveColors() {
	savedColors = {
		'color1': color1,
		'color2': color2,
		'color3': color3,
		'color4': color4,
		'color5': color5
	};
	saveJson(savedColors);
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
