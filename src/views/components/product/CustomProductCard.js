class CustomProductCard extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root to the element.
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Parse product data from attribute
    this.product = this.product || JSON.parse(this.getAttribute('product'));

    // Render the component
    this.render();
  }

  render() {
    // Create the template for the component
    this.shadowRoot.innerHTML = `
      <style>
        .custom-product-card {
          border: 1px solid #ccc;
          padding: 16px;
          margin: 16px;
          color: #000; /* Black text */
        }
        .custom-product-card-image {
          text-align: center;
          margin-bottom: 16px;
        }
        .custom-product-card-image img {
          max-width: 100%;
          height: auto;
        }
        .custom-product-card-title {
          font-size: 20px;
          margin: 0 0 8px;
        }
        .custom-product-card-title a {
          text-decoration: none;
          color: inherit;
        }
        .custom-product-card-description {
          font-size: 14px;
          margin: 0 0 16px;
        }
        .custom-product-card-add-to-cart-btn {
          background-color: #a5804a; /* Button color */
          color: #fff; /* White text */
          border: none;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
        }
        .custom-product-card-add-to-cart-btn:hover {
          background-color: #8e6c3a; /* Darker button color on hover */
        }
      </style>
      <div class="custom-product-card">
        <div class="custom-product-card-image">
          <a href="${this.product.url}">
            <img src="${this.product.image?.url}" alt="${this.product.image?.alt}" />
          </a>
        </div>
        <div class="custom-product-card-content">
          <h3 class="custom-product-card-title"><a href="${this.product.url}">${this.product.name}</a></h3>
          <p class="custom-product-card-description">${this.product.description}</p>
          <button class="custom-product-card-add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    `;
  }
}

customElements.define('custom-product-card', CustomProductCard);


// class CustomProductCard extends HTMLElement {
//     constructor() {
//       super();
//     }
  
//     connectedCallback() {
//       this.product = this.product || JSON.parse(this.getAttribute('product'));
  
//       if (window.app?.status === 'ready') {
//         this.onReady();
//       } else {
//         document.addEventListener('theme::ready', () => this.onReady());
//       }
//     }
  
//     onReady() {
//       this.render();
//     }
  
//     render() {
//       this.innerHTML = `
//         <div class="product-card">
//           <img src="${this.product.image}" alt="${this.product.name}">
//           <div class="product-info">
//             <h3>${this.product.name}</h3>
//             <p>${this.product.price}</p>
//           </div>
//         </div>
//       `;
//     }
//   }
  
//   customElements.define('custom-product-card', CustomProductCard);
  
// class CustomProductCard extends HTMLElement {
//   constructor(){
//     super()
//   }
  
//   connectedCallback(){
//     this.product = this.product || JSON.parse(this.getAttribute('product')); 

//     if (window.app?.status === 'ready') {
//       this.onReady();
//     } else {
//       document.addEventListener('theme::ready', () => this.onReady())
//     }
//   }

//   onReady(){
//     this.fitImageHeight = salla.config.get('store.settings.product.fit_type');
//     salla.wishlist.event.onAdded((event, id) => this.toggleFavoriteIcon(id));
//     salla.wishlist.event.onRemoved((event,id) => this.toggleFavoriteIcon(id, false));
//     this.placeholder = salla.url.asset(salla.config.get('theme.settings.placeholder'));
//     this.getProps()

//     this.source = salla.config.get("page.slug");

//     if (this.source == "landing-page") {
//       this.hideAddBtn = true;
//       this.showQuantity = true;
//     }

//     salla.lang.onLoaded(() => {
//       this.remained = salla.lang.get('pages.products.remained');
//       this.donationAmount = salla.lang.get('pages.products.donation_amount');
//       this.startingPrice = salla.lang.get('pages.products.starting_price');
//       this.addToCart = salla.lang.get('pages.cart.add_to_cart');
//       this.outOfStock = salla.lang.get('pages.products.out_of_stock');

//       this.render();
//     })
    
//     this.render()
//   }

//   initCircleBar() {
//     let qty = this.product.quantity,
//       total = this.product.quantity > 100 ? this.product.quantity * 2 : 100,
//       roundPercent = (qty / total) * 100,
//       bar = this.querySelector('.s-product-card-content-pie-svg-bar'),
//       strokeDashOffsetValue = 100 - roundPercent;
//     bar.style.strokeDashoffset = strokeDashOffsetValue;
//   }

//   toggleFavoriteIcon(id, isAdded = true) {
//     document.querySelectorAll('.s-product-card-wishlist-btn[data-id="' + id + '"]').forEach(btn => {
//       app.toggleElementClassIf(btn, 's-product-card-wishlist-added', 'not-added', () => isAdded);
//       app.toggleElementClassIf(btn, 'pulse-anime', 'un-favorited', () => isAdded);
//     });
//   }

