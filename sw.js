// Service worker: Android Chrome က notification ကို service worker ကနေပဲ ပြခွင့်ပေးလို့ လိုအပ်တယ်
// index.html / admin.html နဲ့ တူညီတဲ့ folder ထဲမှာ ထားပါ
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const url=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil((async()=>{
    const cs=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const c of cs){if('focus' in c){await c.focus();return}}
    await self.clients.openWindow(url);
  })());
});
