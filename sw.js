
const CACHE = "eel-v0.2";
const FILES = [
  "./", "./index.html", "./style.css", "./script.js", "./manifest.webmanifest",
  "./assets/mike-square-glasses.jpg", "./assets/sophie-square-glasses.jpg",
  "./assets/icon-192.png", "./assets/icon-512.png"
];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener("activate", event => event.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
));
self.addEventListener("fetch", event => event.respondWith(
  fetch(event.request).catch(() => caches.match(event.request))
));
