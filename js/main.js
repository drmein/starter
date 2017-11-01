function getDate(timestamp) {
	var d = new Date(timestamp);
	return d.toDateString()
}



Vue.component('display-header', {
	props: ['libHours'],
	template: `
	 <section id ='main-header'>
	  <img src='static/library-identifier-whiteandorange.svg'>
	 </section>
  `
});



Vue.component('homepage-content', {
	props: ['datetext'],
	template: `

	<div id='homepage-item' class="display-item">

		<h2 style="grid-column: 1/9">Visit the Library Homepage</h2>
		<img style="grid-column: 2/5" src='static/homepage-view-desktop.png'>
		<img style="grid-column: 5/7;" src='static/homepage-view-mobile.png'>

		<h4 style="grid-column: 1/2;"> You can:</h4>
		<div style="grid-column: 2/8;">
			<ul class='horizontal-list'>
				<li>Find books and articles</li>
				<li>See our textbook collection</li>
				<li>Chat with a librarian</li>
				<li>Book a study room</li>
				<li>Learn how to research</li>
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
	props: ['datetext'],
	template: `
	<section id='bottom-section'>
	  <div id='bottom-grey'>
	   <span id="date-time">{{datetext}}</span>
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
			date: getDate(_.now())
		}
	}
});




var svgBullet1 = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"/></svg>
`;


// Initialize
$(document).ready(function() {

	$('ul.horizontal-list li').prepend(svgBullet1);
});
