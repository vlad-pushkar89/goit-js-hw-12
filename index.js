import{a as y,i as c,S as b}from"./assets/vendor-mdVVRe9K.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const L="46287903-5c8c629b6ba927f49057e3500",w="https://pixabay.com/api/";async function v(t,o=1,s=15){const a=`${w}?key=${L}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${s}`;try{const{data:e}=await y.get(a);return e}catch(e){throw console.error("Error fetching images:",e),e}}function E(t){return t.map(({webformatURL:o,largeImageURL:s,tags:a,likes:e,views:r,comments:i,downloads:h})=>`
        <div class="photo-card">
          <a href="${s}">
            <img src="${o}" alt="${a}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> <span>${e}</span>
            </p>
            <p class="info-item">
              <b>Views</b> <span>${r}</span>
            </p>
            <p class="info-item">
              <b>Comments</b> <span>${i}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b> <span>${h}</span>
            </p>
          </div>
        </div>`).join("")}function S(t){t.innerHTML=""}function $(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}let u="",f=1,m=0,l,n,d;document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#search-form");l=document.querySelector(".gallery"),n=document.createElement("button"),n.textContent="Load more",n.classList.add("load-more-btn"),n.style.display="none",document.body.appendChild(n),t.addEventListener("submit",C),n.addEventListener("click",I)});async function C(t){if(t.preventDefault(),u=t.currentTarget.elements.searchQuery.value.trim(),!u){c.warning({title:"Warning",message:"Search query cannot be empty"});return}S(l),f=1,await p(),g()}async function I(){f+=1,await p(),$(),g()}async function p(){try{const t=await v(u,f);if(m=t.totalHits,t.hits.length===0){c.error({title:"Error",message:"Sorry, no images found!"});return}const o=E(t.hits);l.insertAdjacentHTML("beforeend",o),d?d.refresh():d=new b(".gallery a")}catch{c.error({title:"Error",message:"Something went wrong. Please try again later."})}}function g(){l.children.length<m?n.style.display="block":(n.style.display="none",c.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}
//# sourceMappingURL=index.js.map
