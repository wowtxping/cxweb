/* Add supplied photographs here. Relative paths also work when index.html is opened directly. */
const imageAssets = {
  'factory-hero': 'assets/factory-hero-photo.webp',
  'factory-detail': 'assets/showroom-photo.webp',
  'home-knitting': 'assets/process-knitting-photo.webp',
  'process-knitting': 'assets/process-knitting-20261002.webp',
  'process-linking': 'assets/process-linking-20261002.webp',
  'process-washing': 'assets/process-washing-20261002.webp',
  'process-sewing': 'assets/process-sewing-20261002.webp',
  'process-finishing': 'assets/process-finishing-20261002.webp',
  'process-packing': 'assets/process-packing-20261002.webp',
  'sample-women': 'assets/sample-women-collection-20261002.webp',
  'sample-women-2': 'assets/sample-women-2-collection-20261002.webp',
  'sample-women-3': 'assets/sample-women-3-collection-20261002.webp',
  'sample-women-4': 'assets/sample-women-4-collection-20261002.webp',
  'sample-men': 'assets/sample-men-collection-20261002.webp',
  'sample-men-2': 'assets/sample-men-2-collection-20261002.webp',
  'sample-men-3': 'assets/sample-men-3-collection-20261002.webp',
  'sample-men-4': 'assets/sample-men-4-collection-20261002.webp',
  'sample-kids': 'assets/sample-kids-collection-20261002.webp',
  'sample-kids-2': 'assets/sample-kids-2-collection-20261002.webp',
  'sample-accessories-2': 'assets/sample-accessories-2-collection-20261002.webp',
  'sample-accessories': 'assets/sample-accessories-collection-20261002.webp'
};
const processes = [
  ['knitting', '针织', 'Knitting', '从纱线到织片，让材质与针法相遇，构成服装的基础。', 'Yarn becomes knitted panels, bringing together material and stitch to form the foundation of a garment.'],
  ['linking', '缝盘', 'Linking', '将织片逐一连接，让分散的结构成为完整的衣身。', 'Knitted panels are linked together, assembling individual components into a garment.'],
  ['washing', '水洗', 'Washing', '通过水洗工序，整理织物状态，呈现纱线的触感。', 'Washing conditions the knitted fabric and brings out the feel of the yarn.'],
  ['sewing', '缝制', 'Sewing', '完成缝制与细节组装，让服装逐步成形。', 'Sewing and detail assembly bring the garment into its finished form.'],
  ['finishing', '整烫', 'Finishing', '整理衣身形态与外观，展现成衣的线条和质感。', 'Finishing shapes and smooths the garment, defining its lines and texture.'],
  ['packing', '包装', 'Packing', '完成成衣包装，让生产的最后一环连接交付。', 'Finished garments are packed, completing the production process before delivery.']
];
const sampleRows = [
  {id:'women', zh:'女装', en:'Womenswear', items:[['women','女装','Womenswear'],['women-2','女装','Womenswear'],['women-3','女装','Womenswear'],['women-4','女装','Womenswear']]},
  {id:'men', zh:'男装', en:'Menswear', items:[['men','男装','Menswear'],['men-2','男装','Menswear'],['men-3','男装','Menswear'],['men-4','男装','Menswear']]},
  {id:'kids-accessories', zh:'童装与配饰', en:'Kidswear & Accessories', items:[['kids','童装','Kidswear'],['kids-2','童装','Kidswear'],['accessories','配饰','Accessories'],['accessories-2','配饰','Accessories']]}
];
let language = 'en';
let selectedProcess = 0;
language = window.SiteI18n?.valid(document.documentElement.dataset.initialLanguage) || 'en';
const T = (english, chinese) => window.SiteI18n ? SiteI18n.translate(english, language, chinese) : (language === 'zh' ? chinese || english : english);
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded',String(open)); });
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') { closeMenu(); } });
function renderImages() {
  document.querySelectorAll('[data-image]').forEach(slot => {
    const key = slot.dataset.image;
    const src = imageAssets[key];
    const existing = slot.querySelector('.slot-photo');
    const photoAlt = {
      'process-packing': ['成衣包装车间', 'Garment packing workshop'],
      'process-finishing': ['整烫车间', 'Finishing workshop'],
      'process-sewing': ['缝制车间', 'Sewing workshop'],
      'process-washing': ['水洗车间与洗涤设备', 'Washing workshop and washing machines'],
      'process-linking': ['缝盘车间', 'Linking workshop'],
      'process-knitting': ['针织车间与电脑横机', 'Knitting workshop with computerized flat knitting machines'],
      'factory-hero': ['Spring Snow Textile Co., Ltd.工厂厂区航拍', 'Aerial view of the Spring Snow Textile Co., Ltd. factory campus'],
      'factory-detail': ['Spring Snow Textile Co., Ltd.样衣展厅与洽谈空间', 'Spring Snow Textile Co., Ltd. sample showroom and meeting space'],
      'home-knitting': ['电脑横机针织设备', 'Computerized flat knitting machine'],
      'sample-women': ['米白色高领针织上衣', 'Cream turtleneck knitwear'],
      'sample-men': ['灰色拉链针织外套', 'Grey zip-front knitted jacket'],
      'sample-kids': ['米白与粉色针织开衫', 'Cream and pink knitted cardigan'],


      'sample-women-2': ['深灰色麻花针织上衣', 'Charcoal cable-knit sweater'],

      'sample-women-3': ['蓝色针织开衫与短裤套装', 'Blue knitted cardigan and shorts set'],

      'sample-women-4': ['拼色针织开衫', 'Color-block knitted cardigan'],


      'sample-men-2': ['棕色罗纹针织上衣', 'Brown ribbed knitted sweater'],

      'sample-men-3': ['灰色麻花半拉链针织上衣', 'Grey cable-knit quarter-zip sweater'],

      'sample-men-4': ['多色拼接针织上衣', 'Multicolor patchwork knitted sweater'],


      'sample-kids-2': ['粉色针织连衣裙', 'Pink knitted dress'],

      'sample-accessories': ['棕色针织帽', 'Brown knitted beanie'],

      'sample-accessories-2': ['黄色针织围巾', 'Yellow knitted scarf'],
    };
    const alt = (photoAlt[key] ? T(photoAlt[key][1], photoAlt[key][0]) : '')
      || slot.querySelector('.placeholder-center')?.textContent.replace('＋','').trim() || '';
    if (existing && existing.getAttribute('src') === src) {
      existing.alt = alt;
      return;
    }
    existing?.remove();
    slot.classList.remove('has-image');
    if (!src) return;
    const img = new Image();
    img.className = 'slot-photo';
    img.alt = alt;
    img.loading = key === 'factory-hero' || slot.closest('#collection-grid') ? 'eager' : 'lazy';
    if (key.startsWith('sample-')) { img.width = 1200; img.height = 1200; }
    img.decoding = slot.closest('#collection-grid') ? 'sync' : 'async';
    if (key === 'factory-hero') {
      img.width = 1920;
      img.height = 918;
      img.fetchPriority = 'high';
      img.srcset = 'assets/factory-hero-photo-small.webp 960w, assets/factory-hero-photo.webp 1920w';
      img.sizes = '(max-width: 620px) calc(100vw - 40px), (max-width: 900px) calc(100vw - 72px), 54vw';
    }
    let retried = false;
    const loaded = () => { if (img.naturalWidth > 0 && slot.contains(img)) slot.classList.add('has-image'); };
    img.onload = loaded;
    img.onerror = () => {
      if (!retried && slot.contains(img)) {
        retried = true;
        img.removeAttribute('srcset');
        img.src = `${src}${src.includes('?') ? '&' : '?'}retry=1`;
      }
    };
    slot.append(img);
    img.src = src;
    if (img.complete) loaded();
  });
}
function renderCollection() {
  const grid = document.getElementById('collection-grid');
  if (!grid) return;
  if (!grid.children.length) {
    grid.innerHTML = sampleRows.map((row,r) => `<section class="collection-row" aria-labelledby="collection-${row.id}"><div class="collection-row-heading"><h3 id="collection-${row.id}" data-zh="${row.zh}" data-en="${row.en}">${row.zh}</h3><span data-zh="0${r+1} / ${row.zh}" data-en="0${r+1} / ${row.en}">0${r+1} / ${row.en}</span></div><div class="sample-row-grid" tabindex="0" role="region" aria-labelledby="collection-${row.id}">${row.items.map((item,i) => `<article class="sample"><div class="image-slot sample-image" data-image="sample-${item[0]}"><span class="image-index">0${i+1} / ${item[2].toUpperCase()}</span><div class="placeholder-center"><span class="placeholder-symbol">＋</span><span data-zh="样衣图片预留" data-en="Sample image placeholder">样衣图片预留</span></div></div><div class="sample-info"><h4 data-zh="${item[1]}" data-en="${item[2]}">${item[1]}</h4><span>0${i+1}</span></div></article>`).join('')}</div><div class="swipe-hint"><span data-zh="左右滑动，浏览样衣" data-en="Swipe to explore samples">左右滑动，浏览样衣</span><span class="sample-position" aria-hidden="true">01 / 04</span></div></section>`).join('');
    grid.querySelectorAll('.sample-row-grid').forEach(row => {
      let pending = false;
      row.addEventListener('scroll', () => {
        if (pending) return;
        pending = true;
        requestAnimationFrame(() => {
          pending = false;
          const cards = [...row.children];
          const left = row.getBoundingClientRect().left;
          let index = 0;
          let distance = Infinity;
          cards.forEach((card,i) => {
            const delta = Math.abs(card.getBoundingClientRect().left - left);
            if (delta < distance) { index = i; distance = delta; }
          });
          if (row.scrollWidth - row.clientWidth - row.scrollLeft < 2) index = cards.length - 1;
          row.parentElement.querySelector('.sample-position').textContent = `0${index+1} / 0${cards.length}`;
        });
      }, {passive:true});
    });
  }
}

