var serviceWorker = null;
var currentSubscription = null;

window.addEventListener('load', function() {
	document.getElementById('notify').addEventListener('click', clickNotify, false);
	document.getElementById('subscribe').addEventListener('click', clickSubscribe, false);
	
	// Ready
	navigator.serviceWorker.ready.then(function(sw) {
		if (Notification.permission == 'denied') {
			document.getElementById('subscribe').disabled = true;
			alert('プッシュ通知を有効にできません。ブラウザの設定を確認して下さい。');
			return;
		}
		
		if (typeof(sw) == "undefined" || sw == null) {
			// register
			navigator.serviceWorker.register('push.js').then(function(sw) {
				serviceWorker = sw;
			});
		}
		else {
			serviceWorker = sw;
			
			// subscribed
			serviceWorker.pushManager.getSubscription().then(function(s) {
				if (s) {
					setSubscription(s);
				}
				else {
					resetSubscription();
				}
			}, resetSubscription);
		}
	});
}, false);

function clickNotify() {
	if (!("Notification" in window)) {
		document.getElementById('notify').disabled = true;
		alert('通知を有効にできません。ブラウザの設定を確認して下さい。');
		return;
	}
	
	if (Notification.permission === "granted") {
		setNotify();
	}
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
			if (permission === "granted") {
				setNotify();
			}
		});
	}
}

function setNotify() {
	setTimeout(function() {
		var notification = new Notification("タイトルだよ",
                        {
                                body: 'メッセージだよ',
                                icon: 'https://yt3.ggpht.com/a-/AOh14GgwvbEYRnwsIUxGU1j9iMyPdw1IK7-sp5vrgQ=s68-c-k-c0x00ffffff-no-rj-mo',
                                image: 'https://i.ytimg.com/vi/9CTbic4nju4/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCubvCmoqmzz8ZWVnQSBUNmwAYBXg'
                        }
                );
		notification.addEventListener('click', function() {
			window.focus();
		});
	}, 3000);
}

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
	var endpoint = subscription.endpoint + '/' + subscription.subscriptionId;
	
	// 自分のWebアプリサーバ等にプッシュ通知を登録する処理をここに実装
	// endpointにプッシュサービスのエンドポイントのURLが格納される
	
	document.getElementById('subscribe').textContent = '購読を解除する';
	document.getElementById('subscribeId').textContent = '購読ID: '+ endpoint;
	
	currentSubscription = subscription;
}

function resetSubscription() {
	document.getElementById('subscribe').textContent = '購読する';
	document.getElementById('subscribeId').textContent = '';
	
	currentSubscription = null;
}
