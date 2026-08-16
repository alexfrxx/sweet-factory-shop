import{a as $,i as L,A as B,S as O}from"./assets/vendor-CUeqsvwX.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();const C=$.create({baseURL:"https://deserts-store.b.goit.study/api"});async function D(){return(await C.get("/categories")).data}async function k(e=1,t=8,r=""){const a={page:e,limit:t};return r&&r!=="all"&&(a.category=r),(await C.get("/desserts",{params:a})).data}const N="/sweet-factory-shop/assets/sprite-CLhZlZvI.svg";function P(e){const{_id:t,name:r,category:a,description:s,price:n,image:i}=e,o=typeof a=="object"?a.name:a;return`
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
                 <use href="${N}#arrow-up"></use>
              </svg>
            </button>
          </div>
        </div>

      </article>
    </li>
  `}function A(e=[]){return e.map(P).join("")}function H(e=[]){const t='<option value="all" selected>Всі десерти</option>',r=e.map(o=>{const u=typeof o=="object"?o._id||o.name:o,h=typeof o=="object"?o.name:o;return`<option value="${u}">${h}</option>`}).join(""),a=`
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
  `;return`${a}${i}`}const d=document.querySelector(".js-desserts-list"),g=document.querySelector(".js-load-more"),b=document.querySelector(".js-loader"),S=document.querySelector(".js-categories-wrapper");let p=1,m="all";const E=8;let y=!1;function M(e){b&&(e?b.classList.remove("loader-hidden"):b.classList.add("loader-hidden"))}async function R(){try{const e=await D();S?(S.innerHTML=H(e),T()):console.error("Клас .js-categories-wrapper не знайдено в DOM"),g&&g.addEventListener("click",U),await v()}catch(e){console.error("Initialization error:",e),q("Failed to load categories. Please try again later.")}}function T(){const e=document.querySelector("#category-select"),t=document.querySelector("#category-list");e&&e.addEventListener("change",x),t&&t.addEventListener("click",F)}async function x(e){const t=e.target.value;if(t===m||y)return;const r=document.querySelector("#category-list");if(r){const a=r.querySelector(".category-btn.active");a&&a.classList.remove("active");const s=r.querySelector(`.category-btn[data-category="${t}"]`);s&&s.classList.add("active")}p=1,m=t,await v()}async function F(e){const t=e.target.closest(".category-btn");if(!t||t.classList.contains("active")||y)return;const r=t.dataset.category,a=document.querySelector("#category-list");if(a){const n=a.querySelector(".category-btn.active");n&&n.classList.remove("active")}t.classList.add("active");const s=document.querySelector("#category-select");s&&(s.value=r),p=1,m=r,await v()}async function U(){y||(p+=1,await v(),z())}async function v(){if(!y){y=!0,M(!0);try{const e=await k(p,E,m),t=e.desserts||[],r=e.totalItems||0;if(t.length===0&&p===1){d&&(d.innerHTML='<p class="no-desserts">На жаль, десертів у цій категорії не знайдено.</p>'),g&&(g.style.display="none");return}const a=A(t);if(d&&(p===1?d.innerHTML=a:d.insertAdjacentHTML("beforeend",a)),g){const s=Math.ceil(r/E);p>=s||t.length===0?g.style.display="none":g.style.display="block"}}catch(e){console.error("Error loading desserts:",e),q("Server error. Failed to load desserts.")}finally{y=!1,M(!1)}}}function q(e){L.error({title:"Error",message:e,position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"fadeInDown"})}function z(){const e=d==null?void 0:d.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}R();new B(".faq-list",{duration:300,showMultiple:!1,openOnInit:[0],elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel",activeClass:"is-active",beforeOpen:e=>{document.querySelectorAll(".faq-item").forEach(r=>{r!==e&&r.classList.remove("is-active")})}});const V="https://deserts-store.b.goit.study/api/orders",c=document.getElementById("modal-form"),l=c==null?void 0:c.querySelector(".modal-form__form"),Z=()=>{c&&(c.hidden=!1,document.body.style.overflow="hidden")},w=()=>{c&&(c.hidden=!0,document.body.style.overflow="")};document.addEventListener("click",e=>{if(e.target.closest("#modal-form [data-modal-close]")){w();return}const t=e.target.closest('[data-modal-target="modal-form"]');t&&(t.dataset.dessertId&&(c.dataset.dessertId=t.dataset.dessertId),Z())});document.addEventListener("keydown",e=>{e.key==="Escape"&&c&&!c.hidden&&w()});const f=l?[...l.querySelectorAll(".modal-form__input, .modal-form__textarea")]:[],G=/^380\d{9}$/,_=e=>e.validity.valueMissing?"Заповніть це поле":e.type==="tel"&&!G.test(e.value.replace(/\D/g,""))?e.title||"Невірний формат":"",I=(e,t)=>{e.classList.toggle("is-invalid",!!t);const r=e.parentElement.querySelector(".modal-form__error");r&&(r.textContent=t)},j=e=>{const t=_(e);return I(e,t),!t};f.forEach(e=>{e.addEventListener("input",()=>j(e))});l==null||l.addEventListener("submit",async e=>{var s,n,i;if(e.preventDefault(),!f.map(j).every(Boolean)){(s=f.find(o=>_(o)))==null||s.focus();return}const r=l.querySelector(".modal-form__submit"),a={name:l.name.value.trim(),phone:l.phone.value.replace(/\D/g,""),dessertId:c.dataset.dessertId??null,comment:l.comment.value.trim()};r.disabled=!0;try{const{data:o}=await $.post(V,a);L.success({title:"Готово",message:`Замовлення №${o.orderNum} на "${o.dessertName}" успішно оформлено!`}),l.reset(),f.forEach(u=>I(u,"")),w()}catch(o){const u=((i=(n=o.response)==null?void 0:n.data)==null?void 0:i.message)||"Не вдалося оформити замовлення";L.error({title:"Помилка",message:u})}finally{r.disabled=!1}});const K=new O("#slider-about",{type:"loop",perPage:3,perMove:1,gap:24,pagination:!0,arrows:!0,breakpoints:{768:{destroy:!0}}});K.mount();const W=document.querySelector(".splide__arrow--prev"),X=document.querySelector(".splide__arrow--next");W.innerHTML=`
  <svg width="24" height="24">
    <use href="../img/sprite.svg#arrow-right"></use>
  </svg>
  `;X.innerHTML=`
<svg width="24" height="24">
    <use href="../img/sprite.svg#arrow-right"></use>
  </svg>
`;
//# sourceMappingURL=index.js.map
