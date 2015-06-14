self.addEventListener('push', function(evt) {
  evt.waitUntil(
    self.registration.showNotification(
      '新着メッセージがありますよ！',
      {
        body: 'クリックしてね！',
        tag: 'push_test'
      }
    )
  );
}, false);

self.addEventListener('notificationclick', function(evt) {
  evt.notification.close();
  
  evt.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(matchedClients) {
      console.log(location.pathname);
      var p = location.pathname.split('/');
      p.pop();
      p = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + p.join('/') + '/';
      console.log(p);
      
      for (var i = 0 ; i < matchedClients.length ; i++) {
        var c = matchedClients[i];
        
        if (((c.url == p) || (c.url == p + 'index.html')) && ('focus' in c)) {
          return c.focus();
        }
      }
      
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
}, false);
