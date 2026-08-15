import{a as M,i as L,S as B}from"./assets/vendor-DvgVgMNL.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const q=M.create({baseURL:"https://deserts-store.b.goit.study/api"});async function O(){return(await q.get("/categories")).data}async function D(e=1,t=8,s=""){const a={page:e,limit:t};return s&&s!=="all"&&(a.category=s),(await q.get("/desserts",{params:a})).data}const k="/sweet-factory-shop/assets/sprite-Ct-wIYJv.svg";function N(e){const{_id:t,name:s,category:a,description:r,price:n,image:i}=e,o=typeof a=="object"?a.name:a;return`
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
                 <use href="${k}#arrow-up"></use>
              </svg>
            </button>
          </div>
        </div>

      </article>
    </li>
  `}function P(e=[]){return e.map(N).join("")}function H(e=[]){const t='<option value="all" selected>Всі десерти</option>',s=e.map(o=>{const u=typeof o=="object"?o._id||o.name:o,h=typeof o=="object"?o.name:o;return`<option value="${u}">${h}</option>`}).join(""),a=`
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
  `;return`${a}${i}`}const d=document.querySelector(".js-desserts-list"),g=document.querySelector(".js-load-more"),b=document.querySelector(".js-loader"),S=document.querySelector(".js-categories-wrapper");let y=1,m="all";const E=8;let p=!1;function $(e){b&&(e?b.classList.remove("loader-hidden"):b.classList.add("loader-hidden"))}async function R(){try{const e=await O();S?(S.innerHTML=H(e),T()):console.error("Клас .js-categories-wrapper не знайдено в DOM"),g&&g.addEventListener("click",F),await v()}catch(e){console.error("Initialization error:",e),C("Failed to load categories. Please try again later.")}}function T(){const e=document.querySelector("#category-select"),t=document.querySelector("#category-list");e&&e.addEventListener("change",x),t&&t.addEventListener("click",A)}async function x(e){const t=e.target.value;if(t===m||p)return;const s=document.querySelector("#category-list");if(s){const a=s.querySelector(".category-btn.active");a&&a.classList.remove("active");const r=s.querySelector(`.category-btn[data-category="${t}"]`);r&&r.classList.add("active")}y=1,m=t,await v()}async function A(e){const t=e.target.closest(".category-btn");if(!t||t.classList.contains("active")||p)return;const s=t.dataset.category,a=document.querySelector("#category-list");if(a){const n=a.querySelector(".category-btn.active");n&&n.classList.remove("active")}t.classList.add("active");const r=document.querySelector("#category-select");r&&(r.value=s),y=1,m=s,await v()}async function F(){p||(y+=1,await v(),U())}async function v(){if(!p){p=!0,$(!0);try{const e=await D(y,E,m),t=e.desserts||[],s=e.totalItems||0;if(t.length===0&&y===1){d&&(d.innerHTML='<p class="no-desserts">На жаль, десертів у цій категорії не знайдено.</p>'),g&&(g.style.display="none");return}const a=P(t);if(d&&(y===1?d.innerHTML=a:d.insertAdjacentHTML("beforeend",a)),g){const r=Math.ceil(s/E);y>=r||t.length===0?g.style.display="none":g.style.display="block"}}catch(e){console.error("Error loading desserts:",e),C("Server error. Failed to load desserts.")}finally{p=!1,$(!1)}}}function C(e){L.error({title:"Error",message:e,position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"fadeInDown"})}function U(){const e=d==null?void 0:d.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}R();const z="https://deserts-store.b.goit.study/api/orders",c=document.getElementById("modal-form"),l=c==null?void 0:c.querySelector(".modal-form__form"),V=()=>{c&&(c.hidden=!1,document.body.style.overflow="hidden")},w=()=>{c&&(c.hidden=!0,document.body.style.overflow="")};document.addEventListener("click",e=>{if(e.target.closest("#modal-form [data-modal-close]")){w();return}const t=e.target.closest('[data-modal-target="modal-form"]');t&&(t.dataset.dessertId&&(c.dataset.dessertId=t.dataset.dessertId),V())});document.addEventListener("keydown",e=>{e.key==="Escape"&&c&&!c.hidden&&w()});const f=l?[...l.querySelectorAll(".modal-form__input, .modal-form__textarea")]:[],G=/^380\d{9}$/,_=e=>e.validity.valueMissing?"Заповніть це поле":e.type==="tel"&&!G.test(e.value.replace(/\D/g,""))?e.title||"Невірний формат":"",I=(e,t)=>{e.classList.toggle("is-invalid",!!t);const s=e.parentElement.querySelector(".modal-form__error");s&&(s.textContent=t)},j=e=>{const t=_(e);return I(e,t),!t};f.forEach(e=>{e.addEventListener("input",()=>j(e))});l==null||l.addEventListener("submit",async e=>{var r,n,i;if(e.preventDefault(),!f.map(j).every(Boolean)){(r=f.find(o=>_(o)))==null||r.focus();return}const s=l.querySelector(".modal-form__submit"),a={name:l.name.value.trim(),phone:l.phone.value.replace(/\D/g,""),dessertId:c.dataset.dessertId??null,comment:l.comment.value.trim()};s.disabled=!0;try{const{data:o}=await M.post(z,a);L.success({title:"Готово",message:`Замовлення №${o.orderNum} на "${o.dessertName}" успішно оформлено!`}),l.reset(),f.forEach(u=>I(u,"")),w()}catch(o){const u=((i=(n=o.response)==null?void 0:n.data)==null?void 0:i.message)||"Не вдалося оформити замовлення";L.error({title:"Помилка",message:u})}finally{s.disabled=!1}});const J=new B("#slider-about",{type:"loop",perPage:3,perMove:1,gap:24,pagination:!0,arrows:!0,breakpoints:{768:{destroy:!0}}});J.mount();const K=document.querySelector(".splide__arrow--prev"),W=document.querySelector(".splide__arrow--next");K.innerHTML=`
  <svg width="24" height="24">
    <use href="../img/sprite.svg#arrow-right"></use>
  </svg>
  `;W.innerHTML=`
<svg width="24" height="24">
    <use href="../img/sprite.svg#arrow-right"></use>
  </svg>
`;
//# sourceMappingURL=index.js.map
