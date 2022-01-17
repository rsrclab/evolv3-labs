/**
 * This is script for index page
 */

(function ($) {

  $(document).ready(function () {

    $('.hamburger').on('click', function () {
      $(this).toggleClass('open');
      $('.header-menu').toggleClass('open');
      $('.header-overlay').fadeToggle();
    });

    $('.footer-menu__trigger').on('click', function () {
      $('.footer-menu').toggleClass('open');
    });

    $('.section.slider .slider-holder').on('init', function(slick){
      setTimeout(() => {
        $('.slide-bg[slide-anchor="0"]').addClass('shown');
      }, 1000);
    });

    $('.section.slider .slider-holder').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      dots: true,
      centerMode: true,
      fade: true,
      pauseOnHover: false,
    });
    $('.section.slider .slider-holder').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $('.slide-bg').removeClass('shown');
      $('.slide-bg[slide-anchor=' + nextSlide + ']').addClass('shown');
    });

    var myFullPage = $('#fullpage').fullpage({
      anchors: ['intro', 'portfolio', 'life', 'mission', 'sev', 'fund', 'team'],
      menu: '#menu',
      scrollingSpeed: 1000,
      onLeave: function (origin, destination, direction) {
        var leavingSection = this;

        // Handling Menu and Logo positions
        if (origin.index == 0 && direction == 'down') {
          $('.header-nav').fadeIn();
        }
        else if (origin.index == 1 && direction == 'up') {
          $('.header-nav').fadeOut();
        }

        // Handling background
        if (destination.anchor) {
          $('.page-bg .section-bg[bg-anchor=' + destination.anchor + ']').addClass('active');
          $('.page-bg .section-bg:not([bg-anchor=' + destination.anchor + '])').removeClass('active');
        }
        $('.section[data-anchor=' + origin.anchor + '] .inner-section').fadeOut(500, 'swing');

        setTimeout((target) => {
          $('.section[data-anchor=' + target + '] .inner-section').fadeIn(500, 'swing');
        }, 500, destination.anchor);
        
        if ( $('.section[data-anchor=' + destination.anchor + '] .slide-bgs').length ) {
          $('.section[data-anchor=' + destination.anchor + '] .slide-bgs').addClass('shown');
        } else {
          $('.slide-bgs').removeClass('shown');
        }
      },
      afterLoad: function (origin, destination, direction) {
        $('.section.slider .slider-holder').slick('setPosition');
        $('.section.slider .slider-holder').addClass('shown');
      },
    });

    fullpage_api.silentMoveTo(1);
    fullpage_api.setAllowScrolling(false);

    // Loading
    setTimeout(() => {
      $('.section.starting .text-block.animating').removeClass('animating');
      $('.header').addClass('shown');
      $('.footer').addClass('shown');
    }, 2500);
    setTimeout(() => {
      $('.section.starting .inner-section').addClass('loaded');
      fullpage_api.setAllowScrolling(true);
    }, 3000);

  });
  console.log(1);
})(jQuery);

var canvas, ctx, max, p, count;

window.onload = function () {
  var a, b, r;
  canvas = document.getElementsByTagName('canvas')[0];
  ctx = canvas.getContext('2d');
  canvas.width = canvas.height = 400;
  ctx.fillRect(0, 0, 400, 400);
  max = 80;
  count = 150;
  p = [];
  r = 0;
  for (a = 0; a < max; a++) {
    p.push([Math.cos(r), Math.sin(r), 0]);
    r += Math.PI * 2 / max;
  }
  for (a = 0; a < max; a++)p.push([0, p[a][0], p[a][1]]);
  for (a = 0; a < max; a++)p.push([p[a][1], 0, p[a][0]]);
  rus();
  console.log(2);
};

function rus() {
  var a, b, c, d, e, s, tim, p2, xp, yp, xp2, yp2, x, y, z, x1, y1, z1;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(0,0,0,0.03)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";
  tim = count / 5;
  for (e = 0; e < 3; e++) {
    tim *= 1.7;
    s = 1 - e / 3;
    a = tim / 59;
    yp = Math.cos(a);
    yp2 = Math.sin(a);
    a = tim / 23;
    xp = Math.cos(a);
    xp2 = Math.sin(a);
    p2 = [];
    for (a = 0; a < p.length; a++) {
      x = p[a][0]; y = p[a][1]; z = p[a][2];
      y1 = y * yp + z * yp2;
      z1 = y * yp2 - z * yp;
      x1 = x * xp + z1 * xp2;
      z = x * xp2 - z1 * xp;
      z1 = Math.pow(2, z * s);
      x = x1 * z1;
      y = y1 * z1;
      p2.push([x, y, z]);
    }

    s *= 120;
    for (d = 0; d < 3; d++) {
      for (a = 0; a < max; a++) {
        b = p2[d * max + a];
        c = p2[((a + 1) % max) + d * max];
        ctx.beginPath();
        ctx.strokeStyle = "hsla(" + ((a / max * 360) | 0) + ",70%,60%,0.15)";
        ctx.lineWidth = Math.pow(6, b[2]);
        ctx.lineTo(b[0] * s + 200, b[1] * s + 200);
        ctx.lineTo(c[0] * s + 200, c[1] * s + 200);
        ctx.stroke();
      }
    }
  }
  count++;
  requestAnimationFrame(rus);
}
