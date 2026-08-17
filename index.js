import{a as j,i as h,A as H,S as x,N as A,P as _}from"./assets/vendor-C4KMXNvd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();const q=j.create({baseURL:"https://deserts-store.b.goit.study/api"});async function F(){return(await q.get("/categories")).data}async function z(e=1,t=8,o=""){const s={page:e,limit:t};return o&&o!=="all"&&(s.category=o),(await q.get("/desserts",{params:s})).data}async function U(e){return(await q.get(`/desserts/${e}`)).data}const O="/sweet-factory-shop/assets/sprite-Btco1Kqt.svg";function V(e){const{_id:t,name:o,category:s,description:r,price:a,image:i}=e,n=typeof s=="object"?s.name:s;return`
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
                 <use href="${O}#arrow-up"></use>
              </svg>
            </button>
          </div>
        </div>

      </article>
    </li>
  `}function K(e=[]){return e.map(V).join("")}function G(e=[]){const t='<option value="all" selected>Всі десерти</option>',o=e.map(n=>{const m=typeof n=="object"?n._id||n.name:n,w=typeof n=="object"?n.name:n;return`<option value="${m}">${w}</option>`}).join(""),s=`
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
  `,a=e.map(n=>{const m=typeof n=="object"?n._id||n.name:n,w=typeof n=="object"?n.name:n;return`
        <li class="category-item">
          <button type="button" class="category-btn" data-category="${m}">
            ${w}
          </button>
        </li>
      `}).join(""),i=`
    <ul class="category-list" id="category-list">
      ${r}
      ${a}
    </ul>
  `;return`${s}${i}`}const d=document.querySelector(".js-desserts-list"),f=document.querySelector(".js-load-more"),E=document.querySelector(".js-loader"),C=document.querySelector(".js-categories-wrapper");let g=1,b="all";const M=8;let y=!1;function k(e){E&&(e?E.classList.remove("loader-hidden"):E.classList.add("loader-hidden"))}async function W(){try{const e=await F();C?(C.innerHTML=G(e),X()):console.error("Клас .js-categories-wrapper не знайдено в DOM"),f&&f.addEventListener("click",Y),await L()}catch(e){console.error("Initialization error:",e),D("Failed to load categories. Please try again later.")}}function X(){const e=document.querySelector("#category-select"),t=document.querySelector("#category-list");e&&e.addEventListener("change",J),t&&t.addEventListener("click",Q)}async function J(e){const t=e.target.value;if(t===b||y)return;const o=document.querySelector("#category-list");if(o){const s=o.querySelector(".category-btn.active");s&&s.classList.remove("active");const r=o.querySelector(`.category-btn[data-category="${t}"]`);r&&r.classList.add("active")}g=1,b=t,await L()}async function Q(e){const t=e.target.closest(".category-btn");if(!t||t.classList.contains("active")||y)return;const o=t.dataset.category,s=document.querySelector("#category-list");if(s){const a=s.querySelector(".category-btn.active");a&&a.classList.remove("active")}t.classList.add("active");const r=document.querySelector("#category-select");r&&(r.value=o),g=1,b=o,await L()}async function Y(){y||(g+=1,await L(),Z())}async function L(){if(!y){y=!0,k(!0);try{const e=await z(g,M,b),t=e.desserts||[],o=e.totalItems||0;if(t.length===0&&g===1){d&&(d.innerHTML='<p class="no-desserts">На жаль, десертів у цій категорії не знайдено.</p>'),f&&(f.style.display="none");return}const s=K(t);if(d&&(g===1?d.innerHTML=s:d.insertAdjacentHTML("beforeend",s)),f){const r=Math.ceil(o/M);g>=r||t.length===0?f.style.display="none":f.style.display="block"}}catch(e){console.error("Error loading desserts:",e),D("Server error. Failed to load desserts.")}finally{y=!1,k(!1)}}}function D(e){h.error({title:"Error",message:e,position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"fadeInDown"})}function Z(){const e=d==null?void 0:d.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}W();new H(".faq-list",{duration:300,showMultiple:!1,openOnInit:[0],elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel",activeClass:"is-active",beforeOpen:e=>{document.querySelectorAll(".faq-item").forEach(o=>{o!==e&&o.classList.remove("is-active")})}});const ee="https://deserts-store.b.goit.study/api/orders",c=document.getElementById("modal-form"),l=c==null?void 0:c.querySelector(".modal-form-form"),te=()=>{c&&(c.hidden=!1,document.body.style.overflow="hidden")},$=()=>{c&&(c.hidden=!0,document.body.style.overflow="")};document.addEventListener("click",e=>{if(e.target.closest("#modal-form [data-modal-close]")){$();return}const t=e.target.closest('[data-modal-target="modal-form"]');t&&(t.dataset.dessertId&&(c.dataset.dessertId=t.dataset.dessertId),te())});document.addEventListener("keydown",e=>{e.key==="Escape"&&c&&!c.hidden&&$()});const v=l?[...l.querySelectorAll(".modal-form-input, .modal-form-textarea")]:[],se=/^380\d{9}$/,P=e=>e.validity.valueMissing?"Заповніть це поле":e.type==="tel"&&!se.test(e.value.replace(/\D/g,""))?e.title||"Невірний формат":"",N=(e,t)=>{e.classList.toggle("is-invalid",!!t);const o=e.parentElement.querySelector(".modal-form-error");o&&(o.textContent=t)},R=e=>{const t=P(e);return N(e,t),!t};v.forEach(e=>{e.addEventListener("input",()=>R(e))});l==null||l.addEventListener("submit",async e=>{var r,a,i;if(e.preventDefault(),!v.map(R).every(Boolean)){(r=v.find(n=>P(n)))==null||r.focus();return}const o=l.querySelector(".modal-form-submit"),s={name:l.name.value.trim(),phone:l.phone.value.replace(/\D/g,""),dessertId:c.dataset.dessertId??null,comment:l.comment.value.trim()};o.disabled=!0;try{const{data:n}=await j.post(ee,s);h.success({title:"Готово",message:`Замовлення №${n.orderNum} на "${n.dessertName}" успішно оформлено!`}),l.reset(),v.forEach(m=>N(m,"")),$()}catch(n){const m=((i=(a=n.response)==null?void 0:a.data)==null?void 0:i.message)||"Не вдалося оформити замовлення";h.error({title:"Помилка",message:m})}finally{o.disabled=!1}});const re=document.querySelector(".js-desserts-list"),I=document.querySelector(".desserts-modal-img"),oe=document.querySelector(".desserts-modal-title"),ae=document.querySelector(".desserts-modal-price"),ne=document.querySelector(".modal-wrap-rating"),ce=document.querySelector(".desserts-modal-descr"),ie=document.querySelector(".desserts-modal-ingredients"),u=document.querySelector("#desserts-modal"),le=u.querySelector("[data-modal-close]"),T=u.querySelector(".desserts-modal-btn"),p=document.querySelector(".js-loader");function B(e){p&&(e?p.classList.remove("loader-hidden"):p.classList.add("loader-hidden"))}re.addEventListener("click",de);async function de(e){const t=e.target.closest(".js-open-modal");if(!t)return;const o=t.dataset.id;p.classList.add("modal-loader"),B(!0);try{const s=await U(o);I.src=s.image,I.alt=s.name,oe.textContent=s.name,ae.textContent=`${s.price} ₴`,ce.textContent=s.description,ie.innerHTML=`<span>Склад</span>: ${s.composition}`,ne.innerHTML=ue(s.rate),T.dataset.dessertId=s._id,u.hidden=!1,document.body.style.overflow="hidden"}catch(s){console.error("Error loading dessert:",s),h.error({title:"Помилка",message:"Не вдалося завантажити інформацію про десерт.",position:"topRight",timeout:4e3})}finally{B(!1),p.classList.remove("modal-loader")}}function ue(e){const t=Math.floor(e),o=e%1!==0;let s="";for(let r=0;r<5;r++){let a="star-empty";r<t?a="star":r===t&&o&&(a="star-half"),s+=`
      <svg class="rating-star-svg" width="16" height="16">
        <use href="${O}#${a}"></use>
      </svg>
    `}return s}le.addEventListener("click",S);u.addEventListener("click",me);document.addEventListener("keydown",fe);function S(){u.hidden=!0,document.body.style.overflow=""}function me(e){e.target===u&&S()}function fe(e){e.key==="Escape"&&u&&!u.hidden&&S()}T.addEventListener("click",ge);function ge(){S()}new x(".about-swiper",{modules:[A,_],enabled:!1,loop:!0,direction:"horizontal",pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},breakpoints:{768:{enabled:!0,slidesPerView:2,spaceBetween:24}}});
//# sourceMappingURL=index.js.map
