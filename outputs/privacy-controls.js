/* First-party consent controls. No external requests, geolocation or visitor IDs. */
(() => {
  const key='spring-snow-privacy-v2', version=2, lifetime=180*24*60*60*1000;
  const languageKey='chunxue-language';
  try{localStorage.removeItem('spring-snow-privacy-v1');}catch(_){}
  const texts={
    en:['Privacy choices', 'We use essential storage for privacy choices. Remembered language, Tencent chat and Google Analytics are optional and off until you allow them.', 'Reject optional', 'Allow optional', 'Customize', 'Save choices', 'Language preferences', 'Remember your selected language on this device for up to 180 days.', 'Tencent / Knocket chat', 'Tencent chat uses browser storage and may process contact details, messages, IP and device data through Tencent and our team in Cambodia, outside the EEA. You can browse without chat and contact us by email.', 'Privacy policy', 'Terms of use', 'Cookie policy', 'Cookie settings', 'Allow Tencent chat and open', 'Not now', 'Close', 'Essential privacy-choice storage is always on.', 'These policies are provided in English and Simplified Chinese. Please email us if you need help understanding them.', 'Google Analytics', 'Optional Google Analytics measures page visits, language and contact-button clicks. Google may process device/IP data and analytics cookies outside the EEA. Advertising features are disabled.'],
    zh:['隐私选择', '我们使用必要存储记住隐私选择。记住语言、腾讯聊天和 Google Analytics 统计均为可选功能，在您允许前关闭。', '拒绝可选功能', '允许可选功能', '自定义', '保存选择', '语言偏好', '在此设备记住所选语言，最长180天。', '腾讯 / Knocket 聊天', '腾讯聊天会使用浏览器存储，联系方式、消息、IP和设备信息可能经腾讯及我们位于柬埔寨的团队在欧洲经济区以外处理。不启用聊天也可浏览网站，并可通过邮箱联系。', '隐私政策', '使用条款', 'Cookie 政策', 'Cookie 设置', '允许腾讯聊天并打开', '暂不启用', '关闭', '必要的隐私选择存储始终启用。', '政策提供英文和简体中文版。如需帮助理解，请通过邮箱联系我们。', 'Google Analytics 访问统计', '可选的 Google Analytics 统计页面访问、语言及联系按钮点击。Google 可能在欧洲经济区以外处理设备／IP 信息及统计 Cookie；广告功能已关闭。'],
    fr:['Choix de confidentialité', 'Le stockage essentiel mémorise vos choix. La langue, le chat Tencent et Google Analytics sont facultatifs et désactivés sans votre accord.', 'Refuser les options', 'Autoriser les options', 'Personnaliser', 'Enregistrer', 'Préférences linguistiques', 'Mémoriser la langue sur cet appareil pendant 180 jours au maximum.', 'Chat Tencent / Knocket', 'Le chat Tencent utilise le stockage du navigateur. Coordonnées, messages, adresse IP et données d’appareil peuvent être traités par Tencent et notre équipe au Cambodge, hors EEE. Vous pouvez naviguer sans chat et nous contacter par e-mail.', 'Politique de confidentialité', 'Conditions d’utilisation', 'Politique des cookies', 'Paramètres des cookies', 'Autoriser et ouvrir le chat Tencent', 'Pas maintenant', 'Fermer', 'Le stockage essentiel des choix de confidentialité reste actif.', 'Ces politiques sont disponibles en anglais et en chinois simplifié. Contactez-nous par e-mail pour toute aide.', 'Google Analytics', 'Google Analytics mesure les visites, la langue et les clics de contact. Google peut traiter les données IP/appareil et les cookies hors EEE. Les fonctions publicitaires sont désactivées.'],
    de:['Datenschutzauswahl', 'Notwendiger Speicher merkt sich Ihre Auswahl. Sprachspeicherung, Tencent-Chat und Google Analytics sind optional und ohne Zustimmung deaktiviert.', 'Optionale ablehnen', 'Optionale erlauben', 'Anpassen', 'Auswahl speichern', 'Spracheinstellungen', 'Gewählte Sprache auf diesem Gerät bis zu 180 Tage speichern.', 'Tencent / Knocket-Chat', 'Tencent-Chat nutzt Browserspeicher. Kontaktdaten, Nachrichten, IP- und Gerätedaten können durch Tencent und unser Team in Kambodscha außerhalb des EWR verarbeitet werden. Die Website und E-Mail bleiben ohne Chat nutzbar.', 'Datenschutzerklärung', 'Nutzungsbedingungen', 'Cookie-Richtlinie', 'Cookie-Einstellungen', 'Tencent-Chat erlauben und öffnen', 'Jetzt nicht', 'Schließen', 'Notwendiger Speicher für die Datenschutzauswahl bleibt aktiv.', 'Diese Richtlinien sind auf Englisch und vereinfachtem Chinesisch verfügbar. Bei Verständnisfragen kontaktieren Sie uns per E-Mail.', 'Google Analytics', 'Optional erfasst Google Analytics Seitenbesuche, Sprache und Kontaktklicks. Google kann IP-/Gerätedaten und Cookies außerhalb des EWR verarbeiten. Werbefunktionen sind deaktiviert.'],
    es:['Opciones de privacidad', 'El almacenamiento esencial recuerda sus opciones. Recordar el idioma, el chat Tencent y Google Analytics son opcionales y requieren su permiso.', 'Rechazar opcionales', 'Permitir opcionales', 'Personalizar', 'Guardar opciones', 'Preferencias de idioma', 'Recordar el idioma en este dispositivo durante un máximo de 180 días.', 'Chat Tencent / Knocket', 'El chat Tencent usa almacenamiento del navegador. Tencent y nuestro equipo en Camboya pueden tratar datos de contacto, mensajes, IP y dispositivo fuera del EEE. Puede navegar sin chat y contactarnos por correo.', 'Política de privacidad', 'Condiciones de uso', 'Política de cookies', 'Configuración de cookies', 'Permitir y abrir el chat Tencent', 'Ahora no', 'Cerrar', 'El almacenamiento esencial de las opciones de privacidad siempre está activo.', 'Estas políticas están disponibles en inglés y chino simplificado. Escríbanos si necesita ayuda para comprenderlas.', 'Google Analytics', 'Google Analytics mide visitas, idioma y clics de contacto. Google puede tratar datos IP/dispositivo y cookies fuera del EEE. Las funciones publicitarias están desactivadas.'],
    it:['Scelte sulla privacy', 'Lo spazio essenziale memorizza le scelte. Lingua, chat Tencent e Google Analytics sono facoltativi e disattivati senza consenso.', 'Rifiuta facoltativi', 'Consenti facoltativi', 'Personalizza', 'Salva le scelte', 'Preferenze di lingua', 'Memorizza la lingua su questo dispositivo per un massimo di 180 giorni.', 'Chat Tencent / Knocket', 'La chat Tencent usa lo spazio del browser. Contatti, messaggi, IP e dati del dispositivo possono essere trattati da Tencent e dal nostro team in Cambogia, fuori dal SEE. Puoi navigare senza chat e contattarci via e-mail.', 'Informativa sulla privacy', 'Condizioni d’uso', 'Informativa sui cookie', 'Impostazioni cookie', 'Consenti e apri la chat Tencent', 'Non ora', 'Chiudi', 'Lo spazio essenziale per le scelte sulla privacy è sempre attivo.', 'Queste informative sono disponibili in inglese e cinese semplificato. Contattaci via e-mail per chiarimenti.', 'Google Analytics', 'Google Analytics misura visite, lingua e clic di contatto. Google può trattare dati IP/dispositivo e cookie fuori dal SEE. Le funzioni pubblicitarie sono disattivate.'],
    pt:['Opções de privacidade', 'O armazenamento essencial lembra suas escolhas. Memória do idioma, chat Tencent e Google Analytics são opcionais e exigem sua autorização.', 'Rejeitar opcionais', 'Permitir opcionais', 'Personalizar', 'Salvar opções', 'Preferências de idioma', 'Lembrar o idioma neste dispositivo por até 180 dias.', 'Chat Tencent / Knocket', 'O chat Tencent usa armazenamento do navegador. Contatos, mensagens, IP e dados do dispositivo podem ser tratados pela Tencent e nossa equipe no Camboja, fora do EEE. Você pode navegar sem chat e nos contatar por e-mail.', 'Política de privacidade', 'Termos de uso', 'Política de cookies', 'Configurações de cookies', 'Permitir e abrir o chat Tencent', 'Agora não', 'Fechar', 'O armazenamento essencial das opções de privacidade fica sempre ativo.', 'Estas políticas estão disponíveis em inglês e chinês simplificado. Entre em contato por e-mail se precisar de ajuda.', 'Google Analytics', 'O Google Analytics mede visitas, idioma e cliques de contato. O Google pode tratar dados de IP/dispositivo e cookies fora do EEE. Os recursos de publicidade estão desativados.'],
    ja:['プライバシーの選択', 'プライバシーの選択に必要なストレージを使用します。言語の記憶、Tencentチャット、Google Analyticsは任意で、許可するまで無効です。', '任意機能を拒否', '任意機能を許可', '設定する', '選択を保存', '言語設定', 'この端末で選択した言語を最長180日間記憶します。', 'Tencent / Knocket チャット', 'Tencentチャットはブラウザストレージを使用します。連絡先、メッセージ、IP、端末情報は、Tencentおよびカンボジアの当社チームによりEEA域外で処理される場合があります。チャットなしでも閲覧とメールでのお問い合わせが可能です。', 'プライバシーポリシー', '利用規約', 'Cookieポリシー', 'Cookie設定', 'Tencentチャットを許可して開く', '今は許可しない', '閉じる', 'プライバシーの選択に必要なストレージは常に有効です。', 'これらのポリシーは英語と簡体字中国語で提供しています。ご不明な点はメールでお問い合わせください。', 'Google Analytics', '任意の Google Analytics はページ閲覧、言語、お問い合わせボタンのクリックを測定します。Google がIP・端末情報やCookieをEEA域外で処理する場合があります。広告機能は無効です。'],
    ko:['개인정보 선택', '개인정보 선택을 위해 필수 저장소를 사용합니다. 언어 기억, Tencent 채팅, Google Analytics는 선택 사항이며 허용 전에는 비활성화됩니다.', '선택 기능 거부', '선택 기능 허용', '맞춤 설정', '선택 저장', '언어 설정', '이 기기에서 선택한 언어를 최대 180일 동안 기억합니다.', 'Tencent / Knocket 채팅', 'Tencent 채팅은 브라우저 저장소를 사용합니다. 연락처, 메시지, IP 및 기기 정보가 Tencent와 캄보디아의 당사 팀에 의해 EEA 외부에서 처리될 수 있습니다. 채팅 없이도 사이트를 둘러보고 이메일로 문의할 수 있습니다.', '개인정보 처리방침', '이용약관', '쿠키 정책', '쿠키 설정', 'Tencent 채팅 허용 및 열기', '나중에', '닫기', '개인정보 선택을 위한 필수 저장소는 항상 활성화됩니다.', '이 정책은 영어와 중국어 간체로 제공됩니다. 이해에 도움이 필요하면 이메일로 문의해 주세요.', 'Google Analytics', '선택적 Google Analytics는 페이지 방문, 언어 및 문의 버튼 클릭을 측정합니다. Google이 IP·기기 정보와 쿠키를 EEA 외부에서 처리할 수 있습니다. 광고 기능은 비활성화됩니다.'],
    ar:['خيارات الخصوصية', 'نستخدم التخزين الضروري لتذكّر خياراتك. حفظ اللغة ومحادثة Tencent وGoogle Analytics اختيارية ولا تُفعّل قبل موافقتك.', 'رفض الخيارات الإضافية', 'السماح بالخيارات الإضافية', 'تخصيص', 'حفظ الخيارات', 'تفضيلات اللغة', 'تذكّر اللغة على هذا الجهاز لمدة تصل إلى 180 يومًا.', 'محادثة Tencent / Knocket', 'تستخدم المحادثة تخزين المتصفح. قد تعالج Tencent وفريقنا في كمبوديا بيانات الاتصال والرسائل وعنوان IP وبيانات الجهاز خارج المنطقة الاقتصادية الأوروبية. يمكنك التصفح دون محادثة والتواصل بالبريد الإلكتروني.', 'سياسة الخصوصية', 'شروط الاستخدام', 'سياسة ملفات الارتباط', 'إعدادات ملفات الارتباط', 'السماح بمحادثة Tencent وفتحها', 'ليس الآن', 'إغلاق', 'يبقى التخزين الضروري لخيارات الخصوصية مفعّلًا دائمًا.', 'تتوفر هذه السياسات بالإنجليزية والصينية المبسطة. راسلنا إذا احتجت إلى مساعدة لفهمها.', 'Google Analytics', 'يقيس Google Analytics الاختياري زيارات الصفحات واللغة ونقرات التواصل. قد يعالج Google بيانات الجهاز وIP وملفات الارتباط خارج المنطقة الاقتصادية الأوروبية. ميزات الإعلانات معطّلة.']
  };
  const validRecord=value=>value?.version===version&&typeof value.preferences==='boolean'&&typeof value.chat==='boolean'&&typeof value.analytics==='boolean'&&Number.isFinite(value.savedAt)&&value.savedAt<=Date.now()+60000&&value.expiresAt===value.savedAt+lifetime&&value.expiresAt>Date.now();
  function read() {try {const value=JSON.parse(localStorage.getItem(key));return validRecord(value)?value:null;}catch(_){return null;}}
  let record=read(), selectedLanguage=null, pendingChat=null, banner, dialog, lastFocus;
  const allows=category=>!!(record&&record.expiresAt>Date.now()&&record[category]===true);
  const text=index=>(texts[document.documentElement.lang.split('-')[0]]||texts.en)[index];
  function clearChatStorage(){
    const matches=name=>/^(knocket:|TIM_|(?:visitorId|imUserInfo|isAddFriend|browserNotificationEnabled)(?:-|$)|isBotSendMessage$|sensorsdata|sa_jssdk|sajssdk)/i.test(name);
    try{Object.keys(localStorage).filter(matches).forEach(name=>localStorage.removeItem(name));}catch(_){}
    try{document.cookie.split(';').forEach(part=>{const name=part.trim().split('=')[0];if(!matches(name))return;for(const domain of ['',`; domain=${location.hostname}`,`; domain=.${location.hostname}`])document.cookie=`${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;});}catch(_){}
  }
  function clearAnalyticsStorage(){
    try{document.cookie.split(';').forEach(part=>{const name=part.trim().split('=')[0];if(!/^_ga(?:_|$)|^_gid$|^_gat/.test(name))return;for(const domain of ['',`; domain=${location.hostname}`,`; domain=.${location.hostname}`])document.cookie=`${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;});}catch(_){}
  }
  if(!allows('analytics'))clearAnalyticsStorage();
  if(!allows('preferences'))try{localStorage.removeItem(languageKey);}catch(_){}
  if(!allows('chat'))clearChatStorage();
  function getLanguage(){
    if(selectedLanguage)return selectedLanguage;
    const query=new URLSearchParams(location.search).get('lang');
    if(query)return query;
    if(allows('preferences'))try{return localStorage.getItem(languageKey);}catch(_){}
    return 'en';
  }
  function setLanguage(value){
    selectedLanguage=value;
    if(allows('preferences'))try{localStorage.setItem(languageKey,value);}catch(_){}
    // Keep a language carried in a URL consistent with a new explicit selection.
    try{const url=new URL(location.href);if(url.searchParams.has('lang')){if(value==='en')url.searchParams.delete('lang');else url.searchParams.set('lang',value);history.replaceState(history.state,'',url);}}catch(_){}
  }
  function save(preferences,chat,source='settings',analytics=allows('analytics')){
    const hadChat=allows('chat'),hadAnalytics=allows('analytics');
    const savedAt=Date.now();record={version,preferences:preferences===true,chat:chat===true,analytics:analytics===true,savedAt,expiresAt:savedAt+lifetime,source};
    try{localStorage.setItem(key,JSON.stringify(record));}catch(_){}
    if(allows('preferences'))setLanguage(selectedLanguage||document.documentElement.dataset.initialLanguage||'en');
    else try{localStorage.removeItem(languageKey);}catch(_){}
    if(!allows('chat'))clearChatStorage();
    if(!allows('analytics'))clearAnalyticsStorage();
    if(banner)banner.hidden=true;
    document.dispatchEvent(new CustomEvent('site:privacy-change',{detail:{preferences:allows('preferences'),chat:allows('chat'),analytics:allows('analytics')}}));
    // Hiding an already executed SDK does not stop its network connections.
    if((hadChat&&!chat&&document.getElementById('knocket-lazy-sdk'))||(hadAnalytics&&!allows('analytics')&&document.getElementById('google-analytics-sdk')))location.reload();
  }
  function closeDialog(){
    if(!dialog)return;
    if(typeof dialog.close==='function'&&dialog.open)dialog.close();else dialog.removeAttribute('open');
    document.body.style.overflow=dialog.dataset.previousOverflow||'';
    if(pendingChat){const resolve=pendingChat;pendingChat=null;resolve(false);}
    lastFocus?.focus();
  }
  function showDialog(mode='settings'){
    init();lastFocus=document.activeElement;dialog.dataset.mode=mode;
    dialog.querySelector('[data-pref]').checked=allows('preferences');
    dialog.querySelector('[data-chat]').checked=allows('chat');
    dialog.querySelector('[data-analytics]').checked=allows('analytics');
    dialog.querySelector('[data-general-options]').hidden=mode==='chat';
    dialog.querySelector('[data-chat-actions]').hidden=mode!=='chat';
    dialog.querySelector('[data-settings-actions]').hidden=mode==='chat';
    dialog.querySelector('[data-chat-intro]').hidden=mode!=='chat';
    dialog.dataset.previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    if(!dialog.open){if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');}
    dialog.querySelector('[data-close]').focus();
  }
  function requestChatConsent(){
    if(allows('chat'))return Promise.resolve(true);
    if(pendingChat)return Promise.resolve(false);
    showDialog('chat');
    return new Promise(resolve=>{pendingChat=resolve;});
  }
  function updateText(){document.querySelectorAll('[data-privacy-text]').forEach(element=>{
    const index=Number(element.dataset.privacyText);element.textContent=text(index);
    if(element.tagName==='A'&&(index===10||index===12)){
      const page=index===10?'privacy':'cookies',language=document.documentElement.lang.split('-')[0];
      element.href=window.SiteSEO?SiteSEO.route(language,page):'/'+page+'.html';
    }
  });}
  function init(){
    if(!document.body||document.getElementById('privacy-banner'))return;
    banner=document.createElement('aside');banner.id='privacy-banner';banner.className='privacy-banner';banner.setAttribute('aria-labelledby','privacy-banner-title');banner.hidden=!!record;
    banner.innerHTML='<div><strong id="privacy-banner-title" data-privacy-text="0"></strong><p data-privacy-text="1"></p><a href="privacy.html" data-privacy-text="10"></a> · <a href="cookies.html" data-privacy-text="12"></a></div><div class="privacy-actions"><button type="button" data-reject data-privacy-text="2"></button><button type="button" data-accept data-privacy-text="3"></button><button type="button" data-customize data-privacy-text="4"></button></div>';
    document.body.appendChild(banner);
    dialog=document.createElement('dialog');dialog.id='privacy-dialog';dialog.className='privacy-dialog';dialog.setAttribute('aria-labelledby','privacy-dialog-title');dialog.setAttribute('aria-modal','true');
    dialog.innerHTML='<button type="button" class="privacy-close" data-close data-privacy-text="16"></button><h2 id="privacy-dialog-title" data-privacy-text="0"></h2><p data-chat-intro data-privacy-text="9" hidden></p><div data-general-options><p class="privacy-essential" data-privacy-text="17"></p><label class="privacy-option"><input type="checkbox" data-pref><span><strong data-privacy-text="6"></strong><span data-privacy-text="7"></span></span></label><label class="privacy-option"><input type="checkbox" data-chat><span><strong data-privacy-text="8"></strong><span data-privacy-text="9"></span></span></label><label class="privacy-option"><input type="checkbox" data-analytics><span><strong data-privacy-text="19"></strong><span data-privacy-text="20"></span></span></label></div><p class="privacy-policy-links"><a href="privacy.html" data-privacy-text="10"></a> · <a href="cookies.html" data-privacy-text="12"></a> · <a href="https://knocket.trtc.io/legal/privacy/" target="_blank" rel="noopener noreferrer">Tencent / Knocket</a></p><a class="privacy-email" href="mailto:info@sscakh.com">info@sscakh.com</a><div class="privacy-actions" data-settings-actions><button type="button" data-save data-privacy-text="5"></button><button type="button" data-reject data-privacy-text="2"></button></div><div class="privacy-actions" data-chat-actions hidden><button type="button" data-enable-chat data-privacy-text="14"></button><button type="button" data-close data-privacy-text="15"></button></div>';
    document.body.appendChild(dialog);
    document.addEventListener('click',event=>{
      if(event.target.closest('[data-privacy-settings]')){event.preventDefault();showDialog();return;}
      if(!banner.contains(event.target)&&!dialog.contains(event.target))return;
      if(event.target.closest('[data-reject]')){save(false,false,'reject',false);closeDialog();}
      else if(event.target.closest('[data-accept]')){save(true,true,'accept',true);closeDialog();}
      else if(event.target.closest('[data-customize]'))showDialog();
      else if(event.target.closest('[data-save]')){save(dialog.querySelector('[data-pref]').checked,dialog.querySelector('[data-chat]').checked,'settings',dialog.querySelector('[data-analytics]').checked);closeDialog();}
      else if(event.target.closest('[data-enable-chat]')){save(allows('preferences'),true,'chat');const resolve=pendingChat;pendingChat=null;closeDialog();resolve?.(true);}
      else if(event.target.closest('[data-close]'))closeDialog();
    });
    dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
    dialog.addEventListener('keydown',event=>{
      if(event.key==='Escape'){event.preventDefault();closeDialog();return;}
      if(event.key!=='Tab')return;
      const controls=[...dialog.querySelectorAll('button,a,input')].filter(element=>!element.hidden&&!element.closest('[hidden]'));
      const first=controls[0],last=controls[controls.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    });
    updateText();new MutationObserver(updateText).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  // Language-specific paths are maintained by seo.js, including when optional storage is denied.
  window.addEventListener('storage',event=>{
    if(event.key!==key)return;
    const hadChat=allows('chat'),hadAnalytics=allows('analytics');record=read();
    if(!allows('preferences'))try{localStorage.removeItem(languageKey);}catch(_){}
    if(!allows('chat')){clearChatStorage();if(hadChat&&document.getElementById('knocket-lazy-sdk'))location.reload();}
    if(!allows('analytics')){clearAnalyticsStorage();if(hadAnalytics&&document.getElementById('google-analytics-sdk'))location.reload();}
    if(banner)banner.hidden=!!record;
  });
  window.SitePrivacy={allows,save,getLanguage,setLanguage,requestChatConsent,openSettings:()=>showDialog(),text,texts};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
