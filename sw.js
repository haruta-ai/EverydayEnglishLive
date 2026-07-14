const CACHE = "eel-v0.3";
const FILES = [
  "./", "./index.html", "./style.css?v=030", "./script.js?v=030",
  "./manifest.webmanifest", "./mike-neutral.jpg?v=022", "./mike-happy.jpg?v=022",
  "./mike-thinking.jpg?v=022", "./sophie-neutral.jpg?v=022",
  "./sophie-happy.jpg?v=022", "./sophie-thinking.jpg?v=022",
  "./icon-192.png", "./icon-512.png"
];
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
