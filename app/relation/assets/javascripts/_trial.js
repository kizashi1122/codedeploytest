var relation = relation || {};

//---------------------------
// Common
//---------------------------
$(document).ready(function() {

  relation.top = function() {
    $('body').animate({scrollTop: 0}, 600, 'swing');
    return false;
  };

  relation.trial = function() {
    var uri = URI(location.href);
    var qHash = uri.query(true);

    if (qHash.d && qHash.d === '1') {
      // starx
      location.href = 'http://ingage.co.jp/?page_id=1470';
    } else {
      // ingage
      location.href = 'http://ingage.co.jp/?page_id=872';
    }
  };

  relation.request = function() {
    var uri = URI(location.href);
    var qHash = uri.query(true);

    if (qHash.d && qHash.d === '1') {
      // starx
      location.href = 'http://ingage.co.jp/?page_id=1466';
    } else {
      // ingage
      location.href = 'http://ingage.co.jp/?page_id=1016';
    }
  };

});
