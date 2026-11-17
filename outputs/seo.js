/* Metadata and internal links follow the same URLs as the pre-rendered pages. */
(() => {
  const node=document.getElementById('page-seo');if(!node)return;
  const data=JSON.parse(node.textContent), root=document.documentElement;
  const languages=Object.keys(data.variants);
  const route=(language,page=data.page)=>{
    if(data.legalPages.includes(page))language=language==='zh'?'zh':'en';
    return (language==='en'?'/':'/'+language+'/')+(page==='index'&&language==='en'?'':page+'.html');
  };
  function languageFromPath(){const first=location.pathname.split('/')[1];return languages.includes(first)?first:'en';}
  function updateLinks(language){
    document.querySelectorAll('a[href]').forEach(link=>{
      if(link.dataset.language){link.href=route(link.dataset.language);return;}
      const original=link.getAttribute('href');
      if(!original||original.startsWith('#')||/^(mailto:|tel:|javascript:)/.test(original))return;
      const url=new URL(link.href,location.href);
      if(url.origin!==location.origin&&url.origin!==data.origin)return;
      let page=url.pathname.split('/').pop().replace(/\.html$/,'')||'index';
      if(!data.pages.includes(page)&&!data.legalPages.includes(page))return;
      link.href=route(language,page)+url.hash;
    });
  }
  function apply(language){
    if(!languages.includes(language))language='en';
    const entry=data.variants[language];
    const target=route(language);
    const changed=location.pathname!==target;
    if(changed&&/^https?:$/.test(location.protocol))history.pushState({language},'',target+location.hash);
    root.dataset.pageLanguage=language;
    document.title=entry.title;
    document.querySelector('meta[name="description"]').content=entry.description;
    document.querySelector('link[rel="canonical"]').href=entry.url;
    for(const [property,value] of Object.entries({'og:title':entry.title,'og:description':entry.description,'og:url':entry.url,'og:locale':entry.ogLocale,'og:image:alt':entry.imageAlt})){
      const element=document.querySelector('meta[property="'+property+'"]');if(element)element.content=value;
    }
    for(const [name,value] of Object.entries({'twitter:title':entry.title,'twitter:description':entry.description,'twitter:image:alt':entry.imageAlt})){
      const element=document.querySelector('meta[name="'+name+'"]');if(element)element.content=value;
    }
    const graph=document.querySelector('script[data-site-schema]');if(graph)graph.textContent=JSON.stringify(entry.schema);
    updateLinks(language);
    if(changed)document.dispatchEvent(new CustomEvent('site:page-view'));
  }
  window.SiteSEO={apply,route,languageFromPath};
  // Upgrade old shared ?lang= links to real pages; never guess from IP or headers.
  const legacy=new URLSearchParams(location.search).get('lang');
  if(legacy&&languages.includes(legacy)&&route(legacy)!==location.pathname)location.replace(route(legacy)+location.hash);
  else if(location.pathname==='/'&&window.SitePrivacy?.allows('preferences')){
    const preferred=SitePrivacy.getLanguage();
    if(languages.includes(preferred)&&preferred!=='en')location.replace(route(preferred)+location.hash);
  }
})();
