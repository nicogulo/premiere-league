var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BIR8XXxm8AE3fkr263HRtq-M-RmhvG7V55nbLdOHXSy9JLTFZaYM5zxSoXLLedXBFwHrea5B2O2AzhWkhn9oCU4",
   "privateKey": "XZ0E3gau2Q-Zh4FcmWMVARqVBRo_Tir8wFJh1tli3fo"
};


webPush.setVapidDetails(
   'mailto:nicogulobelas@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/c9wZXqRk7R0:APA91bFKo3bPcoOz9_Milr6PGH_HpE3Vt1Do_d4NSS6rQ7QoGXXXIwI-e9Oihp_jCxYtE7tyk90rA4jLLDr3zsmel3AHJPbicxIpuLMcadkrxw1Yrko2thJ7j9Uz428NERa6K4DYgH7K",
   "keys": {
      "p256dh": "BC4jrQ89CsTVsLybhYcwcPZ2jaN296CDqr2ApaTVrNK1soMnXRjquNKOGIeKVv1B6YQ0he93DykUOBdIL12wUcI=",
      "auth": "vJDC7JZpprWKdP+X5/4YRw=="
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