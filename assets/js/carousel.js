(function() {
  'use strict';

  function initCarousel(carousel) {
    if (carousel.getAttribute('data-initialized') === 'true') return;
    carousel.setAttribute('data-initialized', 'true');

    var container = carousel.querySelector('.hc-track-container');
    var prevBtn = carousel.querySelector('.hc-prev');
    var nextBtn = carousel.querySelector('.hc-next');
    if (!container) return;

    function scrollByOffset(offset) {
      container.scrollBy({ left: offset, behavior: 'smooth' });
    }

    function updateButtons() {
      var maxScroll = container.scrollWidth - container.clientWidth;
      if (prevBtn) prevBtn.disabled = container.scrollLeft <= 1;
      if (nextBtn) nextBtn.disabled = maxScroll <= 1 || container.scrollLeft >= maxScroll - 1;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        scrollByOffset(-container.clientWidth * 0.8);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        scrollByOffset(container.clientWidth * 0.8);
      });
    }

    container.addEventListener('scroll', updateButtons, { passive: true });

    var resizeTimer = null;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateButtons, 150);
    });

    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollByOffset(-container.clientWidth * 0.8);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollByOffset(container.clientWidth * 0.8);
      }
    });

    updateButtons();
  }

  window.initCarousels = function() {
    var carousels = document.querySelectorAll('.hc-carousel');
    carousels.forEach(function(carousel) {
      initCarousel(carousel);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initCarousels);
  } else {
    window.initCarousels();
  }
})();
