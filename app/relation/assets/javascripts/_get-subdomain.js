var relation = relation || {};

!function() {

  relation.getSubdomain = function() {
    var key = encodeURIComponent('subdomain');
    var subdomain = '';
    if (window.localStorage) {
      subdomain = window.localStorage.getItem(key);
    }
    if (!subdomain && document.cookie) {
      subdomain = decodeURIComponent(
        document.cookie.replace(
          new RegExp('(?:(?:^|.*;)\\s*' + key.replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1'
        )
      );
    }
    return subdomain;
  };

}();
