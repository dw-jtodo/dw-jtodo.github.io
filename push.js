self.addEventListener('push', function(evt) {
  evt.waitUntil(
    self.registration.showNotification(
      '新着メッセージがありますよ！',
      {
        body: 'クリックしてね！？',
        tag: 'push_test',
        icon: 'https://yt3.ggpht.com/a-/AOh14GgwvbEYRnwsIUxGU1j9iMyPdw1IK7-sp5vrgQ=s68-c-k-c0x00ffffff-no-rj-mo',
        image: 'https://i.ytimg.com/vi/9CTbic4nju4/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCubvCmoqmzz8ZWVnQSBUNmwAYBXg'
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
