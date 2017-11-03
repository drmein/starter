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
			images: ['static/homepage-view-desktop.png', 'static/homepage-view-mobile.png'],
			qrUrl: 'http://pvd.library.jwu.edu/homepage'
		}
	},

	template: `

	<div id='homepage-item' class="display-item">

		<h2 style="grid-column: 1/9">{{sectionTitle}}</h2>
<div class="image-wrap">
<img  v-for='item in images' :src=item>
</div>

		<h4> You can:</h4>

			<ul  class='horizontal-list'>
			<li v-for='item in bulletItems'>{{item}}</li>
			</ul>



		<div style="grid-column: 1/9;" class="callout">
			<span>http://pvd.library.jwu.edu/homepage </span>
			<span>
								<qriously class='qr-code'  value='http://pvd.library.jwu.edu/homepage'  :size="100"  /></span>

		</div>
	</div>
  `
});




Vue.component('database-content', {
	data() {
		return {
			sectionTitle: 'Check out our Databases!',
			svgBullet:		`
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



		<div style="grid-column: 1/9;" class="callout">
			<span>{{qrUrl}} </span>
			<span>
							<qriously class='qr-code' :value=qrUrl  :size="100"  /></span>

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







// Initialize
$(document).ready(function() {
	$(_.sample(['#databases-item', '#homepage-item'])).hide();
	getHours();
});
