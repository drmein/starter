function gethours() {
    var proxyurl = 'https://cors-anywhere.herokuapp.com/';
    var cat = document.createelement('div');
    url = 'https://api3.libcal.com/api_hours_today.php?iid=1433&lid=0&format=json&systemtime=0';
    fetch(proxyurl + url, {
            method: "get"
        }).then(function(response) {
            return response.json();

        })
        .then(function(text) {
            vm.outhours = text.locations

        });
};


// top level components
vue.component('structure-content', {
    props: {
        'divname': {
            default: 'generic-item'
        },
        'sectiontitle': {
            default: 'generic-section'
        },
        'externalurl': {
            default: 'genericurl'
        },
        'bulletitemlist': {
            default: ['good stuff']
        },
        'bulletitemtitle': {
            default: 'you can: '
        },
        qrurl: { default: '' },
        'imageobjlist': { default: {} },
        'featuredimage': { default: 'static/jwuseal.png' },
        'hasbullets': {
            default: true
        },
    },

    data() {
        return {}
    },
    computed: {
        imageobjs: function() {
            return _.samplesize(this.imageobjlist, [n = 3])
        },

        bulletitems: function() {
            return _.samplesize(this.bulletitemlist, [n = 4])
        }
    },
    template: `
              <div :id=divname class="display-item">

                <h2 style="grid-column: 1/9">{{sectiontitle}}</h2>

                    <imagelist-component :imagelist=imageobjlist>
                      </imagelist-component>
				<div class='featured-image'>
					<img :src=featuredimage>
				</div>
                <div v-if=hasbullets  class="bullet-list">
                <h4>{{bulletitemtitle}}</h4>

                <ul  class='horizontal-list'>
                <li v-for='item in bulletitems'>{{item}}</li>
                 </ul>

                </div>

                <callout-component :externalurl=qrurl style="grid-column: 1/9;">
                </callout-component>

            </div>
			  `

});

