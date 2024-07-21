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
      <style>
        .custom-product-card {
          background-color: #ffffff;
          padding: 16px;
          color: #000; 
          max-width: 35vw;  
          margin: 3vh;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
          position: relative;
          transition: background-color 0.5s ease, transform 0.5s ease;
        }
        .custom-product-card:hover {
          background-color: #f0f0f0;
          transform: translateY(-1vh);
        }
        .custom-product-card h3 { 
          font-size: 2em;
          font-weight: 100;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: justify-content 0.5s ease;
        }
        .custom-product-card h3 a { 
          text-decoration: none;
          color: #000;
        }
        .custom-product-card .product-name {
          display: inline-block;
          text-decoration: none;
          color: #000;
          transition: margin-right 0.5s ease;
          padding: 0 0.5vw;
        }
        .custom-product-card .product-price {
          display: none;
          color: #a5804a;
          transition: display 0.5s ease;
          margin: 0 0.4vw;
        }
        .custom-product-card .separator {
          width: 0;
          height: 1px;
          background-color: #a5804a;
          transition: width 0.5s ease;
        }
        .custom-product-card:hover h3 {
          justify-content: flex-start;
        }
        .custom-product-card:hover .product-price {
          display: inline-block;
          font-size: 0.7em;
        }
        .custom-product-card:hover .separator {
          width: auto;
          flex-grow: 1;
        }
        .custom-product-card-image {
          text-align: center;
        }
        .custom-product-card-image img {
          max-width: 100%;
          max-height: 25vh;
        }
        .custom-product-card-description {
          font-size: 1em;
          text-align: right;
          font-weight: 100;
        }
        .custom-product-card-add-to-cart-btn {
          background-color: #a5804a; 
          color: #fff; 
          border: none;
          cursor: pointer;
          font-size: 0.8em;
          padding: 1vh 2vw;
          transition: background-color 0.5s ease, color 0.5s ease;
        }
        .custom-product-card-add-to-cart-btn:hover {
          background-color: transparent; 
          color: #a5804a; 
        }
        .custom-product-promotion-title {
          position: absolute;
          top: 16px;
          left: 16px;
          color: #a5804a;
          margin: 1vw 1vh;
          font-size: 1em;
          display: ${promotionTitleDisplay};
          transition: display 0.5s ease;
        }
        .custom-product-card:hover .custom-product-promotion-title {
          display: block;
        }
        .s-product-card-wishlist-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          cursor: pointer;
          border: none;
          background: transparent;
        }
        .s-product-card-wishlist-btn.s-product-card-wishlist-added .sicon-heart {
          color: red;
        }
      </style>
      <div class="custom-product-card">
        <div class="custom-product-promotion-title">${this.product.promotion_title || ''}</div>
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
          <button class="custom-product-card-add-to-cart-btn">أضف الى السلة</button>
        </div>
        <button class="s-product-card-wishlist-btn" aria-label="Add to wishlist" onclick="salla.wishlist.toggle(${this.product.id})">
          <i class="sicon-heart"></i>
        </button>
      </div>
    `;
  }
}

customElements.define('custom-product-card', CustomProductCard);
