var relation = relation || {};

!function() {

  relation.getServiceUrl = function(subdomain, prefix) {
    var url = 'https://' + subdomain + '.relationapp.jp/';
    return prefix ? (url + prefix) : url;
  };

}();
