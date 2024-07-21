// src/assets/js/CustomProductCard.js
class CustomProductCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.product = this.product || JSON.parse(this.getAttribute('product'));
      this.render();
    }
  
    render() {
      const promotionTitleDisplay = this.product.promotion_title ? 'block' : 'none';
  
      this.shadowRoot.innerHTML = `
        <style>
          /* (styles remain the same) */
        </style>
        <div class="custom-product-card">
          <div class="custom-product-promotion-title">${this.product.promotion_title || ''}</div>
          <div class="custom-product-card-image">
            <a href="${this.product.url}">
              <img src="${this.product.image?.url}" alt="${this.product.image?.alt}" />
            </a>
          </div>
          <div class="custom-product-card-content">
            <h3 class="custom-product-card-title">
              <span class="product-name"><a href="${this.product.url}">${this.product.name}</a></span>
              <div class="separator"></div>
              <span class="product-price">${this.product.price} ر.س</span>
            </h3>
            <p class="custom-product-card-description">${this.product.description}</p>
            <button class="custom-product-card-add-to-cart-btn">أضف الى السلة</button>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define('custom-product-card', CustomProductCard);
// src/assets/js/CustomProductCard.js
class CustomProductCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.product = this.product || JSON.parse(this.getAttribute('product'));
      this.render();
    }
  
    render() {
      const promotionTitleDisplay = this.product.promotion_title ? 'block' : 'none';
  
      this.shadowRoot.innerHTML = `
        <style>
          /* (styles remain the same) */
        </style>
        <div class="custom-product-card">
          <div class="custom-product-promotion-title">${this.product.promotion_title || ''}</div>
          <div class="custom-product-card-image">
            <a href="${this.product.url}">
              <img src="${this.product.image?.url}" alt="${this.product.image?.alt}" />
            </a>
          </div>
          <div class="custom-product-card-content">
            <h3 class="custom-product-card-title">
              <span class="product-name"><a href="${this.product.url}">${this.product.name}</a></span>
              <div class="separator"></div>
              <span class="product-price">${this.product.price} ر.س</span>
            </h3>
            <p class="custom-product-card-description">${this.product.description}</p>
            <button class="custom-product-card-add-to-cart-btn">أضف الى السلة</button>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define('custom-product-card', CustomProductCard);
    