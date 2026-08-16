import{a as C,i as L,A as _,S as O,N as k,P as D}from"./assets/vendor-C4KMXNvd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();const M=C.create({baseURL:"https://deserts-store.b.goit.study/api"});async function N(){return(await M.get("/categories")).data}async function P(e=1,t=8,r=""){const a={page:e,limit:t};return r&&r!=="all"&&(a.category=r),(await M.get("/desserts",{params:a})).data}const A="/sweet-factory-shop/assets/sprite-CLhZlZvI.svg";function R(e){const{_id:t,name:r,category:a,description:s,price:n,image:i}=e,o=typeof a=="object"?a.name:a;return`
    <li class="desserts-item">
      <article class="dessert-card" data-id="${t}">

        <div class="dessert-card-thumb">
          <img 
            class="dessert-card-img"
            src="${i}"
            alt="${r}"
            width="278" 
            height="209" 
            loading="lazy" 
          />
        </div>

        <div class="dessert-card-content">
        <div class="dessert-card-wrapper">
        <p class="dessert-card-category">${o}</p>
        <h3 class="dessert-card-title">${r}</h3>
        <p class="dessert-card-description">${s}</p>
        </div>

          <div class="dessert-card-footer">
            <span class="dessert-card-price">${n} ₴</span>

            <button 
              class="dessert-card-btn btn js-open-modal" 
              type="button" 
              data-id="${t}"
              aria-label="Order ${r} dessert"
            >
              <svg class="dessert-card-icon" width="24" height="24">
                 <use href="${A}#arrow-up"></use>
              </svg>
            </button>
          </div>
        </div>

      </article>
    </li>
  `}function H(e=[]){return e.map(R).join("")}function T(e=[]){const t='<option value="all" selected>Всі десерти</option>',r=e.map(o=>{const u=typeof o=="object"?o._id||o.name:o,h=typeof o=="object"?o.name:o;return`<option value="${u}">${h}</option>`}).join(""),a=`
    <select class="category-select" id="category-select" aria-label="Select dessert category">
      ${t}
      ${r}
    </select>
  `,s=`
    <li class="category-item">
      <button type="button" class="btn category-btn active" data-category="all">
        Всі десерти
      </button>
    </li>
  `,n=e.map(o=>{const u=typeof o=="object"?o._id||o.name:o,h=typeof o=="object"?o.name:o;return`
        <li class="category-item">
          <button type="button" class="category-btn" data-category="${u}">
            ${h}
          </button>
        </li>
      `}).join(""),i=`
    <ul class="category-list" id="category-list">
      ${s}
      ${n}
    </ul>
  `;return`${a}${i}`}const d=document.querySelector(".js-desserts-list"),g=document.querySelector(".js-load-more"),b=document.querySelector(".js-loader"),E=document.querySelector(".js-categories-wrapper");let p=1,m="all";const S=8;let f=!1;function $(e){b&&(e?b.classList.remove("loader-hidden"):b.classList.add("loader-hidden"))}async function x(){try{const e=await N();E?(E.innerHTML=T(e),F()):console.error("Клас .js-categories-wrapper не знайдено в DOM"),g&&g.addEventListener("click",V),await v()}catch(e){console.error("Initialization error:",e),q("Failed to load categories. Please try again later.")}}function F(){const e=document.querySelector("#category-select"),t=document.querySelector("#category-list");e&&e.addEventListener("change",z),t&&t.addEventListener("click",U)}async function z(e){const t=e.target.value;if(t===m||f)return;const r=document.querySelector("#category-list");if(r){const a=r.querySelector(".category-btn.active");a&&a.classList.remove("active");const s=r.querySelector(`.category-btn[data-category="${t}"]`);s&&s.classList.add("active")}p=1,m=t,await v()}async function U(e){const t=e.target.closest(".category-btn");if(!t||t.classList.contains("active")||f)return;const r=t.dataset.category,a=document.querySelector("#category-list");if(a){const n=a.querySelector(".category-btn.active");n&&n.classList.remove("active")}t.classList.add("active");const s=document.querySelector("#category-select");s&&(s.value=r),p=1,m=r,await v()}async function V(){f||(p+=1,await v(),Z())}async function v(){if(!f){f=!0,$(!0);try{const e=await P(p,S,m),t=e.desserts||[],r=e.totalItems||0;if(t.length===0&&p===1){d&&(d.innerHTML='<p class="no-desserts">На жаль, десертів у цій категорії не знайдено.</p>'),g&&(g.style.display="none");return}const a=H(t);if(d&&(p===1?d.innerHTML=a:d.insertAdjacentHTML("beforeend",a)),g){const s=Math.ceil(r/S);p>=s||t.length===0?g.style.display="none":g.style.display="block"}}catch(e){console.error("Error loading desserts:",e),q("Server error. Failed to load desserts.")}finally{f=!1,$(!1)}}}function q(e){L.error({title:"Error",message:e,position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"fadeInDown"})}function Z(){const e=d==null?void 0:d.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}x();new _(".faq-list",{duration:300,showMultiple:!1,openOnInit:[0],elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel",activeClass:"is-active",beforeOpen:e=>{document.querySelectorAll(".faq-item").forEach(r=>{r!==e&&r.classList.remove("is-active")})}});const G="https://deserts-store.b.goit.study/api/orders",c=document.getElementById("modal-form"),l=c==null?void 0:c.querySelector(".modal-form__form"),K=()=>{c&&(c.hidden=!1,document.body.style.overflow="hidden")},w=()=>{c&&(c.hidden=!0,document.body.style.overflow="")};document.addEventListener("click",e=>{if(e.target.closest("#modal-form [data-modal-close]")){w();return}const t=e.target.closest('[data-modal-target="modal-form"]');t&&(t.dataset.dessertId&&(c.dataset.dessertId=t.dataset.dessertId),K())});document.addEventListener("keydown",e=>{e.key==="Escape"&&c&&!c.hidden&&w()});const y=l?[...l.querySelectorAll(".modal-form__input, .modal-form__textarea")]:[],W=/^380\d{9}$/,I=e=>e.validity.valueMissing?"Заповніть це поле":e.type==="tel"&&!W.test(e.value.replace(/\D/g,""))?e.title||"Невірний формат":"",j=(e,t)=>{e.classList.toggle("is-invalid",!!t);const r=e.parentElement.querySelector(".modal-form__error");r&&(r.textContent=t)},B=e=>{const t=I(e);return j(e,t),!t};y.forEach(e=>{e.addEventListener("input",()=>B(e))});l==null||l.addEventListener("submit",async e=>{var s,n,i;if(e.preventDefault(),!y.map(B).every(Boolean)){(s=y.find(o=>I(o)))==null||s.focus();return}const r=l.querySelector(".modal-form__submit"),a={name:l.name.value.trim(),phone:l.phone.value.replace(/\D/g,""),dessertId:c.dataset.dessertId??null,comment:l.comment.value.trim()};r.disabled=!0;try{const{data:o}=await C.post(G,a);L.success({title:"Готово",message:`Замовлення №${o.orderNum} на "${o.dessertName}" успішно оформлено!`}),l.reset(),y.forEach(u=>j(u,"")),w()}catch(o){const u=((i=(n=o.response)==null?void 0:n.data)==null?void 0:i.message)||"Не вдалося оформити замовлення";L.error({title:"Помилка",message:u})}finally{r.disabled=!1}});new O(".swiper",{modules:[k,D],slidesPerView:2,spaceBetween:24,loop:!0,direction:"horizontal",pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{enabled:!0}}});
//# sourceMappingURL=index.js.map
