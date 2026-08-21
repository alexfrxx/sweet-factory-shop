import{a as N,i as h,A as K,S as M,N as C,P as B}from"./assets/vendor-C4KMXNvd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const b=N.create({baseURL:"https://deserts-store.b.goit.study/api"});async function Q(){return(await b.get("/categories")).data}async function W(e=1,t=8,r=""){const o={page:e,limit:t};return r&&r!=="all"&&(o.category=r),(await b.get("/desserts",{params:o})).data}async function X(e){return(await b.get(`/desserts/${e}`)).data}async function J(e=6,t=1){return(await b.get("/feedbacks",{params:{limit:e,page:t}})).data}async function Y(e=1,t=7){return(await b.get("/desserts?type=popular",{params:{page:e,limit:t}})).data}const j=document.querySelector(".mobile-menu"),I=document.querySelector(".burger-btn"),Z=document.querySelector(".close-btn");document.querySelector(".header-btn");I.addEventListener("click",te);Z.addEventListener("click",w);j.addEventListener("click",e=>{e.target.classList.contains("header-link")&&w(),e.target.classList.contains("header-btn")&&w()});document.addEventListener("keydown",ee);function ee(e){e.key==="Escape"&&w()}function te(){j.classList.add("is-open"),I.setAttribute("aria-expanded","true"),document.body.classList.add("no-scroll")}function w(){j.classList.remove("is-open"),I.setAttribute("aria-expanded","false"),document.body.classList.remove("no-scroll")}const P="/sweet-factory-shop/assets/sprite-BgUQCPAO.svg";function se(e){const{_id:t,name:r,category:o,description:s,price:a,image:c}=e,n=typeof o=="object"?o.name:o;return`
    <li class="desserts-item">
      <article class="dessert-card" data-id="${t}">

        <div class="dessert-card-thumb">
          <img 
            class="dessert-card-img"
            src="${c}"
            alt="${r}"
            width="278" 
            height="209" 
            loading="lazy" 
          />
        </div>

        <div class="dessert-card-content">
        <div class="dessert-card-wrapper">
        <p class="dessert-card-category">${n}</p>
        <h3 class="dessert-card-title">${r}</h3>
        <p class="dessert-card-description">${s}</p>
        </div>

          <div class="dessert-card-footer">
            <span class="dessert-card-price">${a} ₴</span>

            <button 
              class="dessert-card-btn btn js-open-modal" 
              type="button" 
              data-id="${t}"
              aria-label="Order ${r} dessert"
            >
              <svg class="dessert-card-icon" width="24" height="24">
                 <use href="${P}#arrow-up"></use>
              </svg>
            </button>
          </div>
        </div>

      </article>
    </li>
  `}function re(e=[]){return e.map(se).join("")}function oe(e=[]){const t='<option value="all" selected>Всі десерти</option>',r=e.map(n=>{const p=typeof n=="object"?n._id||n.name:n,E=typeof n=="object"?n.name:n;return`<option value="${p}">${E}</option>`}).join(""),o=`
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
  `,a=e.map(n=>{const p=typeof n=="object"?n._id||n.name:n,E=typeof n=="object"?n.name:n;return`
        <li class="category-item">
          <button type="button" class="category-btn" data-category="${p}">
            ${E}
          </button>
        </li>
      `}).join(""),c=`
    <ul class="category-list" id="category-list">
      ${s}
      ${a}
    </ul>
  `;return`${o}${c}`}const d=document.querySelector(".js-desserts-list"),m=document.querySelector(".js-load-more"),$=document.querySelector(".js-loader"),x=document.querySelector(".js-categories-wrapper");let f=1,L="all";const D=8;let g=!1;function T(e){$&&(e?$.classList.remove("loader-hidden"):$.classList.add("loader-hidden"))}async function ae(){try{const e=await Q();x?(x.innerHTML=oe(e),ne()):console.error("Клас .js-categories-wrapper не знайдено в DOM"),m&&m.addEventListener("click",le),await k()}catch(e){console.error("Initialization error:",e),R("Failed to load categories. Please try again later.")}}function ne(){const e=document.querySelector("#category-select"),t=document.querySelector("#category-list");e&&e.addEventListener("change",ce),t&&t.addEventListener("click",ie)}async function ce(e){const t=e.target.value;if(t===L||g)return;const r=document.querySelector("#category-list");if(r){const o=r.querySelector(".category-btn.active");o&&o.classList.remove("active");const s=r.querySelector(`.category-btn[data-category="${t}"]`);s&&s.classList.add("active")}f=1,L=t,await k()}async function ie(e){const t=e.target.closest(".category-btn");if(!t||t.classList.contains("active")||g)return;const r=t.dataset.category,o=document.querySelector("#category-list");if(o){const a=o.querySelector(".category-btn.active");a&&a.classList.remove("active")}t.classList.add("active");const s=document.querySelector("#category-select");s&&(s.value=r),f=1,L=r,await k()}async function le(){g||(f+=1,await k(),de())}async function k(){if(!g){g=!0,T(!0);try{const e=await W(f,D,L),t=e.desserts||[],r=e.totalItems||0;if(t.length===0&&f===1){d&&(d.innerHTML='<p class="no-desserts">На жаль, десертів у цій категорії не знайдено.</p>'),m&&(m.style.display="none");return}const o=re(t);if(d&&(f===1?d.innerHTML=o:d.insertAdjacentHTML("beforeend",o)),m){const s=Math.ceil(r/D);f>=s||t.length===0?m.style.display="none":m.style.display="block"}}catch(e){console.error("Error loading desserts:",e),R("Server error. Failed to load desserts.")}finally{g=!1,T(!1)}}}function R(e){h.error({title:"Error",message:e,position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"fadeInDown"})}function de(){const e=d==null?void 0:d.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}ae();new K(".faq-list",{duration:300,showMultiple:!1,openOnInit:[0],elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel",activeClass:"is-active",beforeOpen:e=>{document.querySelectorAll(".faq-item").forEach(r=>{r!==e&&r.classList.remove("is-active")})}});const ue="https://deserts-store.b.goit.study/api/orders",i=document.getElementById("modal-form"),l=i==null?void 0:i.querySelector(".modal-form-form"),pe=()=>{i&&(i.hidden=!1,document.body.style.overflow="hidden")},O=()=>{i&&(i.hidden=!0,document.body.style.overflow="")};document.addEventListener("click",e=>{if(e.target.closest("#modal-form [data-modal-close]")){O();return}const t=e.target.closest('[data-modal-target="modal-form"]');t&&(t.dataset.dessertId&&(i.dataset.dessertId=t.dataset.dessertId),pe())});document.addEventListener("keydown",e=>{e.key==="Escape"&&i&&!i.hidden&&O()});const v=l?[...l.querySelectorAll(".modal-form-input, .modal-form-textarea")]:[],me=/^380\d{9}$/,F=e=>e.validity.valueMissing?"Заповніть це поле":e.type==="tel"&&!me.test(e.value.replace(/\D/g,""))?e.title||"Невірний формат":"",V=(e,t)=>{e.classList.toggle("is-invalid",!!t);const r=e.parentElement.querySelector(".modal-form-error");r&&(r.textContent=t)},z=e=>{const t=F(e);return V(e,t),!t};v.forEach(e=>{e.addEventListener("input",()=>z(e))});l==null||l.addEventListener("submit",async e=>{var s,a,c;if(e.preventDefault(),!v.map(z).every(Boolean)){(s=v.find(n=>F(n)))==null||s.focus();return}const r=l.querySelector(".modal-form-submit"),o={name:l.name.value.trim(),phone:l.phone.value.replace(/\D/g,""),dessertId:i.dataset.dessertId??null,comment:l.comment.value.trim()};r.disabled=!0;try{const{data:n}=await N.post(ue,o);h.success({title:"Готово",message:`Замовлення №${n.orderNum} на "${n.dessertName}" успішно оформлено!`}),l.reset(),v.forEach(p=>V(p,"")),O()}catch(n){const p=((c=(a=n.response)==null?void 0:a.data)==null?void 0:c.message)||"Не вдалося оформити замовлення";h.error({title:"Помилка",message:p})}finally{r.disabled=!1}});const fe=document.querySelector(".js-desserts-list"),A=document.querySelector(".desserts-modal-img"),ge=document.querySelector(".desserts-modal-title"),ye=document.querySelector(".desserts-modal-price"),be=document.querySelector(".modal-wrap-rating"),ve=document.querySelector(".desserts-modal-descr"),he=document.querySelector(".desserts-modal-ingredients"),u=document.querySelector("#desserts-modal"),we=u.querySelector("[data-modal-close]"),_=u.querySelector(".desserts-modal-btn"),y=document.querySelector(".js-loader");function H(e){y&&(e?y.classList.remove("loader-hidden"):y.classList.add("loader-hidden"))}fe.addEventListener("click",U);async function U(e){const t=e.target.closest(".js-open-modal");if(!t)return;const r=t.dataset.id;y.classList.add("modal-loader"),H(!0);try{const o=await X(r);A.src=o.image,A.alt=o.name,ge.textContent=o.name,ye.textContent=`${o.price} ₴`,ve.textContent=o.description,he.innerHTML=`<span>Склад</span>: ${o.composition}`,be.innerHTML=q(o.rate),_.dataset.dessertId=o._id,u.hidden=!1,document.body.style.overflow="hidden"}catch(o){console.error("Error loading dessert:",o),h.error({title:"Помилка",message:"Не вдалося завантажити інформацію про десерт.",position:"topRight",timeout:4e3})}finally{H(!1),y.classList.remove("modal-loader")}}function q(e){const t=Math.floor(e),r=e%1!==0;let o="";for(let s=0;s<5;s++){let a="star-empty";s<t?a="star":s===t&&r&&(a="star-half"),o+=`
      <svg class="rating-star-svg" width="16" height="16">
        <use href="${P}#${a}"></use>
      </svg>
    `}return o}we.addEventListener("click",S);u.addEventListener("click",Le);document.addEventListener("keydown",ke);function S(){u.hidden=!0,document.body.style.overflow=""}function Le(e){e.target===u&&S()}function ke(e){e.key==="Escape"&&u&&!u.hidden&&S()}_.addEventListener("click",Se);function Se(){S()}const Ee=document.querySelector(".feedback-list");function $e(e){const t=e.map(({rate:r,description:o,author:s})=>`
      <li class="swiper-slide feedback-item">

        <div class="feedback-rating">
        ${q(r)}
        </div>

          <p class="feedback-description">${o}</p>
          <p class="feedback-author">${s}</p>
          

      </li>
    `).join("");Ee.innerHTML=t,q()}async function qe(){try{const e=await J();$e(e.feedbacks)}catch(e){console.error(e)}}qe();new M(".about-swiper",{modules:[C,B],enabled:!1,loop:!0,direction:"horizontal",pagination:{el:".about-section .swiper-pagination",clickable:!0},navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},breakpoints:{768:{enabled:!0,slidesPerView:2,spaceBetween:24}}});new M(".feedback-swiper",{modules:[C,B],slidesPerView:1,spaceBetween:24,loop:!0,direction:"horizontal",pagination:{el:".feedback .swiper-pagination",clickable:!0},navigation:{nextEl:".feedback-button-next",prevEl:".feedback-button-prev"},breakpoints:{768:{slidesPerView:3}}});const Me=new M(".bestsellers-swiper",{modules:[C,B],slidesPerView:1,spaceBetween:24,loop:!0,direction:"horizontal",pagination:{el:".bestsellers .swiper-pagination",clickable:!0},navigation:{nextEl:".bestsellers-button-next",prevEl:".bestsellers-button-prev"},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}}}),G=document.querySelector(".bestsellers-list");G.addEventListener("click",U);async function Ce(){try{const e=await Y();Be(e.desserts)}catch(e){console.log(e.message)}}function Be(e){const t=e.map(({_id:r,image:o,name:s,categoryName:a,description:c,price:n})=>`
    <li class="desserts-item swiper-slide">
          <article class="dessert-card bestsellers-card" data-id="${r}">
    
            <div class="dessert-card-thumb">
              <img 
                class="dessert-card-img"
                src="${o}"
                alt="${s}"
                width="278" 
                height="209" 
                loading="lazy" 
              />
            </div>
    
            <div class="dessert-card-content">
            <div class="dessert-card-wrapper">
            <p class="dessert-card-category">${a}</p>
            <h3 class="dessert-card-title">${s}</h3>
            <p class="dessert-card-description">${c}</p>
            </div>
    
              <div class="dessert-card-footer">
                <span class="dessert-card-price">${n} ₴</span>
    
                <button 
                  class="dessert-card-btn btn js-open-modal" 
                  type="button" 
                  data-id="${r}"
                  aria-label="Order ${s} dessert"
                >
                  <svg class="dessert-card-icon" width="24" height="24">
                     <use href="${P}#arrow-up"></use>
                  </svg>
                </button>
              </div>
            </div>
    
          </article>
        </li>
    `).join("");G.innerHTML=t,Me.update()}Ce();
//# sourceMappingURL=index.js.map
