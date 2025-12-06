/*
  = MAP
  = Preloader
  = Full Screen Slider
  = Typing Text JS
  = Sticky Menu
  = Back To Top
  = Countup
  = Progress Bar
  = More skill
  = Shuffle
  = Magnific Popup
*/

/* ---------------------------------------------- /*
  * MAP
/* ---------------------------------------------- */

var mymap = L.map('mapCanvas').setView([43.833328, -0.56667], 9);

L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 1,
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var marqueur = L.marker([45.139429, -0.446113]).addTo(mymap);
marqueur.bindPopup("<p>"+ 'Saint-Savin '+"</p>").openPopup();
var circle = L.circle([44.838180, -0.57900], {
  color: 'rgba(255, 0, 0, 0.7)',
  fillColor: '#f03',
  fillOpacity: 0.35,
  radius: 12000
}).addTo(mymap);


jQuery(function ($) {
  'use strict';

  /* ---------------------------------------------- /*
    * Preloader
  /* ---------------------------------------------- */

  $(window).ready(function() {
    $('#pre-status').fadeOut();
    $('#tt-preloader').delay(350).fadeOut('slow');
  });

  // -------------------------------------------------------------
  // Full Screen Slider
  // -------------------------------------------------------------
  (function () {
    $(".tt-fullHeight").height($(window).height());
    $(window).resize(function(){
      $(".tt-fullHeight").height($(window).height());
    });
  }());

  // -------------------------------------------------------------
  // Typing Text JS
  // -------------------------------------------------------------
  // get the element
  const text = document.querySelector('.typing-text-js');

  // make a words array
  const words = [
    "Applicatif",
    "Web"
  ];

  // start typing effect
  setTyper(text, words);

  function setTyper(element, words) {
    const LETTER_TYPE_DELAY = 75;
    const WORD_STAY_DELAY = 2000;

    const DIRECTION_FORWARDS = 0;
    const DIRECTION_BACKWARDS = 1;

    var direction = DIRECTION_FORWARDS;
    var wordIndex = 0;
    var letterIndex = 0;

    var wordTypeInterval;

    startTyping();

    function startTyping() {
      wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);
    }

    function typeLetter() {
      const word = words[wordIndex];

      if (direction == DIRECTION_FORWARDS) {
      letterIndex++;

        if (letterIndex == word.length) {
          direction = DIRECTION_BACKWARDS;
          clearInterval(wordTypeInterval);
          setTimeout(startTyping, WORD_STAY_DELAY);
        }
      }
      else if (direction == DIRECTION_BACKWARDS) {
      letterIndex--;

        if (letterIndex == 0) {
          nextWord();
        }
      }

      const textToType = word.substring(0, letterIndex);
      element.textContent = textToType;
    }

    function nextWord() {
      letterIndex = 0;
      direction = DIRECTION_FORWARDS;
      wordIndex++;

      if (wordIndex == words.length) {
        wordIndex = 0;
      }
    }
  }

  // -------------------------------------------------------------
  // Sticky Menu
  // -------------------------------------------------------------
  (function () {
    $('.header').sticky({
      topSpacing: 0
    });
    $('body').scrollspy({
      target: '.navbar-custom',
      offset: 70
    })
  }());

  // -------------------------------------------------------------
  // Back To Top
  // -------------------------------------------------------------
  (function () {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.scroll-up').fadeIn();
      }
      else {
        $('.scroll-up').fadeOut();
      }
    });
  }());

  // -------------------------------------------------------------
  // Countup
  // -------------------------------------------------------------
  $('.count-wrap').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      $(this).find('.timer').each(function () {
        var $this = $(this);

        var $parentBlock = $this.closest('.fill-hover');

        if (!$this.data('target')) {
          $this.data('target', $this.text());
        }

        var targetVal = $this.data('target');

        $this.stop();

        $({ Counter: 0 }).animate({ Counter: targetVal }, {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.text(Math.ceil(this.Counter));
          },
          complete: function() {
            $this.text(targetVal);
            $parentBlock.addClass('active-orange');
            $this.addClass('timer-pop');
            setTimeout(function() {
              $this.removeClass('timer-pop');
            }, 500);
          }
        });
      });
    }
    else {
      $(this).find('.timer').each(function () {
        var $this = $(this);
        var $parentBlock = $this.closest('.fill-hover');
        $this.stop();
        $parentBlock.removeClass('active-orange');
        $this.removeClass('timer-pop');
        $this.text('0');
      });
    }
  });

  // -------------------------------------------------------------
  // Progress Bar
  // -------------------------------------------------------------
  $('.skill-progress').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      $.each($('div.progress-bar'),function(){
        $(this).css('width', $(this).attr('aria-valuenow')+'%');
      });
      $(this).unbind('inview');
    }
  });

  // -------------------------------------------------------------
  // More skills ("Crazy" version)
  // -------------------------------------------------------------
  $('.more-skills').bind('inview', function(event, visible) {
    if (visible) {
      $('.chart').each(function() {
        var $chart = $(this);

        if ($chart.data('isAnimating')) return;

        var myTarget = $chart.data('percent');
        var animSpeed = (myTarget == 200) ? 2000 : 500;

        $chart.easyPieChart({
          barColor: '#68c3a3',
          trackColor: '#eee',
          scaleColor: false,
          lineWidth: 10,
          size: 140,
          animate: animSpeed,
          onStep: function(from, to, percent) {
            if (isNaN(percent)) percent = 0;

            if ($chart.data('percent') == 200) {
              $chart.find('.percent').text(Math.round(percent * 2));
            }
            else {
              $chart.find('.percent').text(Math.round(percent));
            }
          },
          onStop: function(from, to) {
            if (to === 100 && $chart.data('percent') == 200) {
              $chart.find('.percent, .chart-text').addClass('pulse-orange-active');
              $chart.find('canvas').addClass('canvas-zoom-active');

              var api = $chart.data('easyPieChart');
              if (api) {
                api.options.barColor = '#f39c12';
                api.update(100);
              }
            }
          }
        });

        var api = $chart.data('easyPieChart');

        // ==========================================
        // MOTIVATION Usecase (200%)
        // ==========================================
        if (myTarget == 200) {
          api.update(0);
          setTimeout(function() {
            api.update(100);
          }, 100);
        }

        // ==========================================
        // SOFT SKILLS (Crazy Mode)
        // ==========================================
        else {
          api.update(0);
          setTimeout(function() {
            api.update(100);
          }, 100);

          $chart.data('moveCount', 0);

          var timer = setInterval(function() {
            if (!$chart.data('isAnimating')) {
              clearInterval(timer);
              return;
            }

            var currentCount = $chart.data('moveCount') + 1;
            $chart.data('moveCount', currentCount);

            var $percentText = $chart.find('.percent');
            var nextValue;

            if (currentCount === 4) {
              $percentText.addClass('pulse-green-active');
              nextValue = 100
            }
            else if (currentCount === 5) {
              $percentText.removeClass('pulse-green-active');
              $chart.data('moveCount', 0);
              nextValue = Math.floor(Math.random() * 65) + 35;
            }
            else {
              nextValue = Math.floor(Math.random() * 65) + 35;
            }

            if ($chart.data('easyPieChart')) {
              $chart.data('easyPieChart').update(nextValue);
            }
          }, 1200);

          $chart.data('crazyTimer', timer);
        }
      });
    }
    // ==========================================
    // RESET TOTAL (When out of view)
    // ==========================================
    else {
      $('.chart').each(function() {
        var $chart = $(this);

        if ($chart.data('crazyTimer')) {
          clearInterval($chart.data('crazyTimer'));
          $this.removeData('crazyTimer');
        }

        $chart.find('.percent').text('0');
        $chart.find('.percent, .chart-text').removeClass('pulse-green-active pulse-orange-active');
        $chart.find('canvas').removeClass('canvas-zoom-active');

        $chart.removeData('easyPieChart');
        $chart.find('canvas').remove();
      });
    }
  });

  // -------------------------------------------------------------
  // Shuffle
  // -------------------------------------------------------------
  (function () {
    var $grid = $('#grid');

    $grid.shuffle({
        itemSelector: '.portfolio-item'
    });

    /* reshuffle when user clicks a filter item */
    $('#filter a').click(function (e) {
      e.preventDefault();

      // set active class
      $('#filter a').removeClass('active');
      $(this).addClass('active');

      // get group name from clicked item
      var groupName = $(this).attr('data-group');

      // reshuffle grid
      $grid.shuffle('shuffle', groupName );
    });
  }());

  // -------------------------------------------------------------
  // Magnific Popup
  // -------------------------------------------------------------
  (function () {
    $('.image-link').magnificPopup({
      gallery: {
        enabled: true
      },
      removalDelay: 300, // Delay in milliseconds before popup is removed
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      type:'image'
    });
  }());

  (function () {
    $('.popup-video').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-with-zoom',
      removalDelay: 300,
      preloader: false,
      fixedContentPos: false
    });
  }());

  // -------------------------------------------------------------
  // STELLAR FOR BACKGROUND SCROLLING
  // -------------------------------------------------------------
  $(window).load(function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {}
    else {
      $.stellar({
        horizontalScrolling: false,
        responsive: true
      });
    }
  });

  // -------------------------------------------------------------
  // WOW JS
  // -------------------------------------------------------------
  (function () {
    new WOW({
      mobile:  false
    }).init();
  }());

  // -------------------------------------------------------------
  // Contact Form
  // -------------------------------------------------------------
  $('#contactForm').on('submit',function(e){
    e.preventDefault();

    var $action = $(this).prop('action');
    var $data = $(this).serialize();
    var $this = $(this);

    $this.prevAll('.alert').remove();

    $.post( $action, $data, function( data ) {
      if( data.response=='error' ){
        $this.before( '<div class="alert alert-danger">'+data.message+'</div>' );
      }

      if( data.response=='success' ){
        $this.before( '<div class="alert alert-success">'+data.message+'</div>' );
        $this.find('input, textarea').val('');
      }
    }, "json");
  });
});
