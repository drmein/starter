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
			bulletItems: ['Find books and articles', 'See our textbook collection', 'Chat with a librarian', 'Book a study room', 'Learn how to research', ]
		}
	},

	template: `

	<div id='homepage-item' class="display-item">

		<h2 style="grid-column: 1/9">{{sectionTitle}}</h2>
		<img style="grid-column: 2/5" src='static/homepage-view-desktop.png'>
		<img style="grid-column: 5/7;" src='static/homepage-view-mobile.png'>

		<h4 style="grid-column: 1/2;"> You can:</h4>
		<div style="grid-column: 2/8;">
			<ul  class='horizontal-list'>
			<li v-for='item in bulletItems'>{{item}}</li>
			</ul>
		</div>


		<div style="grid-column: 1/9;" class="callout">
			<span>http://pvd.library.jwu.edu/homepage </span>
			<span>
							<qriously value='http://pvd.library.jwu.edu/homepage'  :size="100"  /></span>

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




var svgBullet1 = `
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"/></svg>
`;


// Initialize
$(document).ready(function() {

	$('ul.horizontal-list li').prepend(svgBullet1);
	getHours();
});
