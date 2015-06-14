var serviceWorker = null;
var currentSubscription = null;

window.addEventListener('load', function() {
	document.getElementById('subscribe').addEventListener('click', clickSubscribe, false);
	
	// register
	navigator.serviceWorker.register('push.js').then(function(sw) {
		if (Notification.permission == 'denied') {
			alert('プッシュ通知を有効にできません。ブラウザの設定を確認して下さい。');
			return;
		}
		
		document.getElementById('subscribe').disabled = false;
		
		serviceWorker = sw;
	});
}, false);

function clickSubscribe() {
	if (currentSubscription == null) {
		// subscribe
		serviceWorker.pushManager.subscribe().then(function(s) {
			if (s) {
				setSubscription(s);
			}
			else {
				resetSubscription();
			}
		}, resetSubscription);
	}
	else {
		// unsubscribe
		currentSubscription.unsubscribe();
		resetSubscription();
	}
}

function setSubscription(subscription) {
	document.getElementById('subscribe').textContent = '購読を解除する';
	
	var endpoint = subscription.endpoint + '/' + subscription.subscriptionId;
	
	// 自分のWebアプリサーバ等にプッシュ通知を登録する処理をここに実装
	// endpointにプッシュサービスのエンドポイントのURLが格納される
	console.log(endpoint);
	
	currentSubscription = subscription;
}

function re
setSubscription() {
	document.getElementById('subscribe').textContent = '購読する';
	
	currentSubscription = null;
}
