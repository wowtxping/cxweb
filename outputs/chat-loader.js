/* The Tencent SDK and its network connections start only after a chat-button click. */
(() => {
  if (document.getElementById('support-chat')) return;
  const sdkUrl = 'https://trtc.io/knocket-sdk/sdk.js?identifier=3108c2f296d4bf551c&v=1791396567650';
  const labels = {
    en: ['Open chat', 'Loading chat…', 'Chat could not load. Click the icon to retry, or email us.', 'Retry chat'],
    zh: ['联系客服', '正在加载客服…', '客服暂时无法加载。请点击图标重试，或通过邮箱联系我们。', '重新加载客服'],
    fr: ['Ouvrir le chat', 'Chargement du chat…', 'Le chat ne se charge pas. Cliquez sur l’icône pour réessayer ou contactez-nous par e-mail.', 'Réessayer le chat'],
    de: ['Chat öffnen', 'Chat wird geladen…', 'Der Chat konnte nicht geladen werden. Zum Wiederholen auf das Symbol klicken oder uns eine E-Mail senden.', 'Chat erneut laden'],
    es: ['Abrir chat', 'Cargando chat…', 'No se pudo cargar el chat. Pulse el icono para reintentar o escríbanos por correo.', 'Reintentar chat'],
    it: ['Apri la chat', 'Caricamento della chat…', 'Impossibile caricare la chat. Premi l’icona per riprovare o contattaci via e-mail.', 'Riprova la chat'],
    pt: ['Abrir chat', 'Carregando chat…', 'Não foi possível carregar o chat. Clique no ícone para tentar novamente ou envie um e-mail.', 'Tentar o chat novamente'],
    ja: ['チャットを開く', 'チャットを読み込み中…', 'チャットを読み込めませんでした。アイコンで再試行するか、メールでお問い合わせください。', 'チャットを再読み込み'],
    ko: ['채팅 열기', '채팅 불러오는 중…', '채팅을 불러오지 못했습니다. 아이콘을 눌러 다시 시도하거나 이메일로 문의해 주세요.', '채팅 다시 시도'],
    ar: ['فتح المحادثة', 'جارٍ تحميل المحادثة…', 'تعذّر تحميل المحادثة. اضغط على الأيقونة للمحاولة مجددًا أو تواصل معنا بالبريد الإلكتروني.', 'إعادة محاولة المحادثة']
  };
  const host = document.createElement('div');
  host.id = 'support-chat';
  host.className = 'support-chat';
  host.innerHTML = '<div class="support-chat-status" id="support-chat-status" role="status" aria-live="polite" hidden><p></p><a href="mailto:info@sscakh.com" hidden>info@sscakh.com</a></div><button class="support-chat-button" type="button" aria-describedby="support-chat-status"><svg class="support-chat-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.4a8.5 8.5 0 0 1-8.5 8.1 9.4 9.4 0 0 1-4-.9L3.5 20l1.2-4a8 8 0 0 1-1.2-4.6A8.4 8.4 0 0 1 12 3.5a8.4 8.4 0 0 1 8.5 7.9Z"/><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" stroke-width="2.4"/></svg><span class="support-chat-spinner" aria-hidden="true"></span></button>';
  document.body.appendChild(host);
  const button = host.querySelector('button');
  const status = host.querySelector('.support-chat-status');
  const message = status.querySelector('p');
  const email = status.querySelector('a');
  let state = 'idle';
  let sdkScript = null;
  let downloaded = false;
  let sdkReady = false;
  let deadline = null;
  let poll = null;
  let unsubscribe = null;

  function updateLabels() {
    const language = document.documentElement.lang.split('-')[0];
    const text = labels[language] || labels.en;
    const label = state === 'loading' ? text[1] : state === 'error' ? text[3] : text[0];
    button.setAttribute('aria-label', label);
    button.title = label;
    button.disabled = state === 'loading';
    button.setAttribute('aria-busy', String(state === 'loading'));
    host.classList.toggle('is-loading', state === 'loading');
    status.hidden = state !== 'loading' && state !== 'error';
    message.textContent = state === 'error' ? text[2] : state === 'loading' ? text[1] : '';
    email.hidden = state !== 'error';
  }
  function stopWaiting() {
    clearTimeout(deadline);
    clearInterval(poll);
    deadline = poll = null;
    unsubscribe?.();
    unsubscribe = null;
  }
  function fail() {
    if (state !== 'loading') return;
    state = 'error';
    stopWaiting();
    // A late vendor response must not cover the retry/email controls.
    window.contactWidget?.hide?.();
    updateLabels();
  }
  function openWhenReady() {
    if (state !== 'loading') return;
    const widget = window.contactWidget;
    // The SDK initially exposes no-op methods. showChatCard is installed with
    // the rendered UI; ready is the SDK's sticky initialization event.
    if (!widget || typeof widget.showChat !== 'function' ||
        (!sdkReady && typeof widget.showChatCard !== 'function')) return;
    try {
      widget.show?.();
      widget.showChat();
      state = 'ready';
      stopWaiting();
      updateLabels();
      // The loaded vendor widget now owns its launcher and close controls.
      host.hidden = true;
      languageObserver.disconnect();
    } catch (_) { fail(); }
  }
  function waitForWidget() {
    if (state !== 'loading') return;
    poll = setInterval(openWhenReady, 100);
    const removeListener = window.contactWidget?.on?.('ready', () => {
      sdkReady = true;
      openWhenReady();
    });
    if (state === 'loading') unsubscribe = removeListener;
    else removeListener?.();
    openWhenReady();
  }
  function loadChat() {
    if (state === 'loading' || state === 'ready') return;
    state = 'loading';
    updateLabels();
    deadline = setTimeout(fail, 60000);
    if (downloaded) {
      // Reuse an executed SDK if only initialization timed out.
      waitForWidget();
      return;
    }
    if (sdkScript) {
      // A slow request may still finish after the timeout; do not inject twice.
      return;
    }
    sdkScript = document.createElement('script');
    sdkScript.id = 'knocket-lazy-sdk';
    sdkScript.src = sdkUrl;
    sdkScript.async = true;
    sdkScript.onload = () => {
      downloaded = true;
      if (state === 'loading') waitForWidget();
      else window.contactWidget?.hide?.();
    };
    sdkScript.onerror = () => {
      sdkScript.remove();
      sdkScript = null;
      fail();
    };
    document.body.appendChild(sdkScript);
  }

  const languageObserver = new MutationObserver(updateLabels);
  languageObserver.observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  button.addEventListener('click', loadChat);
  updateLabels();
})();
