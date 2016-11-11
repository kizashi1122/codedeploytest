var relation = relation || {};

//---------------------------
// Common
//---------------------------
$(document).ready(function() {
  var $menu    = $('.navbar__menu');
  var $menuBtn = $('.navbar__button');

  // メニューボタン表示
  $('body').on('click.close-menu', function() {
    $menu.removeClass('open');
  });
  $menu.on('click', function(event) {
    event.stopPropagation();
  });
  $menuBtn.on('click', function(event) {
    event.stopPropagation();
    $menu.toggleClass('open');
  });

  // ヘッダーの固定化
  var $window = $(window);
  var $navHeader = $('#navbar');
  $window.on('scroll.contents-nav', function() {
    var scrollTop = $window.scrollTop();
    if (scrollTop >= 40) {
      $navHeader.addClass('fixed');
    } else {
      $navHeader.removeClass('fixed');
    }
  });
  $window.trigger('scroll.contents-nav');


  // ログインボタン表示
  var $login = $('#login');
  // 開いた時にサブドメインがある場合は「サービスへ」に文言変更
  var subdomain = relation.getSubdomain();
  if (subdomain) {
    $login.text('サービスへ');
  }

  $login.on('click', function() {
    var url;
    var subdomain = relation.getSubdomain();

    if (subdomain) {
      url = relation.getServiceUrl(subdomain);
    } else {
      url = 'relation/login';
    }
    location.href = url;
  });

  //
  // カルーセル
  //
  // carousel-top
  var $topCarousel = $('.carousel.carousel-top');
  if ($topCarousel.length > 0) {
    relation.carouselTop($topCarousel);
  }
  // carousel-interview
  var $interviewCarousel = $('.carousel.carousel-interview');
  if ($interviewCarousel.length > 0) {
    relation.carouselInterview($interviewCarousel);
  }
  // carousel-functions
  var $functionsCarousel = $('.carousel.carousel-functions');
  if ($functionsCarousel.length > 0) {
    relation.carouselFunctions($functionsCarousel);
  }

  // 代理店パラメータの設定
  $('a').each(function(idx, element) {
    var href = element.href;
    var uri = URI(href);
    var host = uri.host();
    var q = location.search;

    if (host === 'localhost:8000' ||
        host === 'ingage.github.io' ||
        host === 'ingage.jp') {
      // path の 最後の slash を補完しないため、自前で link を生成
      // uri.href() --> ingage.jp/relation?d=1 になってしまう
      // この場合、 s3 では 302 redirect されて parameter が消えてしまう
      uri = uri.query(q);
      var link = uri.origin() + uri.path();
      link += (link.indexOf('/', link.length - 1) > 0) ? '' : '/';
      link += uri.query() ? ('?' + uri.query()) : '';
      link += uri.hash();
      $(element).attr('href', link);
    }
  });
});


//---------------------------
// index.html
//---------------------------
$(document).ready(function() {

  // メニューによる移動
  if ($('#top').length > 0) {
    var $navMenu = $('.contents__nav__menu');
    $navMenu.singlePageNav({
      offset: $navMenu.outerHeight(),
      filter: '.anchor'
    });
  }

});


//---------------------------
// login.html
//---------------------------
$(document).ready(function() {

  var $form = $('#move-relationapp');
  if ($form.length > 0) {
    $form.on('submit', function(event) {
      event.preventDefault();

      var subdomain = $form.find('input[name="subdomain"]').val();
      var url = relation.getServiceUrl(subdomain, 'login');
      relation
        .moveService(url)
        .error(function(data){
          $('.contents-alert').removeClass('hidden');
          console.log('data: ' + JSON.stringify(data));
        });
    });
  }
});


//---------------------------
// plans.html
//---------------------------
$(document).ready(function() {

  // メニューによる移動
  var $plansTable = $('#plans-table');
  if ($plansTable.length > 0) {
    var $wrapper = $plansTable.find('.contents-wrapper');
    var $header = $plansTable.find('.contents.table-header');

    var plans = ['free', 'light', 'standard', 'premium', 'enterprise'];
    plans.forEach(function(plan) {
      $header.on('click', '.contents__' + plan, function() {
        plans.forEach(function(p) { $wrapper.removeClass('contents-wrapper__' + p); });
        $wrapper.addClass('contents-wrapper__' + plan);

        if (plan === 'enterprise') {
          $('.contents.contents-enterprise').removeClass('hidden');
          $('.contents.contents-annotate').addClass('hidden');
        } else {
          $('.contents.contents-enterprise').addClass('hidden');
          $('.contents.contents-annotate').removeClass('hidden');
        }
      });
    });
  }

});
