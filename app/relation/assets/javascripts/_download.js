var relation = relation || {};

!function($) {

  // Download 処理
  // (代理店パラメータ設定の関係で href の最後に / が入るため)
  relation.download = function(url) {
    window.open(url);
  };

}(jQuery);
