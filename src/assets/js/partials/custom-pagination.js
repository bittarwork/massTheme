document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('salla-slider');
    if (slider) {
        const swiper = slider.swiper;

        // Remove default pagination bullets
        swiper.pagination.el.innerHTML = '';

        // Create custom SVG pagination
        const createCustomPagination = () => {
            const paginationContainer = document.createElement('div');
            paginationContainer.classList.add('swiper-pagination-custom');

            swiper.slides.forEach((slide, index) => {
                const svgWrapper = document.createElement('div');
                svgWrapper.classList.add('swiper-pagination-bullet');
                svgWrapper.dataset.index = index;

                const svgElement = `
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="24" height="24">
                  <!-- Your SVG content here -->
                  <path class="st0" d="M166.2,1811.24H39.28c-7.84,0-14.75-5.14-17.01-12.64l-86.14-286.11c-2.79-9.27-12.48-14.6-21.8-11.98
                  l-36.88,10.33c-9.44,2.65-14.96,12.45-12.31,21.89l71.61,255.96c3.17,11.33-5.35,22.55-17.11,22.55h-300.05
                  c-11.86,0-20.39-11.39-17.04-22.77l74.97-255.32c2.82-9.6-2.84-19.63-12.51-22.18l-40.71-10.74c-9.34-2.46-18.94,2.99-21.6,12.27
                  l-82.07,285.87c-2.19,7.62-9.15,12.86-17.07,12.86h-142.76c-9.81,0-17.76,7.95-17.76,17.76v70.76c0,9.81,7.95,17.76,17.76,17.76
                  H166.2c9.81,0,17.76-7.95,17.76-17.76V1829C183.96,1819.19,176.01,1811.24,166.2,1811.24z M14.13,2497.44
                  c83.02,0,150.02-67.3,150.02-154.09c0-82.38-67-149.7-150.02-149.7c-83.02,0-153.78,67.32-153.78,149.7
                  C-139.64,2430.14-68.89,2497.44,14.13,2497.44L14.13,2497.44z M-70.63,2327.63h47.17c9.81,0,17.76-7.95,17.76-17.76v-47.17
                  c0-9.81,7.95-17.76,17.76-17.76h0.02c9.81,0,17.76,7.95,17.76,17.76v47.17c0,9.81,7.95,17.76,17.76,17.76h43.72
                  c9.81,0,17.76,7.95,17.76,17.76l0,0c0,9.81-7.95,17.76-17.76,17.76H47.62c-9.81,0-17.76,7.95-17.76,17.76v43.41
                  c0,9.81-7.95,17.76-17.76,17.76h-0.02c-9.81,0-17.76-7.95-17.76-17.76v-43.41c0-9.81-7.95-17.76-17.76-17.76h-47.17
                  c-9.81,0-17.76-7.95-17.76-17.76l0,0C-88.39,2335.58-80.44,2327.63-70.63,2327.63z M6.27,2146.47c30.08,0,57.63,6.71,81.4,18.62
                  c10.84,5.43,23.82-0.52,25.95-12.46l26.97-151c1.95-10.89-6.43-20.89-17.49-20.89h-719.23c-11.07,0-19.45,10.02-17.48,20.92
                  l72.53,402.23c1.53,8.46,8.89,14.61,17.48,14.61h329.47c12.44,0,20.64-12.31,16.58-24.07c-6.02-17.44-9.61-36.15-9.61-54.86
                  C-187.14,2237.05-100.35,2146.47,6.27,2146.47L6.27,2146.47z"/>
                </svg>`;

                svgWrapper.innerHTML = svgElement;

                paginationContainer.appendChild(svgWrapper);

                svgWrapper.addEventListener('click', () => {
                    swiper.slideTo(index);
                });

                console.log(`SVG bullet added for index ${index}`);
            });

            swiper.pagination.el.appendChild(paginationContainer);
        };

        createCustomPagination();

        swiper.on('slideChange', () => {
            document.querySelectorAll('.swiper-pagination-custom .swiper-pagination-bullet').forEach((bullet, index) => {
                const svg = bullet.querySelector('svg path');
                svg.setAttribute('fill', index === swiper.activeIndex ? '#a5804a' : 'transparent');
            });
        });
    }
});
