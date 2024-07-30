class CustomProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.product = this.product || JSON.parse(this.getAttribute('product'));
    this.render();
    this.initFavoriteIcon();
  }

  initFavoriteIcon() {
    if (window.app?.status === 'ready') {
      this.updateFavoriteIcon();
    } else {
      document.addEventListener('theme::ready', () => this.updateFavoriteIcon());
    }
  }

  updateFavoriteIcon() {
    if (!salla.config.isGuest()) {
      salla.storage.get('salla::wishlist', []).forEach(id => {
        if (id === this.product.id) {
          this.toggleFavoriteIcon(true);
        }
      });
    }
  }

  toggleFavoriteIcon(isAdded) {
    const btn = this.shadowRoot.querySelector('.s-product-card-wishlist-btn');
    if (btn) {
      btn.classList.toggle('s-product-card-wishlist-added', isAdded);
      btn.classList.toggle('not-added', !isAdded);
      btn.classList.toggle('pulse-anime', isAdded);
    }
  }

  render() {
    const promotionTitleDisplay = this.product.promotion_title ? 'block' : 'none';

    this.shadowRoot.innerHTML = `
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
          <style>
            :host {
              display: block;
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
            }

          </style>
        </head>
        <div class="custom-product-card">
          <div class="custom-product-promotion-title">${this.product.promotion_title || ''}</div>
          <button class="s-product-card-wishlist-btn">
            <i class="sicon-heart"></i>
          </button>
          <div class="custom-product-card-image">
            <a href="${this.product.url}">
              <img src="${this.product.image?.url || ''}" alt="${this.product.image?.alt || ''}" />
            </a>
          </div>
          <div class="custom-product-card-content">
            <h3 class="custom-product-card-title">
              <span class="product-name"><a href="${this.product.url}">${this.product.name}</a></span>
              <div class="separator"></div>
              <span class="product-price">${this.product.price || ''} ر.س</span>
            </h3>
            <p class="custom-product-card-description">${this.product.description || ''}</p>
            <button class="custom-product-card-add-to-cart-btn" aria-label="Add to wishlist" onclick="salla.wishlist.toggle(${this.product.id})">
              أضف الى السلة
              <i class="fas fa-shopping-cart" style="margin-right: 8px;"></i>
            </button>
          </div>
        </div>
      `;
  }
}

customElements.define('custom-product-card', CustomProductCard);
