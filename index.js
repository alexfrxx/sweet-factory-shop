import{a as O,i as v,A as _,S as P,N as D,P as N}from"./assets/vendor-C4KMXNvd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();const L=O.create({baseURL:"https://deserts-store.b.goit.study/api"});async function z(){return(await L.get("/categories")).data}async function V(e=1,t=8,o=""){const s={page:e,limit:t};return o&&o!=="all"&&(s.category=o),(await L.get("/desserts",{params:s})).data}async function U(e){return(await L.get(`/desserts/${e}`)).data}async function G(e=6,t=1){return(await L.get("/feedbacks",{params:{limit:e,page:t}})).data}const R="/sweet-factory-shop/assets/sprite-BgUQCPAO.svg";function K(e){const{_id:t,name:o,category:s,description:r,price:a,image:i}=e,n=typeof s=="object"?s.name:s;return`
    <li class="desserts-item">
      <article class="dessert-card" data-id="${t}">

        <div class="dessert-card-thumb">
          <img 
            class="dessert-card-img"
            src="${i}"
            alt="${o}"
            width="278" 
            height="209" 
            loading="lazy" 
          />
        </div>

        <div class="dessert-card-content">
        <div class="dessert-card-wrapper">
        <p class="dessert-card-category">${n}</p>
        <h3 class="dessert-card-title">${o}</h3>
        <p class="dessert-card-description">${r}</p>
        </div>

          <div class="dessert-card-footer">
            <span class="dessert-card-price">${a} ₴</span>

            <button 
              class="dessert-card-btn btn js-open-modal" 
              type="button" 
              data-id="${t}"
              aria-label="Order ${o} dessert"
            >
              <svg class="dessert-card-icon" width="24" height="24">
                 <use href="${R}#arrow-up"></use>
              </svg>
            </button>
          </div>
        </div>

      </article>
    </li>
  `}function Q(e=[]){return e.map(K).join("")}function W(e=[]){const t='<option value="all" selected>Всі десерти</option>',o=e.map(n=>{const f=typeof n=="object"?n._id||n.name:n,k=typeof n=="object"?n.name:n;return`<option value="${f}">${k}</option>`}).join(""),s=`
    <select class="category-select" id="category-select" aria-label="Select dessert category">
      ${t}
      ${o}
    </select>
  `,r=`
    <li class="category-item">
      <button type="button" class="btn category-btn active" data-category="all">
        Всі десерти
      </button>
    </li>
  `,a=e.map(n=>{const f=typeof n=="object"?n._id||n.name:n,k=typeof n=="object"?n.name:n;return`
        <li class="category-item">
          <button type="button" class="category-btn" data-category="${f}">
            ${k}
          </button>
        </li>
      `}).join(""),i=`
    <ul class="category-list" id="category-list">
      ${r}
      ${a}
    </ul>
  `;return`${s}${i}`}const d=document.querySelector(".js-desserts-list"),p=document.querySelector(".js-load-more"),E=document.querySelector(".js-loader"),C=document.querySelector(".js-categories-wrapper");let m=1,h="all";const M=8;let g=!1;function B(e){E&&(e?E.classList.remove("loader-hidden"):E.classList.add("loader-hidden"))}async function X(){try{const e=await z();C?(C.innerHTML=W(e),J()):console.error("Клас .js-categories-wrapper не знайдено в DOM"),p&&p.addEventListener("click",ee),await w()}catch(e){console.error("Initialization error:",e),T("Failed to load categories. Please try again later.")}}function J(){const e=document.querySelector("#category-select"),t=document.querySelector("#category-list");e&&e.addEventListener("change",Y),t&&t.addEventListener("click",Z)}async function Y(e){const t=e.target.value;if(t===h||g)return;const o=document.querySelector("#category-list");if(o){const s=o.querySelector(".category-btn.active");s&&s.classList.remove("active");const r=o.querySelector(`.category-btn[data-category="${t}"]`);r&&r.classList.add("active")}m=1,h=t,await w()}async function Z(e){const t=e.target.closest(".category-btn");if(!t||t.classList.contains("active")||g)return;const o=t.dataset.category,s=document.querySelector("#category-list");if(s){const a=s.querySelector(".category-btn.active");a&&a.classList.remove("active")}t.classList.add("active");const r=document.querySelector("#category-select");r&&(r.value=o),m=1,h=o,await w()}async function ee(){g||(m+=1,await w(),te())}async function w(){if(!g){g=!0,B(!0);try{const e=await V(m,M,h),t=e.desserts||[],o=e.totalItems||0;if(t.length===0&&m===1){d&&(d.innerHTML='<p class="no-desserts">На жаль, десертів у цій категорії не знайдено.</p>'),p&&(p.style.display="none");return}const s=Q(t);if(d&&(m===1?d.innerHTML=s:d.insertAdjacentHTML("beforeend",s)),p){const r=Math.ceil(o/M);m>=r||t.length===0?p.style.display="none":p.style.display="block"}}catch(e){console.error("Error loading desserts:",e),T("Server error. Failed to load desserts.")}finally{g=!1,B(!1)}}}function T(e){v.error({title:"Error",message:e,position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"fadeInDown"})}function te(){const e=d==null?void 0:d.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}X();new _(".faq-list",{duration:300,showMultiple:!1,openOnInit:[0],elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel",activeClass:"is-active",beforeOpen:e=>{document.querySelectorAll(".faq-item").forEach(o=>{o!==e&&o.classList.remove("is-active")})}});const se="https://deserts-store.b.goit.study/api/orders",c=document.getElementById("modal-form"),l=c==null?void 0:c.querySelector(".modal-form-form"),re=()=>{c&&(c.hidden=!1,document.body.style.overflow="hidden")},$=()=>{c&&(c.hidden=!0,document.body.style.overflow="")};document.addEventListener("click",e=>{if(e.target.closest("#modal-form [data-modal-close]")){$();return}const t=e.target.closest('[data-modal-target="modal-form"]');t&&(t.dataset.dessertId&&(c.dataset.dessertId=t.dataset.dessertId),re())});document.addEventListener("keydown",e=>{e.key==="Escape"&&c&&!c.hidden&&$()});const b=l?[...l.querySelectorAll(".modal-form-input, .modal-form-textarea")]:[],oe=/^380\d{9}$/,x=e=>e.validity.valueMissing?"Заповніть це поле":e.type==="tel"&&!oe.test(e.value.replace(/\D/g,""))?e.title||"Невірний формат":"",H=(e,t)=>{e.classList.toggle("is-invalid",!!t);const o=e.parentElement.querySelector(".modal-form-error");o&&(o.textContent=t)},A=e=>{const t=x(e);return H(e,t),!t};b.forEach(e=>{e.addEventListener("input",()=>A(e))});l==null||l.addEventListener("submit",async e=>{var r,a,i;if(e.preventDefault(),!b.map(A).every(Boolean)){(r=b.find(n=>x(n)))==null||r.focus();return}const o=l.querySelector(".modal-form-submit"),s={name:l.name.value.trim(),phone:l.phone.value.replace(/\D/g,""),dessertId:c.dataset.dessertId??null,comment:l.comment.value.trim()};o.disabled=!0;try{const{data:n}=await O.post(se,s);v.success({title:"Готово",message:`Замовлення №${n.orderNum} на "${n.dessertName}" успішно оформлено!`}),l.reset(),b.forEach(f=>H(f,"")),$()}catch(n){const f=((i=(a=n.response)==null?void 0:a.data)==null?void 0:i.message)||"Не вдалося оформити замовлення";v.error({title:"Помилка",message:f})}finally{o.disabled=!1}});const ae=document.querySelector(".js-desserts-list"),I=document.querySelector(".desserts-modal-img"),ne=document.querySelector(".desserts-modal-title"),ce=document.querySelector(".desserts-modal-price"),ie=document.querySelector(".modal-wrap-rating"),le=document.querySelector(".desserts-modal-descr"),de=document.querySelector(".desserts-modal-ingredients"),u=document.querySelector("#desserts-modal"),ue=u.querySelector("[data-modal-close]"),F=u.querySelector(".desserts-modal-btn"),y=document.querySelector(".js-loader");function j(e){y&&(e?y.classList.remove("loader-hidden"):y.classList.add("loader-hidden"))}ae.addEventListener("click",fe);async function fe(e){const t=e.target.closest(".js-open-modal");if(!t)return;const o=t.dataset.id;y.classList.add("modal-loader"),j(!0);try{const s=await U(o);I.src=s.image,I.alt=s.name,ne.textContent=s.name,ce.textContent=`${s.price} ₴`,le.textContent=s.description,de.innerHTML=`<span>Склад</span>: ${s.composition}`,ie.innerHTML=q(s.rate),F.dataset.dessertId=s._id,u.hidden=!1,document.body.style.overflow="hidden"}catch(s){console.error("Error loading dessert:",s),v.error({title:"Помилка",message:"Не вдалося завантажити інформацію про десерт.",position:"topRight",timeout:4e3})}finally{j(!1),y.classList.remove("modal-loader")}}function q(e){const t=Math.floor(e),o=e%1!==0;let s="";for(let r=0;r<5;r++){let a="star-empty";r<t?a="star":r===t&&o&&(a="star-half"),s+=`
      <svg class="rating-star-svg" width="16" height="16">
        <use href="${R}#${a}"></use>
      </svg>
    `}return s}ue.addEventListener("click",S);u.addEventListener("click",pe);document.addEventListener("keydown",me);function S(){u.hidden=!0,document.body.style.overflow=""}function pe(e){e.target===u&&S()}function me(e){e.key==="Escape"&&u&&!u.hidden&&S()}F.addEventListener("click",ge);function ge(){S()}const ye=document.querySelector(".feedback-list");function be(e){const t=e.map(({rate:o,description:s,author:r})=>`
      <li class="swiper-slide feedback-item">

        <div class="feedback-rating">
        ${q(o)}
        </div>

          <p class="feedback-description">${s}</p>
          <p class="feedback-author">${r}</p>
          

      </li>
    `).join("");ye.innerHTML=t,q()}async function ve(){try{const e=await G();console.log(e),be(e.feedbacks)}catch(e){console.error(e)}}ve();new P(".about-swiper",{modules:[D,N],enabled:!1,loop:!0,direction:"horizontal",pagination:{el:".about-section .swiper-pagination",clickable:!0},navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},breakpoints:{768:{enabled:!0,slidesPerView:2,spaceBetween:24}}});new P(".feedback-swiper",{modules:[D,N],slidesPerView:1,spaceBetween:24,loop:!0,direction:"horizontal",pagination:{el:".feedback .swiper-pagination",clickable:!0},navigation:{nextEl:".feedback-button-next",prevEl:".feedback-button-prev"},breakpoints:{768:{slidesPerView:3}}});
//# sourceMappingURL=index.js.map
