var relation = relation || {};

!function($) {

  relation.moveService = function(url) {
    // subdomain の存在チェック
    $.support.cors = true;
    return $.ajax({ url: url, method: 'GET' })
      .success(function(){ location.href = url; });
  };

}(jQuery);
