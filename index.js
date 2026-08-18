import{a as x,i as v,A as U,S as A,N,P as R}from"./assets/vendor-C4KMXNvd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();const w=x.create({baseURL:"https://deserts-store.b.goit.study/api"});async function G(){return(await w.get("/categories")).data}async function K(e=1,t=8,o=""){const s={page:e,limit:t};return o&&o!=="all"&&(s.category=o),(await w.get("/desserts",{params:s})).data}async function Q(e){return(await w.get(`/desserts/${e}`)).data}async function W(e=6,t=1){return(await w.get("/feedbacks",{params:{limit:e,page:t}})).data}const M=document.querySelector(".mobile-menu"),C=document.querySelector(".burger-btn"),X=document.querySelector(".close-btn");document.querySelector(".header-btn");C.addEventListener("click",Y);X.addEventListener("click",h);M.addEventListener("click",e=>{e.target.classList.contains("header-link")&&h(),e.target.classList.contains("header-btn")&&h()});document.addEventListener("keydown",J);function J(e){e.key==="Escape"&&h()}function Y(){M.classList.add("is-open"),C.setAttribute("aria-expanded","true"),document.body.classList.add("no-scroll")}function h(){M.classList.remove("is-open"),C.setAttribute("aria-expanded","false"),document.body.classList.remove("no-scroll")}const T="/sweet-factory-shop/assets/sprite-BgUQCPAO.svg";function Z(e){const{_id:t,name:o,category:s,description:r,price:a,image:i}=e,n=typeof s=="object"?s.name:s;return`
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
                 <use href="${T}#arrow-up"></use>
              </svg>
            </button>
          </div>
        </div>

      </article>
    </li>
  `}function ee(e=[]){return e.map(Z).join("")}function te(e=[]){const t='<option value="all" selected>Всі десерти</option>',o=e.map(n=>{const m=typeof n=="object"?n._id||n.name:n,E=typeof n=="object"?n.name:n;return`<option value="${m}">${E}</option>`}).join(""),s=`
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
  `,a=e.map(n=>{const m=typeof n=="object"?n._id||n.name:n,E=typeof n=="object"?n.name:n;return`
        <li class="category-item">
          <button type="button" class="category-btn" data-category="${m}">
            ${E}
          </button>
        </li>
      `}).join(""),i=`
    <ul class="category-list" id="category-list">
      ${r}
      ${a}
    </ul>
  `;return`${s}${i}`}const d=document.querySelector(".js-desserts-list"),f=document.querySelector(".js-load-more"),q=document.querySelector(".js-loader"),I=document.querySelector(".js-categories-wrapper");let p=1,L="all";const j=8;let g=!1;function O(e){q&&(e?q.classList.remove("loader-hidden"):q.classList.add("loader-hidden"))}async function se(){try{const e=await G();I?(I.innerHTML=te(e),re()):console.error("Клас .js-categories-wrapper не знайдено в DOM"),f&&f.addEventListener("click",ne),await k()}catch(e){console.error("Initialization error:",e),H("Failed to load categories. Please try again later.")}}function re(){const e=document.querySelector("#category-select"),t=document.querySelector("#category-list");e&&e.addEventListener("change",oe),t&&t.addEventListener("click",ae)}async function oe(e){const t=e.target.value;if(t===L||g)return;const o=document.querySelector("#category-list");if(o){const s=o.querySelector(".category-btn.active");s&&s.classList.remove("active");const r=o.querySelector(`.category-btn[data-category="${t}"]`);r&&r.classList.add("active")}p=1,L=t,await k()}async function ae(e){const t=e.target.closest(".category-btn");if(!t||t.classList.contains("active")||g)return;const o=t.dataset.category,s=document.querySelector("#category-list");if(s){const a=s.querySelector(".category-btn.active");a&&a.classList.remove("active")}t.classList.add("active");const r=document.querySelector("#category-select");r&&(r.value=o),p=1,L=o,await k()}async function ne(){g||(p+=1,await k(),ce())}async function k(){if(!g){g=!0,O(!0);try{const e=await K(p,j,L),t=e.desserts||[],o=e.totalItems||0;if(t.length===0&&p===1){d&&(d.innerHTML='<p class="no-desserts">На жаль, десертів у цій категорії не знайдено.</p>'),f&&(f.style.display="none");return}const s=ee(t);if(d&&(p===1?d.innerHTML=s:d.insertAdjacentHTML("beforeend",s)),f){const r=Math.ceil(o/j);p>=r||t.length===0?f.style.display="none":f.style.display="block"}}catch(e){console.error("Error loading desserts:",e),H("Server error. Failed to load desserts.")}finally{g=!1,O(!1)}}}function H(e){v.error({title:"Error",message:e,position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"fadeInDown"})}function ce(){const e=d==null?void 0:d.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}se();new U(".faq-list",{duration:300,showMultiple:!1,openOnInit:[0],elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel",activeClass:"is-active",beforeOpen:e=>{document.querySelectorAll(".faq-item").forEach(o=>{o!==e&&o.classList.remove("is-active")})}});const ie="https://deserts-store.b.goit.study/api/orders",c=document.getElementById("modal-form"),l=c==null?void 0:c.querySelector(".modal-form-form"),le=()=>{c&&(c.hidden=!1,document.body.style.overflow="hidden")},B=()=>{c&&(c.hidden=!0,document.body.style.overflow="")};document.addEventListener("click",e=>{if(e.target.closest("#modal-form [data-modal-close]")){B();return}const t=e.target.closest('[data-modal-target="modal-form"]');t&&(t.dataset.dessertId&&(c.dataset.dessertId=t.dataset.dessertId),le())});document.addEventListener("keydown",e=>{e.key==="Escape"&&c&&!c.hidden&&B()});const b=l?[...l.querySelectorAll(".modal-form-input, .modal-form-textarea")]:[],de=/^380\d{9}$/,F=e=>e.validity.valueMissing?"Заповніть це поле":e.type==="tel"&&!de.test(e.value.replace(/\D/g,""))?e.title||"Невірний формат":"",_=(e,t)=>{e.classList.toggle("is-invalid",!!t);const o=e.parentElement.querySelector(".modal-form-error");o&&(o.textContent=t)},z=e=>{const t=F(e);return _(e,t),!t};b.forEach(e=>{e.addEventListener("input",()=>z(e))});l==null||l.addEventListener("submit",async e=>{var r,a,i;if(e.preventDefault(),!b.map(z).every(Boolean)){(r=b.find(n=>F(n)))==null||r.focus();return}const o=l.querySelector(".modal-form-submit"),s={name:l.name.value.trim(),phone:l.phone.value.replace(/\D/g,""),dessertId:c.dataset.dessertId??null,comment:l.comment.value.trim()};o.disabled=!0;try{const{data:n}=await x.post(ie,s);v.success({title:"Готово",message:`Замовлення №${n.orderNum} на "${n.dessertName}" успішно оформлено!`}),l.reset(),b.forEach(m=>_(m,"")),B()}catch(n){const m=((i=(a=n.response)==null?void 0:a.data)==null?void 0:i.message)||"Не вдалося оформити замовлення";v.error({title:"Помилка",message:m})}finally{o.disabled=!1}});const ue=document.querySelector(".js-desserts-list"),P=document.querySelector(".desserts-modal-img"),me=document.querySelector(".desserts-modal-title"),fe=document.querySelector(".desserts-modal-price"),pe=document.querySelector(".modal-wrap-rating"),ge=document.querySelector(".desserts-modal-descr"),ye=document.querySelector(".desserts-modal-ingredients"),u=document.querySelector("#desserts-modal"),be=u.querySelector("[data-modal-close]"),V=u.querySelector(".desserts-modal-btn"),y=document.querySelector(".js-loader");function D(e){y&&(e?y.classList.remove("loader-hidden"):y.classList.add("loader-hidden"))}ue.addEventListener("click",ve);async function ve(e){const t=e.target.closest(".js-open-modal");if(!t)return;const o=t.dataset.id;y.classList.add("modal-loader"),D(!0);try{const s=await Q(o);P.src=s.image,P.alt=s.name,me.textContent=s.name,fe.textContent=`${s.price} ₴`,ge.textContent=s.description,ye.innerHTML=`<span>Склад</span>: ${s.composition}`,pe.innerHTML=$(s.rate),V.dataset.dessertId=s._id,u.hidden=!1,document.body.style.overflow="hidden"}catch(s){console.error("Error loading dessert:",s),v.error({title:"Помилка",message:"Не вдалося завантажити інформацію про десерт.",position:"topRight",timeout:4e3})}finally{D(!1),y.classList.remove("modal-loader")}}function $(e){const t=Math.floor(e),o=e%1!==0;let s="";for(let r=0;r<5;r++){let a="star-empty";r<t?a="star":r===t&&o&&(a="star-half"),s+=`
      <svg class="rating-star-svg" width="16" height="16">
        <use href="${T}#${a}"></use>
      </svg>
    `}return s}be.addEventListener("click",S);u.addEventListener("click",he);document.addEventListener("keydown",Le);function S(){u.hidden=!0,document.body.style.overflow=""}function he(e){e.target===u&&S()}function Le(e){e.key==="Escape"&&u&&!u.hidden&&S()}V.addEventListener("click",we);function we(){S()}const ke=document.querySelector(".feedback-list");function Se(e){const t=e.map(({rate:o,description:s,author:r})=>`
      <li class="swiper-slide feedback-item">

        <div class="feedback-rating">
        ${$(o)}
        </div>

          <p class="feedback-description">${s}</p>
          <p class="feedback-author">${r}</p>
          

      </li>
    `).join("");ke.innerHTML=t,$()}async function Ee(){try{const e=await W();console.log(e),Se(e.feedbacks)}catch(e){console.error(e)}}Ee();new A(".about-swiper",{modules:[N,R],enabled:!1,loop:!0,direction:"horizontal",pagination:{el:".about-section .swiper-pagination",clickable:!0},navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},breakpoints:{768:{enabled:!0,slidesPerView:2,spaceBetween:24}}});new A(".feedback-swiper",{modules:[N,R],slidesPerView:1,spaceBetween:24,loop:!0,direction:"horizontal",pagination:{el:".feedback .swiper-pagination",clickable:!0},navigation:{nextEl:".feedback-button-next",prevEl:".feedback-button-prev"},breakpoints:{768:{slidesPerView:3}}});
//# sourceMappingURL=index.js.map
