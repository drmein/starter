function getDate(timestamp) {
	var d = new Date(timestamp);
	return d
}

Vue.component('display-footer', {
	props: ['datetext'],
	template: `
  <section id='bottom-section'>
	  <div id='bottom-grey'>
	   <span id="date-time">{{datetext}}</span>
	  </div>
	  <div id='bottom-white'>
 <img src='static/jwuseal_alt.png'>
	  </div>
  </section>
  `
});


Vue.component('display-header', {
	template: `
	 <section id ='main-header'>
	 <img src='static/library-identifier-whiteandorange.svg'>

<span id='library-url'>http://pvd.library.jwu.edu</span>
</section>
  `
});



Vue.component('homepage-content', {
	props: ['datetext'],
	template: `
	<div class='display-item-wrapper'>
	<div id='homepage-item' class="display-item">
		<h2 style="grid-column:2/4;">Visit the Library Homepage</h2>

		<img style="grid-column:1/3;" src='static/homepage-view-desktop.png'>
		<img style="grid-column:3/4;" src='static/homepage-view-mobile.png'>
		<h4 style="grid-column:1/4;">You can</h4>

		<ul class='horizontal-list' style="grid-column:1/4;">
			<li>Find books and articles</li>
			<li>See our textbook collection</li>
			<li>Chat with a librarian</li>
			<li>Book a study room</li>
		</ul>


		<h3 style="grid-column:1/2;">http://pvd.library.jwu.edu/homepage </h3>
		<span style='grid-column:3/4'>
									<qriously value='http://pvd.library.jwu.edu/homepage'  :size="100"  /></span>


	</div>
	</div>
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


// Initialize
$(document).ready(function() {


});
