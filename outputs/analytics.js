/* Basic consent mode: no Google request or cookieless ping before analytics opt-in. */
(() => {
  const payload=document.getElementById('page-seo');if(!payload)return;
  const config=JSON.parse(payload.textContent),id=config.ga4MeasurementId;
  if(!/^G-[A-Z0-9]+$/.test(id||''))return;
  let started=false;
  const allowed=()=>window.SitePrivacy?.allows('analytics')===true;
  const clean=url=>{try{const parsed=new URL(url);return parsed.origin+parsed.pathname;}catch(_){return '';}};
  function pageView(){
    if(!started||!allowed())return;
    const location=config.origin+window.location.pathname;
    window.gtag('set',{page_location:location,page_referrer:clean(document.referrer)});
    window.gtag('event','page_view',{send_to:id,page_location:location,page_referrer:clean(document.referrer),page_title:document.title,language:document.documentElement.lang});
  }
  function sync(){
    window['ga-disable-'+id]=!allowed();
    if(!allowed()||started)return;
    started=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    // Apply globally before initialization as well as to the destination. Newer
    // Google tags can otherwise emit an automatic view before config is applied.
    window.gtag('set',{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:15552000,cookie_update:false,page_location:config.origin+location.pathname,page_referrer:clean(document.referrer)});
    window.gtag('js',new Date());
    window.gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:15552000,cookie_update:false,page_location:config.origin+location.pathname,page_referrer:clean(document.referrer)});
    const script=document.createElement('script');script.id='google-analytics-sdk';script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(script);
    pageView();
  }
  document.addEventListener('site:privacy-change',sync);
  document.addEventListener('site:page-view',pageView);
  document.addEventListener('click',event=>{
    if(!started||!allowed())return;
    const target=event.target.closest('a[href^="mailto:"],.support-chat-button');if(!target)return;
    window.gtag('event',target.matches('a')?'email_contact':'chat_launcher_click',{send_to:id});
  });
  sync();
})();
