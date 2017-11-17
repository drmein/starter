function getHours() {
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	var cat = document.createElement('div');
	url = 'https://api3.libcal.com/api_hours_today.php?iid=1433&lid=0&format=json&systemTime=0';
	fetch(proxyUrl + url, {
			method: "GET"
		}).then(function(response) {
			return response.json();

		})
		.then(function(text) {
			vm.outHours = text.locations

		});
};


// Top level components
Vue.component('structure-content', {
	props: {
		'divname': {
			default: 'generic-item'
		},
		'textContent' : {
			default: 'Text goes here!'
		},
		'featuredHTML' : {
			default: ''
		},
		'sectionTitle': {
			default: 'generic-section'
		},
		'externalUrl': {
			default: 'genericurl'
		},
		'bulletItemList': {
			default: ['Good stuff']
		},
		'bulletItemTitle': {
			default: 'You can: '
		},
		qrUrl: {default: ''},
		'imageObjList': {default: {}},
		'featuredImage': {default:'static/jwuseal.png'},
		'hasBullets': {
			default: true
		},
	},

	data() {
		return {}
	},
	computed: {
		imageObjs: function() {
			return _.sampleSize(this.imageObjList, [n = 3])
		},

		bulletItems: function() {
			return _.sampleSize(this.bulletItemList, [n = 4])
		}
	},
	template: `
              <div :id=divname class="display-item">
                <h2 style="grid-column: 1/9">{{sectionTitle}}</h2>
                    <imagelist-component :imagelist=imageObjList>
                      </imagelist-component>
				<div class='featured-image'>
				<img :src=featuredImage>
				</div>
				<div class='text-content'>
					<p> {{textContent}} </p>
				</div>
				<div v-html='featuredHTML' class='html-content'>

				</div>
                <div v-if=hasBullets  class="bullet-list">
                <h4>{{bulletItemTitle}}</h4>
                <ul  class='horizontal-list'>
                <li v-for='item in bulletItems'>{{item}}</li>
                 </ul>
                </div>
                <callout-component :externalUrl=qrUrl style="grid-column: 1/9;">
                </callout-component>
            </div>
			  `

});

Vue.component('display-header', function(resolve, reject) {
	setTimeout(function() {
		resolve({
			props: ['hours'],

			data() {
				return {
					inspirationMsgs: [
						'You can do it!',
						'Today is a great day for research',
						'Have you talked to a librarian today?',
						'We have hundreds of thousands of ebooks!'
					]

				}
			},
			computed: {
				welcomeMsg: function() {
					return _.sample(this.inspirationMsgs)
				}

			},

			template: `
				  <section id ='main-header'>
				   <img src='static/library-identifier-whiteandorange.svg'>
				   <div id='top-hours'>
				   <span v-for='item in hours'>
				   		   {{item.name}} 	:	   {{item.times.hours[0].from}} --  {{item.times.hours[0].to}}
						    </span>
				   </div>
				   <div id='welcome-message'>{{welcomeMsg}}</div>
				  </section>
			  `
		})
	}, 50)
});

Vue.component('display-footer', {
	computed: {
		date: function() {
			var d = new Date(_.now());
			return d.toDateString()
		}

	},
	template: `
	<section id='bottom-section'>
	  <div id='bottom-grey'>
	   <span id="date-time">{{date}}</span>
	  </div>
	  <div id='bottom-white'>
      <span>Johnson & Wales University Library</span>
 		<img src='static/jwuseal_alt.png'>
	  </div>
	  </section>
  `
});

// Page components

Vue.component('homepage-content', {
	data() {
		return {
			sectionTitle: 'Visit the Library Homepage',
			bulletItemList: ['Find books and articles', 'See our textbook collection', 'Chat with a librarian', 'Book a study room', 'Learn how to research'],
			imageObjList: [{
					'imgPath': 'static/homepage-view-desktop.png',
					'title': 'Desktop/Laptop',
					'url': ''
				},
				{
					'imgPath': 'static/homepage-view-mobile.png',
					'title': 'Mobile',
					'url': ''
				}
			],
			qrUrl: 'http://pvd.library.jwu.edu/homepage',
			divName: 'homepage-item',
			bullets: true
		}
	},

	template: `
	<structure-content :divname=divName :qrUrl=qrUrl :sectionTitle=sectionTitle :imageObjList=imageObjList :hasBullets=bullets :bulletItemList=bulletItemList >
  </structure-content>
	  `
});

