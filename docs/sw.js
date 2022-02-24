/// <reference lib="webworker" />

/* Espera 11 minutos después de hacer los cambios en tu sitio, para depués
 * actualizar este archivo. */

const CACHE = "cache"

const VERSION = "1.1"

const ARCHIVOS = [
  "/favicon.ico",
   "/img/icono/160x30.png",
   "/img/icono/160x30.webp",
   "/img/icono/80x15.png",
   "/img/icono/icono2048.png",
   "/img/icono/maskable_icon.png",
   "/img/icono/maskable_icon_x128.png",
   "/img/icono/maskable_icon_x192.png",
   "/img/icono/maskable_icon_x384.png",
   "/img/icono/maskable_icon_x48.png",
   "/img/icono/maskable_icon_x512.png",
   "/img/icono/maskable_icon_x72.png",
   "/img/icono/maskable_icon_x96.png",
   "/img/m02elementos/color.gif",
   "/img/m02elementos/continuidad.jpg",
   "/img/m02elementos/contraste.jpg",
   "/img/m02elementos/formas.png",
   "/img/m02elementos/iloveyou.jpg",
   "/img/m02elementos/Imagen.jpg",
   "/img/m02elementos/pexels-erik-mclean-4365459.jpg",
   "/img/m02elementos/pexels-evie-shaffer-2395255.jpg",
   "/img/m02elementos/pexels-valeriia-miller-2530912.jpg",
   "/img/m02elementos/pregnancia.png",
   "/img/m02elementos/proximidad.jpg",
   "/img/m02elementos/psicol.jpg",
   "/img/m02elementos/semejanza.png",
   "/img/m03fases/like.svg",
   "/img/m03fases/presentacion1.svg",
   "/img/m03fases/presentacion2.svg",
   "/img/m03fases/presentacion3.svg",
   "/img/m03fases/produccion.svg",
   "/img/m03fases/producto.svg",
   "/img/m05derechos/creative1.jpg",
   "/img/m05derechos/creative2.jpg",
   "/img/m05derechos/derechos.jpg",
   "/img/m05derechos/indautor.png",
   "/",
   "/index.html",
   "/js/muestra-codigo.js",
   "/m01conceptos/",
   "/m01conceptos/index.html",
   "/m01conceptos/mAintroDisGraf.html",
   "/m01conceptos/mBdisGraf.html",
   "/m01conceptos/mCfunsDisGraf.html",
   "/m01conceptos/mDapsDisGraf.html",
   "/m01conceptos/mEintroCreat.html",
   "/m01conceptos/mFcreat.html",
   "/m01conceptos/mGfunCreat.html",
   "/m01conceptos/mHapsCreat.html",
   "/m01conceptos/print.html",
   "/m02elementos/",
   "/m02elementos/index.html",
   "/m02elementos/mAtexto.html",
   "/m02elementos/mBformas.html",
   "/m02elementos/mCcolor.html",
   "/m02elementos/mDimagen.html",
   "/m02elementos/mEfigura.html",
   "/m02elementos/mFfondo.html",
   "/m02elementos/mGpregnancia.html",
   "/m02elementos/mHsimplicidad.html",
   "/m02elementos/mIproximidad.html",
   "/m02elementos/mJsemejanza.html",
   "/m02elementos/mKcontraste.html",
   "/m02elementos/mLcontinuidad.html",
   "/m02elementos/mMpsiColor.html",
   "/m02elementos/print.html",
   "/m03fases/",
   "/m03fases/index.html",
   "/m03fases/mAfases.html",
   "/m03fases/mBanalitica.html",
   "/m03fases/mCdefinicion.html",
   "/m03fases/mDplan.html",
   "/m03fases/mElistado.html",
   "/m03fases/mFcreativa.html",
   "/m03fases/mGanalisis.html",
   "/m03fases/mHbocetaje.html",
   "/m03fases/mIevolucion.html",
   "/m03fases/mIpreseleccion.html",
   "/m03fases/mJpresentacion.html",
   "/m03fases/mKseleccion.html",
   "/m03fases/mLrefinado.html",
   "/m03fases/mMdesarrollo.html",
   "/m03fases/mNvalidacion.html",
   "/m03fases/mOrefinadoPru.html",
   "/m03fases/mPaprobacion.html",
   "/m03fases/mQadaptacion.html",
   "/m03fases/mRpreparar.html",
   "/m03fases/mSsolucion.html",
   "/m03fases/print.html",
   "/m04composicion.html",
   "/m05derechos/",
   "/m05derechos/index.html",
   "/m05derechos/mAderechos.html",
   "/m05derechos/mBindautor.html",
   "/m05derechos/mCestablecer.html",
   "/m05derechos/mDcreative.html",
   "/m05derechos/mElicenciasC.html",
   "/m05derechos/print.html",
   "/print.html",
   "/site.webmanifest" ]

if (self instanceof ServiceWorkerGlobalScope) {
 self.addEventListener("install", installListener)
 self.addEventListener("fetch", fetchListener)
 self.addEventListener("activate", () => console.log("Service Worker activo."))
}

/**
 * @param {ExtendableEvent} evt
 */
function installListener(evt) {
 console.log("Service Worker instalando.")
 evt.waitUntil(cargaCache());
}

/**
 * @param {FetchEvent} evt
 */
function fetchListener(evt) {
 if (evt.request.method === "GET") {
  evt.respondWith(usaCache(evt))
 }
}

async function cargaCache() {
 console.log("Intentando cargar cache:", CACHE)
 const keys = await caches.keys()
 for (const key of keys) {
  await caches.delete(key)
 }
 const cache = await caches.open(CACHE)
 await cache.addAll(ARCHIVOS)
 console.log("Cache cargado:", CACHE)
 console.log("Versión:", VERSION)
}

/**
 * @param {FetchEvent} evt
 */
async function usaCache(evt) {
 const cache = await caches.open(CACHE)
 const response = await cache.match(evt.request, { ignoreSearch: true })
 if (response) {
  return response
 } else {
  return fetch(evt.request)
 }
}