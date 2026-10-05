/* Progressive motion: content stays readable without JavaScript or animation support. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const seen = new WeakSet();
  const active = new Set();
  let observer;
  let frame = 0;
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const animate = (element, frames, options) => {
    if (reduced.matches || !element.animate) return;
    const animation = element.animate(frames, options);
    active.add(animation);
    animation.onfinish = animation.oncancel = () => active.delete(animation);
  };
  function reveal(element) {
    if (seen.has(element)) return;
    seen.add(element);
    element.querySelectorAll('.market-track > span').forEach(bar => {
      animate(bar, [{transform:'scaleX(0)'}, {transform:'scaleX(1)'}], {
        duration:1500, easing:'cubic-bezier(.22,1,.36,1)', fill:'backwards'
      });
    });
    const siblings = element.parentElement?.children;
    const index = siblings ? [...siblings].indexOf(element) : 0;
    animate(element, [{opacity:0, transform:'translateY(24px)'}, {opacity:1, transform:'translateY(0)'}], {
      duration:850, delay:Math.min(index,3)*65, easing:'cubic-bezier(.22,1,.36,1)', fill:'backwards'
    });
  }
  function observeContent() {
    if (reduced.matches || !observer) return;
    document.querySelectorAll('.home-manifesto > *, .home-numbers > div, .section-heading, .editorial-card, .craft-copy, .home-closing, .page-intro > *, .facts > div, .about-heading, .about-grid > *, .collection-row-heading, .green-stats > div, .standards > div, .market > div, .customers, .contact-top, .contact-details > div, .cooperation-intro > *, .phase-heading, .cooperation-steps li, .responsibility-lead > *, .energy-section > *, .standards-intro, .standards-heading, .standard-card').forEach(el => {
      if (!seen.has(el)) observer.observe(el);
    });
  }
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { reveal(entry.target); observer.unobserve(entry.target); }
    }), {threshold:0.08});
  }
  function tick() {
    frame = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1,Math.max(0,scrollY/max)) : 0})`;
    const media = document.querySelector('.hero-media');
    if (media) media.style.translate = !reduced.matches && fine.matches ? `0 ${Math.min(scrollY,600)*.035}px` : '';
  }
  function schedule() { if (!frame) frame=requestAnimationFrame(tick); }
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  document.addEventListener('pointermove',e=>{
    if(reduced.matches || !fine.matches) return;
    const card=e.target.closest('.editorial-card');
    if(!card) return;
    const box=card.getBoundingClientRect();
    card.style.setProperty('--tilt',`${((e.clientX-box.left)/box.width-.5)*2}deg`);
  },{passive:true});
  document.querySelectorAll('.editorial-card').forEach(card=>card.addEventListener('pointerleave',()=>card.style.removeProperty('--tilt')));
  const collection=document.getElementById('collection-grid');
  if(collection) new MutationObserver(observeContent).observe(collection,{childList:true});
  let lastStep=document.getElementById('process-title')?.textContent;
  function processTransition() {
    const panel=document.getElementById('process-panel');
    const next=document.getElementById('process-title')?.textContent;
    if(panel && next!==lastStep) {
      lastStep=next;
      animate(panel,[{opacity:.35,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});
    }
  }
  document.getElementById('process-tabs')?.addEventListener('click',processTransition);
  document.getElementById('process-tabs')?.addEventListener('keydown',processTransition);
  function preferenceChanged() {
    document.documentElement.classList.toggle('motion-reduced',reduced.matches);
    if(reduced.matches) {
      active.forEach(animation=>animation.cancel());
      observer?.disconnect();
      document.querySelectorAll('.editorial-card').forEach(card=>card.style.removeProperty('--tilt'));
    } else observeContent();
    schedule();
  }
  reduced.addEventListener('change',preferenceChanged);
  fine.addEventListener('change',schedule);
  preferenceChanged();
  document.querySelectorAll('.hero-editorial > *, .hero-media').forEach((el,index)=>{
    animate(el,[{opacity:0,transform:`translateY(${index===5?16:22}px)`},{opacity:1,transform:'translateY(0)'}],{duration:1000,delay:80+index*85,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
  });
})();