//   formatDate(date) {
//     let d = new Date(date);
//     return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
//   } 

//   getProductBadge() {
//     if (this.product.promotion_title) {
//       return `<div class="s-product-card-promotion-title">${this.product.promotion_title}</div>`
//     }
//     if (this.showQuantity && this.product?.quantity) {
//       return `<div class="s-product-card-quantity">${this.remained} ${salla.helpers.number(this.product?.quantity)}</div>`
//     }
//     if (this.showQuantity && this.product?.is_out_of_stock) {
//       return `<div class="s-product-card-out-badge">${this.outOfStock}</div>`
//     }
//     return '';
//   }

//   getPriceFormat(price) {
//     if (!price || price == 0) {
//       return salla.config.get('store.settings.product.show_price_as_dash')?'-':'';
//     }

//     return salla.money(price);
//   }

//   getProductPrice() {
//     let price = '';
//     if (this.product.is_on_sale) {
//       price = `<div class="s-product-card-sale-price">
//                 <h4>${this.getPriceFormat(this.product.sale_price)}</h4>
//                 <span>${this.getPriceFormat(this.product?.regular_price)}</span>
//               </div>`;
//     }
//     else if (this.product.starting_price) {
//       price = `<div class="s-product-card-starting-price">
//                   <p>${this.startingPrice}</p>
//                   <h4> ${this.getPriceFormat(this.product?.starting_price)} </h4>
//               </div>`
//     }
//     else{
//       price = `<h4 class="s-product-card-price">${this.getPriceFormat(this.product?.price)}</h4>`
//     }

//     return price;
//   }

//   getAddButtonLabel() {
//     if (this.product.status === 'sale' && this.product.type === 'booking') {
//       return salla.lang.get('pages.cart.book_now'); 
//     }

//     if (this.product.status === 'sale') {
//       return salla.lang.get('pages.cart.add_to_cart');
//     }

//     if (this.product.type !== 'donating') {
//       return salla.lang.get('pages.products.out_of_stock');
//     }

//     return salla.lang.get('pages.products.donation_exceed');
//   }

//   getProps(){
//     this.horizontal = this.hasAttribute('horizontal');
//     this.shadowOnHover = this.hasAttribute('shadowOnHover');
//     this.hideAddBtn = this.hasAttribute('hideAddBtn');
//     this.fullImage = this.hasAttribute('fullImage');
//     this.minimal = this.hasAttribute('minimal');
//     this.isSpecial = this.hasAttribute('isSpecial');
//     this.showQuantity = this.hasAttribute('showQuantity');
//   }

//   render(){
//     this.classList.add('s-product-card-entry'); 
//     this.setAttribute('id', this.product.id);
//     !this.horizontal && !this.fullImage && !this.minimal? this.classList.add('s-product-card-vertical') : '';
//     this.horizontal && !this.fullImage && !this.minimal? this.classList.add('s-product-card-horizontal') : '';
//     this.fitImageHeight && !this.isSpecial && !this.fullImage && !this.minimal? this.classList.add('s-product-card-fit-height') : '';
//     this.isSpecial? this.classList.add('s-product-card-special') : '';
//     this.fullImage? this.classList.add('s-product-card-full-image') : '';
//     this.minimal? this.classList.add('s-product-card-minimal') : '';
//     this.product?.donation?  this.classList.add('s-product-card-donation') : '';
//     this.shadowOnHover?  this.classList.add('s-product-card-shadow') : '';
//     this.product?.is_out_of_stock?  this.classList.add('s-product-card-out-of-stock') : '';

//     this.innerHTML = `
//       <div class="${!this.fullImage ? 's-product-card-image' : 's-product-card-image-full'}">
//         <a href="${this.product?.url}">
//           <img class="s-product-card-image-${salla.url.is_placeholder(this.product?.image?.url)
//             ? 'contain'
//             : this.fitImageHeight
//               ? this.fitImageHeight
//               : 'cover'} lazy"
//             src=${this.placeholder}
//             alt=${this.product?.image?.alt}
//             data-src=${this.product?.image?.url || this.product?.thumbnail}
//           />
//           ${!this.fullImage && !this.minimal ? this.getProductBadge() : ''}
//         </a>
//         ${this.fullImage ? `<a href="${this.product?.url}" class="s-product-card-overlay"></a>`:''}
//         ${!this.horizontal && !this.fullImage ?
//           `<salla-button
//             shape="icon"
//             fill="outline"
//             color="light"
//             name="product-name-${this.product.id}"
//             aria-label="Add or remove to wishlist"
//             class="s-product-card-wishlist-btn animated "
//             onclick="salla.wishlist.toggle(${this.product.id})"
//             data-id="${this.product.id}">
//             <i class="sicon-heart"></i>
//           </salla-button>` : ``
//         }
//       </div>
//       <div class="s-product-card-content">
//         ${this.isSpecial && this.product?.quantity ?
//           `<div class="s-product-card-content-pie">
//             <span>
//               <b>${salla.helpers.number(this.product?.quantity)}</b>
//               ${this.remained}
//             </span>
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1 36 34" class="s-product-card-content-pie-svg">
//               <circle cx="16" cy="16" r="15.9155" class="s-product-card-content-pie-svg-base" />
//               <circle cx="16" cy="16" r="15.9155" class="s-product-card-content-pie-svg-bar" />
//             </svg>
//           </div>`
//           : ``}

