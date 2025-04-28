window.addEventListener('load', () => {
  const originalTitle = document.title;
  const attentionTitle = '*Come Back!';
  const originalFavicon = document.querySelector("link[rel='icon']");
  const faviconHref = originalFavicon ? originalFavicon.href : '';
  
  const attentionFaviconURL = 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Red_circle.svg'; // 🔴 Red dot emoji favicon
  
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
          updateFavicon(toggleState ? attentionFaviconURL : faviconHref);
      }, 500); // 500ms interval
  }

  function stopBlinking() {
      isBlinking = false;
      clearInterval(blinkInterval);
      document.title = originalTitle;
      updateFavicon(faviconHref);
  }

  function updateFavicon(url) {
      if (!url) return;
      let favicon = document.querySelector("link[rel='icon']");
      if (favicon) {
          favicon.href = url;
      } else {
          favicon = document.createElement('link');
          favicon.rel = 'icon';
          favicon.href = url;
          document.head.appendChild(favicon);
      }
  }
});
