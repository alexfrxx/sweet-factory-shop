import{a as B,i as v,A as T,S as A,N as F,P as x}from"./assets/vendor-C4KMXNvd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const L=B.create({baseURL:"https://deserts-store.b.goit.study/api"});async function _(){return(await L.get("/categories")).data}async function z(e=1,t=8,s=""){const r={page:e,limit:t};return s&&s!=="all"&&(r.category=s),(await L.get("/desserts",{params:r})).data}async function U(e){return(await L.get(`/desserts/${e}`)).data}async function V(e=10,t=1){return(await L.get("/feedbacks",{params:{limit:e,page:t}})).data}const O="/sweet-factory-shop/assets/sprite-BgUQCPAO.svg";function G(e){const{_id:t,name:s,category:r,description:o,price:a,image:i}=e,n=typeof r=="object"?r.name:r;return`
    <li class="desserts-item">
      <article class="dessert-card" data-id="${t}">

        <div class="dessert-card-thumb">
          <img 
            class="dessert-card-img"
            src="${i}"
            alt="${s}"
            width="278" 
            height="209" 
            loading="lazy" 
          />
        </div>

        <div class="dessert-card-content">
        <div class="dessert-card-wrapper">
        <p class="dessert-card-category">${n}</p>
        <h3 class="dessert-card-title">${s}</h3>
        <p class="dessert-card-description">${o}</p>
        </div>

          <div class="dessert-card-footer">
            <span class="dessert-card-price">${a} ₴</span>

            <button 
              class="dessert-card-btn btn js-open-modal" 
              type="button" 
              data-id="${t}"
              aria-label="Order ${s} dessert"
            >
              <svg class="dessert-card-icon" width="24" height="24">
                 <use href="${O}#arrow-up"></use>
              </svg>
            </button>
          </div>
        </div>

      </article>
    </li>
  `}function K(e=[]){return e.map(G).join("")}function Q(e=[]){const t='<option value="all" selected>Всі десерти</option>',s=e.map(n=>{const f=typeof n=="object"?n._id||n.name:n,E=typeof n=="object"?n.name:n;return`<option value="${f}">${E}</option>`}).join(""),r=`
    <select class="category-select" id="category-select" aria-label="Select dessert category">
      ${t}
      ${s}
    </select>
  `,o=`
    <li class="category-item">
      <button type="button" class="btn category-btn active" data-category="all">
        Всі десерти
      </button>
    </li>
  `,a=e.map(n=>{const f=typeof n=="object"?n._id||n.name:n,E=typeof n=="object"?n.name:n;return`
        <li class="category-item">
          <button type="button" class="category-btn" data-category="${f}">
            ${E}
          </button>
        </li>
      `}).join(""),i=`
    <ul class="category-list" id="category-list">
      ${o}
      ${a}
    </ul>
  `;return`${r}${i}`}const d=document.querySelector(".js-desserts-list"),m=document.querySelector(".js-load-more"),k=document.querySelector(".js-loader"),$=document.querySelector(".js-categories-wrapper");let g=1,b="all";const M=8;let p=!1;function C(e){k&&(e?k.classList.remove("loader-hidden"):k.classList.add("loader-hidden"))}async function W(){try{const e=await _();$?($.innerHTML=Q(e),X()):console.error("Клас .js-categories-wrapper не знайдено в DOM"),m&&m.addEventListener("click",Z),await S()}catch(e){console.error("Initialization error:",e),P("Failed to load categories. Please try again later.")}}function X(){const e=document.querySelector("#category-select"),t=document.querySelector("#category-list");e&&e.addEventListener("change",J),t&&t.addEventListener("click",Y)}async function J(e){const t=e.target.value;if(t===b||p)return;const s=document.querySelector("#category-list");if(s){const r=s.querySelector(".category-btn.active");r&&r.classList.remove("active");const o=s.querySelector(`.category-btn[data-category="${t}"]`);o&&o.classList.add("active")}g=1,b=t,await S()}async function Y(e){const t=e.target.closest(".category-btn");if(!t||t.classList.contains("active")||p)return;const s=t.dataset.category,r=document.querySelector("#category-list");if(r){const a=r.querySelector(".category-btn.active");a&&a.classList.remove("active")}t.classList.add("active");const o=document.querySelector("#category-select");o&&(o.value=s),g=1,b=s,await S()}async function Z(){p||(g+=1,await S(),ee())}async function S(){if(!p){p=!0,C(!0);try{const e=await z(g,M,b),t=e.desserts||[],s=e.totalItems||0;if(t.length===0&&g===1){d&&(d.innerHTML='<p class="no-desserts">На жаль, десертів у цій категорії не знайдено.</p>'),m&&(m.style.display="none");return}const r=K(t);if(d&&(g===1?d.innerHTML=r:d.insertAdjacentHTML("beforeend",r)),m){const o=Math.ceil(s/M);g>=o||t.length===0?m.style.display="none":m.style.display="block"}}catch(e){console.error("Error loading desserts:",e),P("Server error. Failed to load desserts.")}finally{p=!1,C(!1)}}}function P(e){v.error({title:"Error",message:e,position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"fadeInDown"})}function ee(){const e=d==null?void 0:d.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}W();new T(".faq-list",{duration:300,showMultiple:!1,openOnInit:[0],elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel",activeClass:"is-active",beforeOpen:e=>{document.querySelectorAll(".faq-item").forEach(s=>{s!==e&&s.classList.remove("is-active")})}});const te="https://deserts-store.b.goit.study/api/orders",c=document.getElementById("modal-form"),l=c==null?void 0:c.querySelector(".modal-form-form"),se=()=>{c&&(c.hidden=!1,document.body.style.overflow="hidden")},q=()=>{c&&(c.hidden=!0,document.body.style.overflow="")};document.addEventListener("click",e=>{if(e.target.closest("#modal-form [data-modal-close]")){q();return}const t=e.target.closest('[data-modal-target="modal-form"]');t&&(t.dataset.dessertId&&(c.dataset.dessertId=t.dataset.dessertId),se())});document.addEventListener("keydown",e=>{e.key==="Escape"&&c&&!c.hidden&&q()});const h=l?[...l.querySelectorAll(".modal-form-input, .modal-form-textarea")]:[],re=/^380\d{9}$/,D=e=>e.validity.valueMissing?"Заповніть це поле":e.type==="tel"&&!re.test(e.value.replace(/\D/g,""))?e.title||"Невірний формат":"",N=(e,t)=>{e.classList.toggle("is-invalid",!!t);const s=e.parentElement.querySelector(".modal-form-error");s&&(s.textContent=t)},H=e=>{const t=D(e);return N(e,t),!t};h.forEach(e=>{e.addEventListener("input",()=>H(e))});l==null||l.addEventListener("submit",async e=>{var o,a,i;if(e.preventDefault(),!h.map(H).every(Boolean)){(o=h.find(n=>D(n)))==null||o.focus();return}const s=l.querySelector(".modal-form-submit"),r={name:l.name.value.trim(),phone:l.phone.value.replace(/\D/g,""),dessertId:c.dataset.dessertId??null,comment:l.comment.value.trim()};s.disabled=!0;try{const{data:n}=await B.post(te,r);v.success({title:"Готово",message:`Замовлення №${n.orderNum} на "${n.dessertName}" успішно оформлено!`}),l.reset(),h.forEach(f=>N(f,"")),q()}catch(n){const f=((i=(a=n.response)==null?void 0:a.data)==null?void 0:i.message)||"Не вдалося оформити замовлення";v.error({title:"Помилка",message:f})}finally{s.disabled=!1}});const oe=document.querySelector(".feedback-list");function ae(e){const t=Number(e),s=Math.floor(t),r=t%1!==0;return Array.from({length:5},(o,a)=>a<s?'<i class="star-icon filled">★</i>':a===s&&r?'<i class="star-icon half">★</i>':'<i class="star-icon">★</i>').join("")}function ne(e){const t=e.map(s=>`
      <li class="feedback-item">

        <div class="feedback-rating">
  ${ae(s.rate)}
        </div>

          <p class="feedback-description">${s.description}</p>
          <p class="feedback-author">${s.author}</p>
          

      </li>
    `).join("");oe.innerHTML=t}async function ce(){try{const e=await V();console.log(e),ne(e.feedbacks)}catch(e){console.error(e)}}ce();const ie=document.querySelector(".js-desserts-list"),I=document.querySelector(".desserts-modal-img"),le=document.querySelector(".desserts-modal-title"),de=document.querySelector(".desserts-modal-price"),ue=document.querySelector(".modal-wrap-rating"),fe=document.querySelector(".desserts-modal-descr"),me=document.querySelector(".desserts-modal-ingredients"),u=document.querySelector("#desserts-modal"),ge=u.querySelector("[data-modal-close]"),R=u.querySelector(".desserts-modal-btn"),y=document.querySelector(".js-loader");function j(e){y&&(e?y.classList.remove("loader-hidden"):y.classList.add("loader-hidden"))}ie.addEventListener("click",pe);async function pe(e){const t=e.target.closest(".js-open-modal");if(!t)return;const s=t.dataset.id;y.classList.add("modal-loader"),j(!0);try{const r=await U(s);I.src=r.image,I.alt=r.name,le.textContent=r.name,de.textContent=`${r.price} ₴`,fe.textContent=r.description,me.innerHTML=`<span>Склад</span>: ${r.composition}`,ue.innerHTML=ye(r.rate),R.dataset.dessertId=r._id,u.hidden=!1,document.body.style.overflow="hidden"}catch(r){console.error("Error loading dessert:",r),v.error({title:"Помилка",message:"Не вдалося завантажити інформацію про десерт.",position:"topRight",timeout:4e3})}finally{j(!1),y.classList.remove("modal-loader")}}function ye(e){const t=Math.floor(e),s=e%1!==0;let r="";for(let o=0;o<5;o++){let a="star-empty";o<t?a="star":o===t&&s&&(a="star-half"),r+=`
      <svg class="rating-star-svg" width="16" height="16">
        <use href="${O}#${a}"></use>
      </svg>
    `}return r}ge.addEventListener("click",w);u.addEventListener("click",he);document.addEventListener("keydown",ve);function w(){u.hidden=!0,document.body.style.overflow=""}function he(e){e.target===u&&w()}function ve(e){e.key==="Escape"&&u&&!u.hidden&&w()}R.addEventListener("click",be);function be(){w()}new A(".about-swiper",{modules:[F,x],enabled:!1,loop:!0,direction:"horizontal",pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},breakpoints:{768:{enabled:!0,slidesPerView:2,spaceBetween:24}}});
//# sourceMappingURL=index.js.map
