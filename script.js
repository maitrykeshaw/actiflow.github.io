window.addEventListener('load', () => {
  const originalTitle = document.title;
  const attentionTitle = '*Come Back!';

  let favicon = document.querySelector("link[rel='icon']") || document.createElement('link');
  favicon.rel = 'icon';
  if (!favicon.href) {
      favicon.href = '/favicon.ico'; // Default favicon if none exists
      document.head.appendChild(favicon);
  }
  const originalFaviconHref = favicon.href;
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
          favicon.href = toggleState ? attentionFaviconHref : originalFaviconHref;
      }, 500);
  }

  function stopBlinking() {
      isBlinking = false;
      clearInterval(blinkInterval);
      document.title = originalTitle;
      favicon.href = originalFaviconHref;
  }
});
