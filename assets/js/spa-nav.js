(function() {
  'use strict';

  // ============================================================
  // 1. Navigation hover slider
  // ============================================================
  function initNavSlider() {
    var topnav = document.querySelector('.topnav');
    if (!topnav) return;

    var slider = topnav.querySelector('.nav-slider');
    if (!slider) return;

    var links = topnav.querySelectorAll('#myLinks a.normal, #myLinks a.right');
    if (links.length === 0) return;

    function clearActiveLinkClass() {
      for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('slider-active');
      }
    }

    function moveSliderTo(element) {
      var parentRect = topnav.getBoundingClientRect();
      var rect = element.getBoundingClientRect();
      slider.style.transform = 'translateX(' + (rect.left - parentRect.left) + 'px)';
      slider.style.width = rect.width + 'px';
      slider.style.opacity = '1';
      clearActiveLinkClass();
      element.classList.add('slider-active');
    }

    function hideSlider() {
      slider.style.opacity = '0';
      clearActiveLinkClass();
    }

    function getActiveLink() {
      var currentPath = window.location.pathname;
      var bestMatch = null;
      var bestMatchLength = 0;
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        if (!href) continue;
        var absUrl = new URL(href, window.location.href).pathname;
        var cleanHref = absUrl.replace(/\/$/, '') || '/';
        var cleanPath = currentPath.replace(/\/$/, '') || '/';
        if (cleanPath === cleanHref) {
          return links[i]; // exact match wins
        }
        // prefix match (exclude home "/")
        if (cleanHref !== '/' && cleanPath.indexOf(cleanHref + '/') === 0) {
          if (cleanHref.length > bestMatchLength) {
            bestMatch = links[i];
            bestMatchLength = cleanHref.length;
          }
        }
      }
      return bestMatch;
    }

    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('mouseenter', function() {
        moveSliderTo(this);
      });
    }

    topnav.addEventListener('mouseleave', function() {
      var active = getActiveLink();
      if (active) {
        moveSliderTo(active);
      } else {
        hideSlider();
      }
    });

    function setInitialSlider() {
      var active = getActiveLink();
      if (active) {
        var savedTransition = slider.style.transition;
        slider.style.transition = 'none';
        var parentRect = topnav.getBoundingClientRect();
        var rect = active.getBoundingClientRect();
        slider.style.transform = 'translateX(' + (rect.left - parentRect.left) + 'px)';
        slider.style.width = rect.width + 'px';
        slider.style.opacity = '1';
        clearActiveLinkClass();
        active.classList.add('slider-active');
        slider.offsetHeight; // force reflow
        slider.style.transition = savedTransition;
      } else {
        hideSlider();
      }
    }

    var initialSliderSet = false;
    function runInitialSlider() {
      if (initialSliderSet) return;

      // Wait until nav.css is applied: links should have float:right
      if (links.length > 0) {
        var computed = window.getComputedStyle(links[0]);
        var hasFloatRight = (computed.float === 'right' || computed.cssFloat === 'right');
        if (!hasFloatRight) {
          // nav.css not loaded yet, retry shortly
          setTimeout(runInitialSlider, 300);
          return;
        }
      }

      initialSliderSet = true;
      setInitialSlider();
      window.removeEventListener('load', runInitialSlider);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runInitialSlider);
    }
    window.addEventListener('load', runInitialSlider);
    setTimeout(runInitialSlider, 500);

    window.addEventListener('resize', function() {
      var active = getActiveLink();
      if (active) {
        var savedTransition = slider.style.transition;
        slider.style.transition = 'none';
        moveSliderTo(active);
        slider.offsetHeight; // force reflow
        slider.style.transition = savedTransition;
      }
    });

    if (document.fonts) {
      document.fonts.addEventListener('loadingdone', function() {
        var active = getActiveLink();
        if (active) moveSliderTo(active);
      });
    }
  }

  // ============================================================
  // 2. Navigation blur background (desktop + mobile unified)
  // ============================================================
  function initNavBlur() {
    var existing = document.getElementById('mobileNavBlur');
    if (existing) return;

    var blur = document.createElement('div');
    blur.id = 'mobileNavBlur';
    document.body.insertBefore(blur, document.body.firstChild);

    var myLinks = document.getElementById('myLinks');

    // Override myFunction to use height transition (syncs with blur layer)
    window.myFunction = function() {
      var x = document.getElementById('myLinks');
      var icon = document.querySelector('.topnav a.icon');
      if (!x || !icon) return;

      if (x.classList.contains('open')) {
        // Collapse
        var currentHeight = x.scrollHeight;
        x.style.height = currentHeight + 'px';
        x.offsetHeight; // force reflow
        requestAnimationFrame(function() {
          x.style.height = '0px';
          x.classList.remove('open');
          if (blur) blur.style.height = '48px';
        });
        icon.classList.remove('active');
      } else {
        // Expand
        x.classList.add('open');
        var targetHeight = x.scrollHeight;
        x.style.height = targetHeight + 'px';
        if (blur) blur.style.height = (48 + targetHeight) + 'px';
        icon.classList.add('active');
      }
    };

    // Helper: close mobile menu if open
    function closeMobileMenu() {
      var x = document.getElementById('myLinks');
      var icon = document.querySelector('.topnav a.icon');
      if (!x || !x.classList.contains('open')) return;
      var currentHeight = x.scrollHeight;
      x.style.height = currentHeight + 'px';
      x.offsetHeight; // force reflow
      requestAnimationFrame(function() {
        x.style.height = '0px';
        x.classList.remove('open');
        if (blur) blur.style.height = '48px';
      });
      if (icon) icon.classList.remove('active');
    }

    // Click outside to close
    document.addEventListener('click', function(e) {
      var x = document.getElementById('myLinks');
      var icon = document.querySelector('.topnav a.icon');
      if (!x || !x.classList.contains('open')) return;
      if (x.contains(e.target) || (icon && icon.contains(e.target))) return;
      closeMobileMenu();
    });

    // Scroll or swipe to close
    window.addEventListener('scroll', closeMobileMenu, { passive: true });
    document.addEventListener('touchmove', closeMobileMenu, { passive: true });

    // Clean up inline height after transition completes
    if (myLinks) {
      myLinks.addEventListener('transitionend', function(e) {
        if (e.propertyName === 'height' && myLinks.classList.contains('open')) {
          myLinks.style.height = 'auto';
        }
      });
    }
  }

  // ============================================================
  // 3. SPA-style page navigation
  // ============================================================
  function initSpaNav() {
    if (!window.fetch) return;

    var isNavigating = false;
    var currentController = null;
    var navSequence = 0;
    var spinnerShowTimer = null;
    var section = document.querySelector('section');
    if (!section) return;

    var spinner = document.getElementById('page-spinner');
    if (!spinner) {
      spinner = document.createElement('div');
      spinner.id = 'page-spinner';
      spinner.setAttribute('aria-hidden', 'true');
      var ring = document.createElement('div');
      ring.className = 'spinner-ring';
      spinner.appendChild(ring);
      document.body.appendChild(spinner);
    }

    function updateSpinnerPosition() {
      if (!spinner || !section) return;
      var rect = section.getBoundingClientRect();
      var viewHeight = window.innerHeight;
      var viewWidth = window.innerWidth;

      var top = Math.max(rect.top, 0);
      var left = Math.max(rect.left, 0);
      var bottom = Math.min(rect.bottom, viewHeight);
      var right = Math.min(rect.right, viewWidth);

      var width = Math.max(right - left, 0);
      var height = Math.max(bottom - top, 0);

      spinner.style.top = top + 'px';
      spinner.style.left = left + 'px';
      spinner.style.width = width + 'px';
      spinner.style.height = height + 'px';
    }

    function onSpinnerResize() {
      updateSpinnerPosition();
    }

    function onSpinnerScroll() {
      updateSpinnerPosition();
    }

    function showSpinner() {
      if (spinnerShowTimer) {
        clearTimeout(spinnerShowTimer);
      }
      spinnerShowTimer = setTimeout(function() {
        updateSpinnerPosition();
        spinner.classList.add('visible');
        window.addEventListener('resize', onSpinnerResize, { passive: true });
        window.addEventListener('scroll', onSpinnerScroll, { passive: true });
        spinnerShowTimer = null;
      }, 1000);
    }

    function hideSpinner() {
      if (spinnerShowTimer) {
        clearTimeout(spinnerShowTimer);
        spinnerShowTimer = null;
      }
      spinner.classList.remove('visible');
      window.removeEventListener('resize', onSpinnerResize);
      window.removeEventListener('scroll', onSpinnerScroll);
    }

    function shouldInterceptLink(href) {
      if (!href) return false;
      if (href.indexOf('http') === 0 || href.indexOf('//') === 0) return false;
      if (href.indexOf('#') === 0) return false;
      if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return false;
      if (href.indexOf('javascript:') === 0) return false;
      if (/\.(pdf|png|jpg|jpeg|gif|svg|zip|doc|docx|xls|xlsx)$/i.test(href)) return false;
      return true;
    }

    function extractContent(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      var newSection = doc.querySelector('section');
      if (!newSection) return null;

      var titleEl = doc.querySelector('title');

      return {
        html: newSection.innerHTML,
        title: titleEl ? titleEl.textContent : document.title
      };
    }

    function findBestMatchLink(pathname, links) {
      var cleanPath = pathname.replace(/\/$/, '') || '/';
      var bestMatch = null;
      var bestMatchLength = 0;
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        if (!href) continue;
        var absUrl = new URL(href, window.location.href).pathname;
        var cleanHref = absUrl.replace(/\/$/, '') || '/';
        if (cleanPath === cleanHref) {
          return links[i];
        }
        if (cleanHref !== '/' && cleanPath.indexOf(cleanHref + '/') === 0) {
          if (cleanHref.length > bestMatchLength) {
            bestMatch = links[i];
            bestMatchLength = cleanHref.length;
          }
        }
      }
      return bestMatch;
    }

    function updateActiveNavForPath(pathname) {
      var topnav = document.querySelector('.topnav');
      if (!topnav) return;
      var slider = topnav.querySelector('.nav-slider');
      if (!slider) return;
      var links = topnav.querySelectorAll('#myLinks a.normal, #myLinks a.right');
      var bestMatch = findBestMatchLink(pathname, links);
      if (bestMatch) {
        var parentRect = topnav.getBoundingClientRect();
        var rect = bestMatch.getBoundingClientRect();
        slider.style.transform = 'translateX(' + (rect.left - parentRect.left) + 'px)';
        slider.style.width = rect.width + 'px';
        slider.style.opacity = '1';
        for (var i = 0; i < links.length; i++) {
          links[i].classList.remove('slider-active');
        }
        bestMatch.classList.add('slider-active');
      }
    }

    function updateActiveNav() {
      updateActiveNavForPath(window.location.pathname);
    }

    function updateLastModifiedDate() {
      var el = document.getElementById('last-update-date');
      if (!el) return;
      var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      var modiDate = new Date(document.lastModified);
      el.textContent = modiDate.getDate() + ". " + monthNames[modiDate.getMonth()] + " " + modiDate.getFullYear();
    }

    function navigateTo(href, pushHistory) {
      var absUrl = new URL(href, window.location.href).href;
      var currentUrl = window.location.href;

      if (absUrl === currentUrl) {
        return;
      }

      // Abort any in-flight navigation so the latest click wins
      if (window.AbortController && currentController) {
        currentController.abort();
      }
      currentController = window.AbortController ? new AbortController() : null;
      navSequence++;
      var mySeq = navSequence;

      isNavigating = true;

      // Update navigation bar to the target page immediately
      updateActiveNavForPath(new URL(href, window.location.href).pathname);

      // Fade out current content and show spinner if loading lingers
      section.style.transition = 'opacity 0.15s ease';
      section.style.opacity = '0';
      showSpinner();

      var fetchOptions = {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      };
      if (currentController) {
        fetchOptions.signal = currentController.signal;
      }

      fetch(href, fetchOptions)
        .then(function(response) {
          if (mySeq !== navSequence) return null;
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return response.text();
        })
        .then(function(html) {
          if (mySeq !== navSequence) return;
          if (!html) return;
          var result = extractContent(html);
          if (!result) {
            window.location.href = href;
            return;
          }

          setTimeout(function() {
            if (mySeq !== navSequence) return;
            section.innerHTML = result.html;
            document.title = result.title;
            section.style.opacity = '1';

            if (pushHistory !== false) {
              window.history.pushState({ spaUrl: href }, result.title, href);
            }

            updateActiveNav();
            updateLastModifiedDate();
            window.scrollTo({ top: 0, behavior: 'smooth' });

            hideSpinner();
            isNavigating = false;
            currentController = null;
          }, 150);
        })
        .catch(function(err) {
          if (err && err.name === 'AbortError') return;
          if (mySeq !== navSequence) return;
          hideSpinner();
          isNavigating = false;
          currentController = null;
          window.location.href = href;
        });
    }

    document.addEventListener('click', function(e) {
      var target = e.target;
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }
      if (!target) return;

      var href = target.getAttribute('href');

      // Close mobile menu when clicking any link inside the navigation
      var myLinks = document.getElementById('myLinks');
      if (myLinks && myLinks.contains(target)) {
        var icon = document.querySelector('.topnav a.icon');
        var blur = document.getElementById('mobileNavBlur');
        if (myLinks.classList.contains('open')) {
          var currentHeight = myLinks.scrollHeight;
          myLinks.style.height = currentHeight + 'px';
          myLinks.offsetHeight; // force reflow
          requestAnimationFrame(function() {
            myLinks.style.height = '0px';
            myLinks.classList.remove('open');
            if (blur) blur.style.height = '48px';
          });
          if (icon) icon.classList.remove('active');
        }
      }

      if (!shouldInterceptLink(href)) return;

      e.preventDefault();
      navigateTo(href, true);
    });

    window.addEventListener('popstate', function(e) {
      if (e.state && e.state.spaUrl) {
        navigateTo(e.state.spaUrl, false);
      } else {
        window.location.reload();
      }
    });

    if (!window.history.state) {
      window.history.replaceState({ spaUrl: window.location.href }, document.title);
    }

    // Set initial date on page load
    updateLastModifiedDate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initNavSlider();
      initNavBlur();
      initSpaNav();
    });
  } else {
    initNavSlider();
    initNavBlur();
    initSpaNav();
  }
})();