Vue.component('database-content', {
	data() {
		return {
			divName: 'databases-item',
			bullets: true,
			sectionTitle: 'Check out our Databases!',
			svgBullet: `
	 ---
			`,
			bulletItemList: [
				'Read case studies',
				'Get company ratios',
				'Read the New York Times or Wall Street Journals (as many articles as you like!)',
				'Find scholarly articles',
				'Read ebooks',
				'Learn new tech skills',
				'Find topics for persuasive essays'
			],
			imageObjList: [{
					'imgPath': 'static/database-image-1.png',
					'title': 'Sage Business Cases',
					'url': ''
				},
				{
					'imgPath': 'static/database-image-2.png',
					'title': 'Ebook Central',
					'url': ''
				},
				{
					'imgPath': 'static/database-image-3.png',
					'title': 'Lynda.com',
					'url': ''
				},
				{
					'imgPath': 'static/database-image-4.png',
					'title': 'Business Source Complete',
					'url': ''
				}
			],
			qrUrl: 'http://pvd.library.jwu.edu/az.php'
		}
	},

	template: `
  <structure-content :divname=divName :qrUrl=qrUrl :sectionTitle=sectionTitle :imageObjList=imageObjList :hasBullets=bullets :bulletItemList=bulletItemList >
    </structure-content>
  `
});

Vue.component('newbook-content', {
	data() {
		return {
			bullets: false,
			divName: 'newbooks-item',
			sectionTitle: 'New Books in Our Collection',
			svgBullet: `	 ---		`,

			bulletItemList: [
				'Read case studies',
				'Get company ratios',
				'Read the New York Times or Wall Street Journals (as many articles as you like!)',
				'Find scholarly articles',
				'Read ebooks',
				'Learn new tech skills',
				'Find topics for persuasive essays'
			],

			imageObjList: [{
					'imgPath': 'static/database-image-1.png',
					'title': 'Sage Business Cases',
					'url': ''
				},
				{
					'imgPath': 'static/database-image-2.png',
					'title': 'Ebook Central',
					'url': ''
				},
				{
					'imgPath': 'static/database-image-3.png',
					'title': 'Lynda.com',
					'url': ''
				},
				{
					'imgPath': 'static/database-image-4.png',
					'title': 'Business Source Complete',
					'url': ''
				}
			],
			qrUrl: 'http://pvd.library.jwu.edu/newbooks',
			lgHtml: 'placeholder'
		}
	},
	computed: {
		imageObjs: function() {
			return _.sampleSize(this.imageObjList, [n = 3])
		},

		bulletItems: function() {
			return _.sampleSize(this.bulletItemList, [n = 4])
		}
	},

	template: `
  <structure-content :divname=divName :qrUrl=qrUrl :sectionTitle=sectionTitle :imageObjList=imageObjList :hasBullets=bullets :bulletItemList=bulletItemList >
  </structure-content>
  `
});

Vue.component('librarian-content', {
	data() {
		return {
			sectionTitle: 'Featured librarians',
			bullets: true,
			image: {},
			text: '',
			divName: 'librarian-item',
			bulletItemTitle: 'Librarians can help you to: ',
			bulletItemList: [
				'Read case studies',
				'Get company ratios',
				'Read the New York Times or Wall Street Journals (as many articles as you like!)',
				'Find scholarly articles',
				'Learn new tech skills',
				'Find topics for persuasive essays'
			],

			qrUrl: 'http://pvd.library.jwu.edu/az.php',
			lgHtmlObjs: {},
			imageObjList: {},
			lgHtml: 'placeholder',
			parsedHtml: {},
			innerHTML: ''
		}
	},
	watch: {
		lgHtmlObjs: function() {
			console.log("CHANGES");
			parsedLibrarianContent = parseLgContent(this.lgHtmlObjs, 'librarian');
			this.parsedHtml = parsedLibrarianContent;
			this.image = parsedLibrarianContent.image[0].src;
			this.text = parsedLibrarianContent.text;
			this.innerHTML = parsedLibrarianContent.innerHTML;
		}
	},

	template: `
  <structure-content :textContent=text :divname=divName :qrUrl=qrUrl :sectionTitle=sectionTitle :imageObjList=imageObjList :hasBullets=bullets :bulletItemList=bulletItemList :bulletItemTitle=bulletItemTitle :featuredImage=image :featuredHTML=innerHTML>
  </structure-content>
  `
});


