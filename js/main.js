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
			vm.outHours = text.locations;

			// locLabel = ['Downcity: ', 'Harborside: ', 'Museum: '];
			// for (var i = 0; i < hours.length; i++) {
			// 	l = hours[i];
			// 	hourString = l.times.hours[0].from + ' - ' + l.times.hours[0].to;
			// 	vm.outHours += (locLabel[i] + hourString + ' ');
			//
			// };


		});


};



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
	<div class='db-cards' v-for='item in imagelist'>
	<img  :src=item.imgPath>
	<p> {{item.title}} </p>
	</div>
	</div>
`
});




// Top level components


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



Vue.component('homepage-content', {
	data() {
		return {
			sectionTitle: 'Visit the Library Homepage',
			bulletItems: ['Find books and articles', 'See our textbook collection', 'Chat with a librarian', 'Book a study room', 'Learn how to research', ],
		        imageObjList: [{
                     'imgPath': 'static/homepage-view-desktop.png',
                     'title': 'Destkop/Laptop',
                     'url': ''
                 },
                 {
                     'imgPath': 'static/homepage-view-mobile.png',
                     'title': 'Mobile',
                     'url': ''
                 }
        ]
             ,
			qrUrl: 'http://pvd.library.jwu.edu/homepage'
		}
	},

	template: `

	<div id='homepage-item' class="display-item">

		<h2 style="grid-column: 1/9">{{sectionTitle}}</h2>

        <imagelist-component :imagelist=imageObjList>
        </imagelist-component>

		<h4> You can:</h4>
				<ul  class='horizontal-list'>
				            <li v-for='item in bulletItems'>{{item}}</li>
				</ul>

		<callout-component :externalUrl=qrUrl style="grid-column: 1/9;">
		</callout-component>
        
		</div>
	  `
});




Vue.component('database-content', {
	data() {
		return {
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
	computed: {
		imageObjs: function() {
			return _.sampleSize(this.imageObjList, [n = 3])
		},

		bulletItems: function() {
			return _.sampleSize(this.bulletItemList, [n = 4])
		}
	},


	template: `

		<div id='databases-item' class="display-item">

			<h2 style="grid-column: 1/9">{{sectionTitle}}</h2>
	<div class="image-wrap">
	<div class='db-cards' v-for='item in imageObjs'>
	<img  :src=item.imgPath>
	<p> {{item.title}} </p>
	</div>
	</div>


			<h4> You can:</h4>

				<ul  class='horizontal-list'>
				<li v-for='item in bulletItems'>
				<span v-html='svgBullet'></span>
				{{item}}
				</li>
				</ul>



                <callout-component :externalUrl=qrUrl style="grid-column: 1/9;">


    			</callout-component>
		</div>
  `
});


Vue.component('newbook-content', {
	data() {
		return {
			sectionTitle: 'New Books in Our Collection',
			svgBullet: `
	 ---

			`,

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

		<div id='newbooks-item' class="display-item">

			<h2 style="grid-column: 1/9">{{sectionTitle}}</h2>
	<div class="image-wrap">
	<div class='db-cards' v-for='item in imageObjs'>
	<img  :src=item.imgPath>
	<p> {{item.title}} </p>
	</div>
	</div>






    <callout-component :externalUrl=qrUrl style="grid-column: 1/9;">


    </callout-component>
		</div>
  `
});



Vue.component('librarian-content', {
	data() {
		return {
			sectionTitle: 'Featured librarians',
			svgBullet: `
	 ---

			`,

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
			qrUrl: 'http://pvd.library.jwu.edu/az.php',
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
	watch: {
		lgHtml: function() {
			console.log("CHANGES");
			parsedLibrarianContent = parseLgContent(this.lgHtml);

		}
	},


	template: `

		<div id='librarian-item' class="display-item">

			<h2 style="grid-column: 1/9">{{sectionTitle}}</h2>


    <imagelist-component :imagelist=imageObjs>
    </imagelist-component>






			<div style="grid-column: 1/9;" class="callout">
				<span v-html='lgHtml'> </span>


			</div>
		</div>
  `
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
	vm.$refs[container].lgHtml = content;
};

function getLgContent(url, container) {

	fetch(url, {
			method: "GET"
		}).then(function(response, container) {

			return response.text();

		})
		.then(function(text) {
			storeGetContent(text, container)


		});


};


function parseLgContent(lgContent) {
	parsed = lgContent;
	return parsed
}






// Initialize
$(document).ready(function() {
	var contentItems = ['#databases-item', '#homepage-item', '#newbooks-item', '#librarian-item'];

	_.forEach(contentItems, function(item) {
		$(item).hide();
	});

	$(_.sample(contentItems)).show();
	getHours();
	// New book content get
	getLgContent(
		'https://lgapi-us.libapps.com/widgets.php?site_id=538&widget_type=8&output_format=1&widget_embed_type=2&guide_id=731798&box_id=16491701&map_id=19425291&content_only=0&config_id=1510000840435',
		'newbookref');

	// Get librarian content
	getLgContent(
		'https://lgapi-us.libapps.com/widgets.php?site_id=538&widget_type=8&output_format=1&widget_embed_type=2&guide_id=731798&box_id=16571535&map_id=19518122&content_only=0&config_id=1510006276756',
		'librarianref');
});
