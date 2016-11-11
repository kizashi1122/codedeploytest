var relation = relation || {};

!function($) {

  relation.carouselTop = function($carousel) {
    $carousel.slick({
      // 画像下のドット（ページ送り）を表示
      dots: true,
      // 左右の次へ、前へボタンを表示するかどうか
      arrows: true,
      // 無限スクロールにするかどうか。最後の画像の次は最初の画像が表示される。
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true,
      responsive: [
        { breakpoint: 1024, settings: { arrows: false } }
      ]
    });
  };


  relation.carouselInterview = function($carousel) {
    $carousel.slick({
      // 画像下のドット（ページ送り）を表示
      dots: false,
      // 左右の次へ、前へボタンを表示するかどうか
      arrows: true,
      // 無限スクロールにするかどうか。最後の画像の次は最初の画像が表示される。
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      adaptiveHeight: true,
      centerMode: true,
      centerPadding: '120px',
      responsive: [
        { breakpoint: 1024,  settings: { slidesToShow: 1, centerPadding: '0' } }
      ]
    });
  };


  relation.carouselFunctions = function($carousel) {
    $carousel.slick({
      // 画像下のドット（ページ送り）を表示
      dots: false,
      // 左右の次へ、前へボタンを表示するかどうか
      arrows: true,
      // 無限スクロールにするかどうか。最後の画像の次は最初の画像が表示される。
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      adaptiveHeight: true,
      centerMode: true,
      centerPadding: '120px',
      responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 2 } },
        { breakpoint: 950,  settings: { slidesToShow: 1 } },
        { breakpoint: 630,  settings: { slidesToShow: 1, centerPadding: '0' } }
      ]
    });
  };

}(jQuery);