// Lower level components
Vue.component('callout-component', {
	props: ['externalUrl'],
	template: `
    <div class='callout'>
    <span>{{externalUrl}} </span>
    <span>
            <qriously class='qr-code'  :value=externalUrl  :size="100"  /></span>
            </div>
`
});

Vue.component('imagelist-component', {
	props: ['imagelist'],
	template: `
    <div class="image-wrap">
	<div class='img-cards' v-for='item in imagelist'>
	<img  :src=item.imgPath>
	<p> {{item.title}} </p>
	</div>
	</div>
`
});


const vm = new Vue({
	el: "#app",
	data() {
		return {
			message: "Hello!",

			outHours: ''

		}
	},
	libraryName: {
		message: function() {
			console.log('CHANGED')
		}
	},
	computed: {
		libraryName: function() {
			return _.sample(['Downcity Library', 'Harborside Library'])
		}

	}
});

//TODO
function storeGetContent(content, container) {
	var el = document.createElement('div');
	el.innerHTML = content;
	parsedContent = el.getElementsByClassName('s-lib-box-content');
	vm.$refs[container].lgHtmlObjs = parsedContent;

};

function getLgContent(url, container) {

	fetch(url, {
			method: "GET"
		}).then(function(response, container) {

			return response.text();

		})
		.then(function(text) {
			storeGetContent(text, container);

		});

};

//TODO: GET LG CONTENT, and then Parse into a JSON Object
function bookParse(lgContent) {
	return lgContent;
}

function librarianParse(lgContent) {
	parsed = _.sample(lgContent[0].children);
	console.log(parsed);
	outObj = {};
	outObj['image'] = parsed.querySelectorAll('img');
	outObj['htmlContent'] = parsed;
	outObj['text'] = outObj['htmlContent'].innerText;
	outObj['innerHTML'] = outObj['htmlContent'].innerHTML;

	return outObj;
}


function parseLgContent(lgContent, type) {

	switch (type) {
		case ('book'):
			parsed = bookParse(lgContent);
			break;
		case ('librarian'):
			parsed = librarianParse(lgContent);
			return parsed
		default:
			parsed = "FAIL";
			break


	}

}

var contentItems = [
	'databases-item',
	'homepage-item',
	'newbooks-item',
	'librarian-item'];

function changeContent(contentItems) {
	document.querySelectorAll
	//HIDE
	_.forEach(contentItems, function(item) {
		el = document.getElementById(item);
		el.style.display = 'none';
	});

	//SHOW
	el = document.getElementById(_.sample(contentItems));
	el.style.display = '';

}

// Initialize
$(document).ready(function() {

	changeContent(contentItems);

	getHours();
	// New book content get
	getLgContent(
		'https://lgapi-us.libapps.com/widgets.php?site_id=538&widget_type=8&output_format=1&widget_embed_type=2&guide_id=731798&box_id=16491701&map_id=19425291&content_only=0&config_id=1510000840435',
		'newbookref');

	// Get librarian content
	getLgContent(
		'https://lgapi-us.libapps.com/widgets.php?site_id=538&widget_type=8&output_format=1&widget_embed_type=2&guide_id=731798&box_id=16571535&map_id=19518122&content_only=0&config_id=1510006276756',
		'librarianref');

	window.addEventListener('keyup', function(event) {
		// If down arrow was pressed...
		if (event.keyCode == 65) {
			changeContent(contentItems);
		}
	});

});