function renderProcess(focus = false) {
  if (!document.getElementById("process-tabs")) { renderImages(); return; }
  const p = processes[selectedProcess];
  document.getElementById('process-tabs').innerHTML = processes.map((item,i) => `<button type="button" class="process-tab" id="tab-${item[0]}" role="tab" aria-controls="process-panel" aria-selected="${i===selectedProcess}" tabindex="${i===selectedProcess?0:-1}" data-step="${i}"><span>0${i+1}</span><div><strong>${T(item[2],item[1])}</strong><small>${T(item[2],item[1]).toUpperCase()}</small></div></button>`).join('');
  document.getElementById('process-panel').setAttribute('aria-labelledby',`tab-${p[0]}`);
  document.getElementById('process-number').textContent = `0${selectedProcess+1}`;
  document.getElementById('process-title').textContent = T(p[2],p[1]);
  document.getElementById('process-english').textContent = T(p[2],p[1]).toUpperCase();
  document.getElementById('process-text').textContent = T(p[4],p[3]);
  document.getElementById('process-placeholder').textContent = `${T(p[2],p[1])} · ${T('Image placeholder','图片预留')}`;
  document.getElementById('process-image-label').textContent = `0${selectedProcess+1} / ${T(p[2],p[1]).toUpperCase()}`;
  document.querySelector('.process-image').dataset.image = `process-${p[0]}`;
  document.querySelector('.process-count').textContent = `0${selectedProcess+1} — 06`;
  if (focus) document.getElementById(`tab-${p[0]}`).focus();
  renderImages();
}
document.getElementById('process-tabs')?.addEventListener('click', e => { const button=e.target.closest('[data-step]'); if(button){selectedProcess=Number(button.dataset.step);renderProcess(true);} });
document.getElementById('process-tabs')?.addEventListener('keydown', e => {
  if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
  e.preventDefault();
  selectedProcess=e.key==='Home'?0:e.key==='End'?5:(selectedProcess+(e.key==='ArrowRight'?1:5))%6;
  renderProcess(true);
});
function applyLanguage() {
  renderCollection();
  if (window.SiteI18n) {
    SiteI18n.apply(document, language);
  } else {
    document.querySelectorAll('[data-zh][data-en]').forEach(element => { element.innerHTML = element.dataset.en; });
    document.documentElement.removeAttribute('data-language-pending');
  }
  renderProcess();
}
window.SiteI18n?.initPicker(code => {
  language = code;
  applyLanguage();
});
applyLanguage();
