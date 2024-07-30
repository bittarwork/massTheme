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
    const productPriceDisplay = this.product.price ? 'inline-block' : 'none';
    const productDescriptionDisplay = this.product.description ? 'block' : 'none';

    this.shadowRoot.innerHTML = `
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <style>
          :host {
            display: inline-block;
            width: calc(25% - 1rem);
            box-sizing: border-box;
            margin: 0.5rem;
            vertical-align: top;
          }

          .custom-product-card {
            background-color: #ffffff;
            padding: 1vw;
            color: #000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
            position: relative;
            transition: background-color 0.5s ease, transform 0.5s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-radius: 8px;
            overflow: hidden;
            height: 100%;
          }

          .custom-product-card:hover {
            background-color: #f0f0f0;
            transform: translateY(-0.5vh);
          }

          .custom-product-promotion-title {
            position: absolute;
            top: 1vh;
            left: 1vw;
            color: #a5804a;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 0.5vh 1vw;
            border-radius: 4px;
            display: ${promotionTitleDisplay};
          }

          .custom-product-card-image {
            height: 200px;
            overflow: hidden;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .custom-product-card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }

          .custom-product-card:hover .custom-product-card-image img {
            transform: scale(1.05);
          }

          .custom-product-card-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1vh 0;
            flex-grow: 1;
          }

          .custom-product-card-title {
            font-size: 1.2em;
            font-weight: 100;
            margin: 1vh 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .custom-product-card-title a {
            text-decoration: none;
            color: #000;
            transition: margin-right 0.5s ease;
            padding: 0 0.5vw;
          }

          .custom-product-card .separator {
            width: 0;
            height: 1px;
            background-color: #a5804a;
            transition: width 0.5s ease;
            margin: 0 0.4vw;
          }

          .custom-product-card:hover .separator {
            width: auto;
            flex-grow: 1;
          }

          .custom-product-card .product-price {
            color: #a5804a;
            display: ${productPriceDisplay};
          }

          .custom-product-card-description {
            font-size: 0.9em;
            text-align: right;
            font-weight: 100;
            margin: 1vh 0;
            height: 3em;
            overflow: hidden;
            display: ${productDescriptionDisplay};
          }

          .custom-product-card-add-to-cart-btn {
            background-color: #a5804a;
            color: #fff;
            border: none;
            cursor: pointer;
            font-size: 1em;
            padding: 0.8vh 1vw;
            transition: background-color 0.5s ease, color 0.5s ease;
            align-self: center;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1vh;
            border-radius: 4px;
          }

          .custom-product-card-add-to-cart-btn:hover {
            background-color: transparent;
            color: #a5804a;
            border: 1px solid #a5804a;
          }
        </style>
      </head>
      <div class="custom-product-card">
        <div class="custom-product-promotion-title">${this.product.promotion_title || ''}</div>
        <div class="custom-product-card-image">
          <a href="${this.product.url}">
            <img src="${this.product.image?.url || ''}" alt="${this.product.image?.alt || ''}" />
          </a>
        </div>
        <div class="custom-product-card-content">
          <div class="custom-product-card-title">
            <a href="${this.product.url}">${this.product.name}</a>
            <div class="separator"></div>
            <span class="product-price">${this.product.price || ''} ر.س</span>
          </div>
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
