/// <reference lib="webworker" />

/* Espera 11 minutos después de hacer los cambios en tu sitio, para depués
 * actualizar este archivo. */

const CACHE = "cache"

const VERSION = "1.0"

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
   "/index.html",
   "/js/muestra-codigo.js",
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
   "/m03fases/index.html",
   "/m03fases/mAinstrucciones.html",
   "/m03fases/mBarchivos.html",
   "/m03fases/mCjsconfigJson.html",
   "/m03fases/mDsiteWebmanifest.html",
   "/m03fases/mEswJs.html",
   "/m03fases/mFregSwJs.html",
   "/m03fases/mGconfigJs.html",
   "/m03fases/mHindexHtml.html",
   "/m03fases/mIestilosCss.html",
   "/m03fases/mJfaviconIco.html",
   "/m03fases/mKicono2048png.html",
   "/m03fases/mLmaskable_icon_x48png.html",
   "/m03fases/mMmaskable_icon_x72png.html",
   "/m03fases/mNmaskable_icon_x96png.html",
   "/m03fases/mOmaskable_icon_x128png.html",
   "/m03fases/mPmaskable_icon_x192png.html",
   "/m03fases/mQmaskable_icon_x384png.html",
   "/m03fases/mRmaskable_icon_x512png.html",
   "/m03fases/mSmaskable_iconPng.html",
   "/m03fases/mTresumen.html",
   "/m03fases/print.html",
   "/m04composicion.html",
   "/m05derechos/index.html",
   "/m05derechos/mAcasos.html",
   "/m05derechos/mBdespliegue.html",
   "/m05derechos/mCer.html",
   "/m05derechos/mDnoRel.html",
   "/m05derechos/mEinstrucciones.html",
   "/m05derechos/mFarchivos.html",
   "/m05derechos/mGtipos.html",
   "/m05derechos/mHcliente.html",
   "/m05derechos/mIgetValor.html",
   "/m05derechos/mJsetValor.html",
   "/m05derechos/mKindexJs.html",
   "/m05derechos/mLindexHtml.html",
   "/m05derechos/mMresumen.html",
   "/m05derechos/print.html",
   "/print.html",
   "/site.webmanifest",
    "/"]

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