window.addEventListener('load', () => {
  const originalTitle = document.title;
  const attentionTitle = '*Come Back!';
  
  const originalFavicon = document.querySelector("link[rel='icon']");
  const originalFaviconHref = originalFavicon ? originalFavicon.href : '';

  // Attention favicon URL
  const attentionFaviconHref = 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Red_circle.svg';

  let blinkInterval = null;
  let isBlinking = false;
  let toggleState = false;

  document.addEventListener('visibilitychange', () => {
      if (document.hidden && !isBlinking) {
          startBlinking();
      } else {
          stopBlinking();
      }
  });

  function startBlinking() {
      isBlinking = true;
      blinkInterval = setInterval(() => {
          toggleState = !toggleState;
          document.title = toggleState ? attentionTitle : originalTitle;
          swapFavicon(toggleState ? attentionFaviconHref : originalFaviconHref);
      }, 500); // 500ms blinking
  }

  function stopBlinking() {
      isBlinking = false;
      clearInterval(blinkInterval);
      document.title = originalTitle;
      swapFavicon(originalFaviconHref);
  }

  function swapFavicon(iconURL) {
      removeExistingFavicons();

      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = iconURL + '?v=' + new Date().getTime(); // Force refresh by adding timestamp
      document.head.appendChild(newFavicon);
  }

  function removeExistingFavicons() {
      const links = document.querySelectorAll("link[rel='icon']");
      links.forEach(link => link.parentNode.removeChild(link));
  }
});
