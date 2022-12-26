import './style.scss';
import { removeLoaderUi, showLoaderUi } from './js/loader';

let items = [];
let itemsRow = document.querySelector(".items-row");
let cartBtn = document.querySelector(".cart-btn");



showLoaderUi();
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              items = json
              items.forEach(item => {
                let itemDiv = document.createElement("div");
                itemDiv.classList.add("col-10","col-sm-6","col-lg-4","col-xl-3");
                itemDiv.innerHTML = `
                  <div class="card item-card">
                    <div class="card-body d-flex flex-column">
                      <div>
                        <img src="${item.image}" class="item-img">
                      </div>
                      <p class="fw-bold text-truncate">${item.title}</p>
                      <p class="small">${item.description.substring(0,80)+"..."}</p>
                      <div class="d-flex justify-content-between align-items-center mt-auto">
                        <p class="mb-0">$ <span>${item.price}</span></p>
                        <button class="btn btn-outline-primary add-cart">
                          <i class="bi bi-cart-plus pe-none"></i> Add to card
                        </button>
                      </div>
                    </div>
                  </div>
                `;
                itemsRow.append(itemDiv);
              });
              removeLoaderUi()
            })

// ဒါကအလွယ်နည်း btn မှာ onclick ပေးပြီးရေးတာ window ခေါ်ရေးရတာက module ရေးထုံးတွေနဲ့ရေးထားလို့ variable တွေကို အောက်မှာ ခေါ်လို့မရလို့ window ခံပြီးရေးရတာ
// window.addToCart = event =>{
//   console.log("add to cart" , event.target)
// }

itemsRow.addEventListener('click', (e) =>{
  if(e.target.classList.contains('add-cart')){

    // ဒီနှစ်ခုက အတူတူပဲ closest method ကိုသုံးပြီး အလွယ်ရေးလို့ရ
    // console.log(e.target.parentNode.parentNode.parentNode.querySelector(".item-img"));
    // console.log(e.target.closest(".item-card").querySelector('.item-img'));

    let currentItemCard = e.target.closest(".item-card");
    let currentItemImg = currentItemCard.querySelector(".item-img");

    // let newImg = document.createElement("img");
    let newImg = new Image();
    newImg.src = currentItemImg.src;
    newImg.style.top = currentItemImg.getBoundingClientRect().top + "px";
    newImg.style.left = currentItemImg.getBoundingClientRect().left + "px";
    newImg.style.height = currentItemImg.getBoundingClientRect().height + "px";
    newImg.style.position = "fixed";
    newImg.style.zIndex = 2000;
    newImg.style.transition = .8 + "s";

    document.body.append(newImg)

    setTimeout(() => {
      newImg.style.height = 0 + "px";
      newImg.style.transform = "rotate(360deg)";
      newImg.style.top = cartBtn.getBoundingClientRect().top + 20 + "px";
      newImg.style.left = cartBtn.getBoundingClientRect().left + 20 + "px";
    }, 10);

    setTimeout(() => {
      cartBtn.classList.add("animate__tada");
      cartBtn.addEventListener('animationend', _=> cartBtn.classList.remove("animate__tada"));
    }, 800);
  };
});

// ဒီလိုရေးလို့မရပါဘူး ဘာလို့ဆို btn တွေကစစချင်းထဲက ရှိတာမဟုတ်ဘူး loop ပတ်ပြီးမှ ပေါ်လာတာမို့လို့
// const addCarts = document.querySelectorAll(".add-cart");
// addCarts.forEach(addCart=>{
//   addCart.addEventListener("click",_=>{
//     console.log("add to cart")
//   })
// });