//         <div class="s-product-card-content-main ${this.isSpecial ? 's-product-card-content-extra-padding' : ''}">
//           <h3 class="s-product-card-content-title">
//             <a href="${this.product?.url}">${this.product?.name}</a>
//           </h3>

//           ${this.product?.subtitle && !this.minimal ?
//             `<p class="s-product-card-content-subtitle">${this.product?.subtitle}</p>`
//             : ``}
//         </div>
//         ${this.product?.donation && !this.minimal && !this.fullImage ?
//           `<salla-progress-bar donation=${this.product?.donation} />
//           <div class="s-product-card-donation-input">
//             ${this.product?.donation?.can_donate ?
//               `<label htmlFor="donation-amount">${this.donationAmount} <span>*</span></label>,
//               <input
//                 type="text"
//                 onInput="${e => {
//                   salla.helpers.inputDigitsOnly(e.target);
//                   this.addBtn.donatingAmount = (e.target).value;
//                 }}"
//                 id="donation-amount"
//                 name="donating_amount"
//                 class="s-form-control"
//                 placeholder="${this.donationAmount}" />`
//               : ``}
//           </div>`
//           : ''}
//         <div class="s-product-card-content-sub ${this.isSpecial ? 's-product-card-content-extra-padding' : ''}">
//           ${this.getProductPrice()}
//           ${this.product?.rating?.stars && !this.minimal ?
//             `<div class="s-product-card-rating">
//               <i class="sicon-star2"></i>
//               <span>${this.product.rating.stars}</span>
//             </div>`
//              : ``}
//         </div>

//         ${this.isSpecial && this.product.discount_ends
//           ? `<salla-count-down date="${this.formatDate(this.product.discount_ends)}" end-of-day=${true} boxed=${true}
//             labeled=${true} />`
//           : ``}

//         ${!this.hideAddBtn ?
//           `<div class="s-product-card-content-footer gap-2">
//             <salla-add-product-button fill="outline" width="wide"
//               product-id="${this.product.id}"
//               product-status="${this.product.status}"
//               product-type="${this.product.type}">
//               ${this.product.status == 'sale' ? 
//                   `<i class="text-[16px] sicon-${ this.product.type == 'booking' ? 'calendar-time' : 'shopping-bag'}"></i>` : ``
//                 }
//               ${this.product.add_to_cart_label ? this.product.add_to_cart_label : this.getAddButtonLabel() }
//             </salla-add-product-button>

//             ${this.horizontal || this.fullImage ?
//               `<salla-button 
//                 shape="icon" 
//                 fill="outline" 
//                 color="light" 
//                 id="card-wishlist-btn-${this.product.id}-horizontal"
//                 aria-label="Add or remove to wishlist"
//                 class="s-product-card-wishlist-btn animated"
//                 onclick="salla.wishlist.toggle(${this.product.id})"
//                 data-id="${this.product.id}">
//                 <i class="sicon-heart"></i> 
//               </salla-button>`
//               : ``}
//           </div>`
//           : ``}
//       </div>
//     `

//     if (!salla.config.isGuest()){
//       salla.storage.get('salla::wishlist', []).forEach(id => this.toggleFavoriteIcon(id));
//     }

//     document.lazyLoadInstance?.update(this.querySelectorAll('.lazy'));

//     if (this.product?.quantity && this.isSpecial) {
//       this.initCircleBar();
//     }

//     // CSS customization
//     const style = document.createElement('style');
//     style.innerHTML = `
//       .s-product-card-entry {
//         border-radius: 0 !important;
//       }
//       .s-product-card-content-title, .s-product-card-content-subtitle, .s-product-card-price, .s-product-card-sale-price, .s-product-card-starting-price {
//         color: black !important;
//       }
//       salla-add-product-button, salla-button {
//         background-color: #a5804a !important;
//         color: white !important;
//       }
//     `;
//     this.shadowRoot.appendChild(style);
//   }
// }

// customElements.define('custom-product-card', CustomProductCard);