vue.component('display-header', function(resolve, reject) {
    settimeout(function() {
        resolve({
            props: ['hours'],

            data() {
                return {
                    inspirationmsgs: [
                        'you can do it!',
                        'today is a great day for research',
                        'have you talked to a librarian today?',
                        'we have hundreds of thousands of ebooks!'
                    ]

                }
            },
            computed: {
                welcomemsg: function() {
                    return _.sample(this.inspirationmsgs)
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
				   <div id='welcome-message'>{{welcomemsg}}</div>

				  </section>
			  `
        })
    }, 50)
});

vue.component('display-footer', {
    computed: {
        date: function() {
            var d = new date(_.now());
            return d.todatestring()
        }

    },
    template: `
	<section id='bottom-section'>
	  <div id='bottom-grey'>
	   <span id="date-time">{{date}}</span>
	  </div>
	  <div id='bottom-white'>
      <span>johnson & wales university library</span>
 		<img src='static/jwuseal_alt.png'>
	  </div>
	  </section>
  `
});

// page components

vue.component('homepage-content', {
    data() {
        return {
            sectiontitle: 'visit the library homepage',
            bulletitemlist: ['find books and articles', 'see our textbook collection', 'chat with a librarian', 'book a study room', 'learn how to research'],
            imageobjlist: [{
                    'imgpath': 'static/homepage-view-desktop.png',
                    'title': 'laptop',
                    'url': ''
                },
                {
                    'imgpath': 'static/homepage-view-mobile.png',
                    'title': 'mobile',
                    'url': ''
                },
                {
                    'imgpath': 'static/homepage-view-big-desktop.png',
                    'title': 'desktop',
                    'url': ''
                }
            ],
            qrurl: 'http://pvd.library.jwu.edu/homepage',
            divname: 'homepage-item',
            bullets: true
        }
    },

    template: `

	<structure-content :divname=divname :qrurl=qrurl :sectiontitle=sectiontitle :imageobjlist=imageobjlist :hasbullets=bullets :bulletitemlist=bulletitemlist >
  </structure-content>
	  `
});

vue.component('database-content', {
    data() {
        return {
            divname: 'databases-item',
            bullets: true,
            sectiontitle: 'check out our databases!',
            svgbullet: `
	 ---

			`,
            bulletitemlist: [
                'read case studies',
                'get company ratios',
                'read the new york times or wall street journals (as many articles as you like!)',
                'find scholarly articles',
                'read ebooks',
                'learn new tech skills',
                'find topics for persuasive essays'
            ],
            imageobjlist: [{
                    'imgpath': 'static/database-image-1.png',
                    'title': 'sage business cases',
                    'url': ''
                },
                {
                    'imgpath': 'static/database-image-2.png',
                    'title': 'ebook central',
                    'url': ''
                },
                {
                    'imgpath': 'static/database-image-3.png',
                    'title': 'lynda.com',
                    'url': ''
                },
                {
                    'imgpath': 'static/database-image-4.png',
                    'title': 'business source complete',
                    'url': ''
                }
            ],
            qrurl: 'http://pvd.library.jwu.edu/az.php'
        }
    },

    template: `

  <structure-content :divname=divname :qrurl=qrurl :sectiontitle=sectiontitle :imageobjlist=imageobjlist :hasbullets=bullets :bulletitemlist=bulletitemlist >
    </structure-content>
  `
});

vue.component('newbook-content', {
    data() {
        return {
            bullets: false,
            divname: 'newbooks-item',
            sectiontitle: 'new books in our collection',
            svgbullet: `	 ---		`,

            bulletitemlist: [
                'read case studies',
                'get company ratios',
                'read the new york times or wall street journals (as many articles as you like!)',
                'find scholarly articles',
                'read ebooks',
                'learn new tech skills',
                'find topics for persuasive essays'
            ],

            imageobjlist: [{
                    'imgpath': 'static/database-image-1.png',
                    'title': 'sage business cases',
                    'url': ''
                },
                {
                    'imgpath': 'static/database-image-2.png',
                    'title': 'ebook central',
                    'url': ''
                },
                {
                    'imgpath': 'static/database-image-3.png',
                    'title': 'lynda.com',
                    'url': ''
                },
                {
                    'imgpath': 'static/database-image-4.png',
                    'title': 'business source complete',
                    'url': ''
                }
            ],
            qrurl: 'http://pvd.library.jwu.edu/newbooks',
            lghtml: 'placeholder'
        }
    },
    computed: {
        imageobjs: function() {
            return _.samplesize(this.imageobjlist, [n = 3])
        },

        bulletitems: function() {
            return _.samplesize(this.bulletitemlist, [n = 4])
        }
    },

    template: `

  <structure-content :divname=divname :qrurl=qrurl :sectiontitle=sectiontitle :imageobjlist=imageobjlist :hasbullets=bullets :bulletitemlist=bulletitemlist >
  </structure-content>
  `
});

vue.component('librarian-content', {
    data() {
        return {
            sectiontitle: 'featured librarians',
            bullets: true,
            image: {},
            divname: 'librarian-item',
            bulletitemtitle: 'librarians can help you to: ',
            bulletitemlist: [
                'read case studies',
                'get company ratios',
                'read the new york times or wall street journals (as many articles as you like!)',
                'find scholarly articles',
                'learn new tech skills',
                'find topics for persuasive essays'
            ],

            qrurl: 'http://pvd.library.jwu.edu/az.php',
            lghtmlobjs: {},
            lghtml: 'placeholder',
            parsedhtml: {}
        }
    },
    watch: {
        lghtmlobjs: function() {
            console.log("changes");
            parsedlibrariancontent = parselgcontent(this.lghtmlobjs, 'librarian');
            this.parsedhtml = parsedlibrariancontent;
            this.image = parsedlibrariancontent.image.src;
        }
    },

    template: `
  <structure-content :divname=divname :qrurl=qrurl :sectiontitle=sectiontitle :imageobjlist=imageobjlist :hasbullets=bullets :bulletitemlist=bulletitemlist :bulletitemtitle=bulletitemtitle :featuredimage=image>

  </structure-content>

  `
});


// lower level components
vue.component('callout-component', {
    props: ['externalurl'],
    template: `
    <div class='callout'>
    <span>{{externalurl}} </span>
    <span>
            <qriously class='qr-code'  :value=externalurl  :size="100"  /></span>
            </div>
`
});

vue.component('imagelist-component', {
    props: ['imagelist'],
    template: `
    <div class="image-wrap">
	<div class='img-cards' v-for='item in imagelist'>
	<img  :src=item.imgpath>
	<p> {{item.title}} </p>
	</div>
	</div>
`
});


const vm = new vue({
    el: "#app",
    data() {
        return {
            message: "hello!",

            outhours: ''

        }
    },
    libraryname: {
        message: function() {
            console.log('changed')
        }
    },
    computed: {
        libraryname: function() {
            return _.sample(['downcity library', 'harborside library'])
        }

    }
});

//todo
function storegetcontent(content, container) {
    var el = document.createelement('div');
    el.innerhtml = content;
    parsedcontent = el.getelementsbyclassname('s-lib-box-content');
    vm.$refs[container].lghtmlobjs = parsedcontent;

};

function getlgcontent(url, container) {

    fetch(url, {
            method: "get"
        }).then(function(response, container) {

            return response.text();

        })
        .then(function(text) {
            storegetcontent(text, container);

        });

};

//todo: get lg content, and then parse into a json object
function bookparse(lgcontent) {
    return lgcontent;
}

function librarianparse(lgcontent) {
    parsed = lgcontent[0].children;
    parsed = _.sample(parsed);
    outobj = {};
    outobj['image'] = _.sample(parsed.queryselectorall('img'));
    outobj['text'] = _.sample(parsed.queryselectorall('p'));

    return outobj;
}


function parselgcontent(lgcontent, type) {

    switch (type) {
        case ('book'):
            parsed = bookparse(lgcontent);
            break;
        case ('librarian'):
            parsed = librarianparse(lgcontent);
            return parsed
        default:
            parsed = "fail";
            break


    }

}

var contentitems = ['databases-item', 'homepage-item', 'newbooks-item', 'librarian-item'];

function changecontent(contentitems) {
    document.queryselectorall
    //hide
    _.foreach(contentitems, function(item) {
        el = document.getelementbyid(item);
        el.style.display = 'none';
    });

    //show
    el = document.getelementbyid(_.sample(contentitems));
    el.style.display = '';

}

// initialize
$(document).ready(function() {

    changecontent(contentitems);

    gethours();
    // new book content get
    getlgcontent(
        'https://lgapi-us.libapps.com/widgets.php?site_id=538&widget_type=8&output_format=1&widget_embed_type=2&guide_id=731798&box_id=16491701&map_id=19425291&content_only=0&config_id=1510000840435',
        'newbookref');

    // get librarian content
    getlgcontent(
        'https://lgapi-us.libapps.com/widgets.php?site_id=538&widget_type=8&output_format=1&widget_embed_type=2&guide_id=731798&box_id=16571535&map_id=19518122&content_only=0&config_id=1510006276756',
        'librarianref');

    window.addeventlistener('keyup', function(event) {
        // if down arrow was pressed...
        if (event.keycode == 65) {
            changecontent(contentitems);
        }
    });

});