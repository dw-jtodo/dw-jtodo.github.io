var subscription = null;

window.addEventListener('load', function() {
  // register
  alert("register");
  navigator.serviceWorker.register('push.js').then(function() {
    if (Notification.permission == 'denied') return resetSubscription();
    
    // ready
    alert("ready");
    navigator.serviceWorker.ready.then(function(sw) {
      // subscribe
      alert("subscribe");
      sw.pushManager.subscribe().then(setSubscription, resetSubscription);
    }
  });
}, false);

function setSubscription(s) {
  alert("setSubscription");
  if (s) {
    var endpoint = s.endpoint;
    if (('subscriptionId' in s) && !s.endpoint.match(s.subscriptionId)) { // Chrome 43以前への対処
      endpoint += '/' + s.subscriptionId;
    }
    
    // 自分のWebアプリサーバ等にプッシュ通知を登録する処理をここに実装
    // endpointにプッシュサービスのエンドポイントのURLが格納される
    alert(endpoint);
    
    subscription = s;
  }
  else {
    resetSubscription();
  }
}

function resetSubscription() {
  alert("resetSubscription");
  subscription = null;
}
