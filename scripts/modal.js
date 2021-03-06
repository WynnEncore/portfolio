
$(document).ready(function(){

  // MODAL
  var modalText = {
    sjsr: {
      title: 'St-Jean-sur-Richelieu.net',
      tag: '2001 - 2008. Local Portal.',
      detail: 'My First PUBLIC dynamic web site. Business owners could advertise their own business in the directory. Small league register their game schedules, results and the stats would display automaticly in real time. More than 1 000 000 hits thru the years, never failed',
    },
    mbt: {
      title: 'Mon Beau Tresor.com',
      tag: '2014 - 2015. WordPress Online Store using WooCommerce',
      detail: 'Everything for new borns to toddler. SHop OnLine. (No more running business)',
    },
    picsou: {
      title: 'Picsou.ca',
      tag: '2010 - 2011. Penny Auctions',
      detail: 'This site ran in 2010-2011 using PHP and mainly Ajax. A lot of work to prevent DDO Attack since this application was time sensitive. This project was stopped after running for 6 months.',
    },
    aquaspa: {
      title: 'Aqua Spa',
      tag: '2006 - 2015. Services',
      detail: 'Massage and esthetic cares center. Plain HTML, CSS and some transactional parts using PayPal to sell gift certificate. Convert into a WordPress site in 2015.',
    },
    oic: {
      title: 'Online Incomes Club',
      tag: '2014 - 2016. Ads and banner referencement.',
      detail: 'Build under WordPress but using almost exclusively PHP and shorcodes to provide more control and flexibility. Extensive Back Office programming.',
    },
    themall: {
      title: 'The Mall',
      tag: 'PEER GUIDED SHOPPING.',
      detail: 'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.',
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart,
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)');
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)');
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });

    });
  }
})
