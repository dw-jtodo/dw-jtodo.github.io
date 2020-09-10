self.addEventListener('push', function(evt) {
  evt.waitUntil(
    self.registration.showNotification(
      '新着メッセージがありますよ！',
      {
        body: 'クリックしてね！？',
        tag: 'push_test'
      }
    )
  );
}, false);

self.addEventListener('notificationclick', function(evt) {
  evt.notification.close();
  
  evt.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(matchedClients) {
      var p = location.pathname.split('/');
      p.pop();
      
      var url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + p.join('/') + '/';
      
      for (var i = 0 ; i < matchedClients.length ; i++) {
        var c = matchedClients[i];
        
        console.log(c.url);
        if (((c.url == url) || (c.url == url + 'index.html')) && ('focus' in c)) {
          return c.focus();
        }
      }
      
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
}, false);
