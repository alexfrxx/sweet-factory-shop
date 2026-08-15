import{a as M,i as L}from"./assets/vendor-BOGmpjFQ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const C=M.create({baseURL:"https://deserts-store.b.goit.study/api"});async function B(){return(await C.get("/categories")).data}async function O(e=1,t=8,s=""){const a={page:e,limit:t};return s&&s!=="all"&&(a.category=s),(await C.get("/desserts",{params:a})).data}function D(e){const{_id:t,name:s,category:a,description:r,price:n,image:i}=e,o=typeof a=="object"?a.name:a;return`
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
        <p class="dessert-card-category">${o}</p>
        <h3 class="dessert-card-title">${s}</h3>
        <p class="dessert-card-description">${r}</p>
        </div>

          <div class="dessert-card-footer">
            <span class="dessert-card-price">${n} ₴</span>

            <button 
              class="dessert-card-btn btn js-open-modal" 
              type="button" 
              data-id="${t}"
              aria-label="Order ${s} dessert"
            >
              <svg class="dessert-card-icon" width="24" height="24">
                <use href="./img/sprite.svg#arrow-up"></use>
              </svg>
            </button>
          </div>
        </div>

      </article>
    </li>
  `}function k(e=[]){return e.map(D).join("")}function N(e=[]){const t='<option value="all" selected>Всі десерти</option>',s=e.map(o=>{const u=typeof o=="object"?o._id||o.name:o,h=typeof o=="object"?o.name:o;return`<option value="${u}">${h}</option>`}).join(""),a=`
    <select class="category-select" id="category-select" aria-label="Select dessert category">
      ${t}
      ${s}
    </select>
  `,r=`
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
      ${r}
      ${n}
    </ul>
  `;return`${a}${i}`}const d=document.querySelector(".js-desserts-list"),y=document.querySelector(".js-load-more"),b=document.querySelector(".js-loader"),S=document.querySelector(".js-categories-wrapper");let g=1,p="all";const w=8;let f=!1;function $(e){b&&(e?b.classList.remove("loader-hidden"):b.classList.add("loader-hidden"))}async function P(){try{const e=await B();S?(S.innerHTML=N(e),R()):console.error("Клас .js-categories-wrapper не знайдено в DOM"),y&&y.addEventListener("click",A),await v()}catch(e){console.error("Initialization error:",e),q("Failed to load categories. Please try again later.")}}function R(){const e=document.querySelector("#category-select"),t=document.querySelector("#category-list");e&&e.addEventListener("change",H),t&&t.addEventListener("click",T)}async function H(e){const t=e.target.value;if(t===p||f)return;const s=document.querySelector("#category-list");if(s){const a=s.querySelector(".category-btn.active");a&&a.classList.remove("active");const r=s.querySelector(`.category-btn[data-category="${t}"]`);r&&r.classList.add("active")}g=1,p=t,await v()}async function T(e){const t=e.target.closest(".category-btn");if(!t||t.classList.contains("active")||f)return;const s=t.dataset.category,a=document.querySelector("#category-list");if(a){const n=a.querySelector(".category-btn.active");n&&n.classList.remove("active")}t.classList.add("active");const r=document.querySelector("#category-select");r&&(r.value=s),g=1,p=s,await v()}async function A(){f||(g+=1,await v(),F())}async function v(){if(!f){f=!0,$(!0);try{const e=await O(g,w,p),t=e.desserts||[],s=e.totalItems||0;if(t.length===0&&g===1){d&&(d.innerHTML='<p class="no-desserts">На жаль, десертів у цій категорії не знайдено.</p>'),y&&(y.style.display="none");return}const a=k(t);if(d&&(g===1?d.innerHTML=a:d.insertAdjacentHTML("beforeend",a)),y){const r=Math.ceil(s/w);g>=r||t.length===0?y.style.display="none":y.style.display="block"}}catch(e){console.error("Error loading desserts:",e),q("Server error. Failed to load desserts.")}finally{f=!1,$(!1)}}}function q(e){L.error({title:"Error",message:e,position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"fadeInDown"})}function F(){const e=d==null?void 0:d.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}P();const x="https://deserts-store.b.goit.study/api/orders",c=document.getElementById("modal-form"),l=c==null?void 0:c.querySelector(".modal-form__form"),z=()=>{c&&(c.hidden=!1,document.body.style.overflow="hidden")},E=()=>{c&&(c.hidden=!0,document.body.style.overflow="")};document.addEventListener("click",e=>{if(e.target.closest("#modal-form [data-modal-close]")){E();return}const t=e.target.closest('[data-modal-target="modal-form"]');t&&(t.dataset.dessertId&&(c.dataset.dessertId=t.dataset.dessertId),z())});document.addEventListener("keydown",e=>{e.key==="Escape"&&c&&!c.hidden&&E()});const m=l?[...l.querySelectorAll(".modal-form__input, .modal-form__textarea")]:[],U=/^380\d{9}$/,I=e=>e.validity.valueMissing?"Заповніть це поле":e.type==="tel"&&!U.test(e.value.replace(/\D/g,""))?e.title||"Невірний формат":"",j=(e,t)=>{e.classList.toggle("is-invalid",!!t);const s=e.parentElement.querySelector(".modal-form__error");s&&(s.textContent=t)},_=e=>{const t=I(e);return j(e,t),!t};m.forEach(e=>{e.addEventListener("input",()=>_(e))});l==null||l.addEventListener("submit",async e=>{var r,n,i;if(e.preventDefault(),!m.map(_).every(Boolean)){(r=m.find(o=>I(o)))==null||r.focus();return}const s=l.querySelector(".modal-form__submit"),a={name:l.name.value.trim(),phone:l.phone.value.replace(/\D/g,""),dessertId:c.dataset.dessertId??null,comment:l.comment.value.trim()};s.disabled=!0;try{const{data:o}=await M.post(x,a);L.success({title:"Готово",message:`Замовлення №${o.orderNum} на "${o.dessertName}" успішно оформлено!`}),l.reset(),m.forEach(u=>j(u,"")),E()}catch(o){const u=((i=(n=o.response)==null?void 0:n.data)==null?void 0:i.message)||"Не вдалося оформити замовлення";L.error({title:"Помилка",message:u})}finally{s.disabled=!1}});
//# sourceMappingURL=index.js.map
