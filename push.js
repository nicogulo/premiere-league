var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BJ32GNXOBsid8KCqPIO9nfPItlkGLO1q3-hxqhhHycUft4Ec-OBs4ZricVCAMgmnMLS-KzR9x5jDOD1s_IJGJpg",
   "privateKey": "fNLOrEQuTwUvBffnEXFfO_Wx9e7DL_ukI1CVt_KzCHI"
};


webPush.setVapidDetails(
   'mailto:nicogulobelas@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fK6fKbpJumo:APA91bHnTe7VEOg4Gs5l3Bk5Cm3Rk6YFNECPUhmUxAD1CMYr3DrPF53I3NmflTvRFe3LTmXlLTTtMpr7JgjgMJvxZPW6WIvr-WQxL2-xcBX84JxFme92k2jwOgzur1tTaGQv6DwfJhBT",
   "keys": {
      "p256dh": "BJU+CPjdlZl+wf2OY1HU/6LkRzpjYlkoXfdWtO+oTohzAQutnK72FqEmhMTWqPnGvsXFJsiH78e08qO6LCjpnpk=",
      "auth": "uVv0LI7REwb13RbwTWQVyg=="
   }
};
var payload = 'Selamat datang di aplikasi sepak bola LaLiga!';

var options = {
   gcmAPIKey: '159777244623',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);