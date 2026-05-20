/**
 * ENTOMASTER – shared.js v3
 * Script commun à TOUTES les pages.
 * Inclut : navbar mobile, recherche globale (136 espèces),
 *          modal détail, compteurs animés, retour en haut, particules.
 */
'use strict';

/* ── Utils ── */
const $  = id => document.getElementById(id);
const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const ORDER_ICONS = {'Coléoptères':'🪲','Lépidoptères':'🦋','Diptères':'🪰','Hémiptères':'🐛','Thysanoptères':'🔬','Hyménoptères':'🐝','Orthoptères':'🦗'};

/* ── Déterminer le préfixe de chemin selon la page courante ── */
function pathPrefix() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    const subDirs = ['coleopteres','lepidopteres','dipteres','hemipteres','hymenopteres','thysanopteres','orthopteres'];
    for (const p of parts) {
        if (subDirs.includes(p)) return '../';
    }
    return '';
}
const PREFIX = pathPrefix();

/* ================================================================
   NAVBAR MOBILE
   ================================================================ */
function initMobileNav() {
    const btn  = $('hamburger');
    const menu = $('navMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        btn.classList.toggle('active', open);
        btn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('open'); btn.classList.remove('active'); btn.setAttribute('aria-expanded','false');
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key==='Escape' && menu.classList.contains('open')) {
            menu.classList.remove('open'); btn.classList.remove('active'); btn.setAttribute('aria-expanded','false'); btn.focus();
        }
    });
}

/* ── Navbar hide on scroll ── */
function initNavbarScroll() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    nav.style.transition = 'transform 0.3s ease';
    let last = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        const open = $('navMenu')?.classList.contains('open');
        if (y > 120 && y > last && !open) nav.classList.add('hidden');
        else nav.classList.remove('hidden');
        last = y;
    }, {passive:true});
}

/* ── Smooth scroll ── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').slice(1);
            const el = document.getElementById(id);
            if (!el) return;
            e.preventDefault();
            const h = document.querySelector('.navbar')?.offsetHeight || 68;
            window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - h - 12, behavior:'smooth'});
        });
    });
}

/* ── Order cards (index only) ── */
function initOrderCards() {
    document.querySelectorAll('.order-card[data-href]').forEach(card => {
        const go = () => window.location.href = card.dataset.href;
        card.addEventListener('click', go);
        card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();go();} });
    });
}

/* ── Animated counters ── */
function initCounters() {
    const els = document.querySelectorAll('.stat-n[data-to]');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target, target = +el.dataset.to, dur = 1100, step = 16;
            let cur = 0;
            const inc = target / (dur/step);
            const t = setInterval(() => {
                cur = Math.min(cur+inc, target);
                el.textContent = Math.floor(cur);
                if (cur>=target){el.textContent=target;clearInterval(t);}
            }, step);
            obs.unobserve(el);
        });
    }, {threshold:0.6});
    els.forEach(el => obs.observe(el));
}

/* ── Back to top ── */
function initBackToTop() {
    const btn = $('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY>400), {passive:true});
    btn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}

/* ── Particles ── */
function initParticles() {
    let wrap = document.querySelector('.particles-bg');
    if (!wrap) {
        wrap = document.createElement('div');
        wrap.className = 'particles-bg';
        wrap.setAttribute('aria-hidden','true');
        document.body.insertBefore(wrap, document.body.firstChild);
    }
    const n = window.innerWidth < 600 ? 15 : 32;
    for (let i=0;i<n;i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${(Math.random()*6).toFixed(2)}s;animation-duration:${(Math.random()*4+5).toFixed(2)}s`;
        wrap.appendChild(p);
    }
}

/* ================================================================
   MODAL GÉNÉRIQUE
   ================================================================ */
function openModal(sp, opts={}) {
    const modal = $('speciesModal');
    const body  = $('modalBody');
    if (!modal||!body) return;

    const icon = ORDER_ICONS[sp.order||opts.order]||'🐛';
    const orderLabel = sp.order||opts.order||'';
    const name  = sp.scientificName||sp.name||'';
    const common= sp.commonName||sp.common||'';
    const auth  = sp.author||'';
    const fam   = sp.family||opts.family||'';
    const sz    = sp.size||sp.taille||opts.size||'';
    const col   = sp.color||sp.colour||sp.couleur||opts.color||'';
    const host  = sp.host||sp.hote||sp.habitat||sp.cultures||opts.host||'';
    const desc  = sp.description||'';
    const imgSrc= sp.image||opts.image||'';
    const chars = sp.characteristics||sp.details||[];

    let imgPath = imgSrc;
    if (imgPath && !imgPath.startsWith('http') && !imgPath.includes('/')) {
        imgPath = PREFIX + imgPath;
    }

    const imgHtml = imgPath ? `<img src="${esc(imgPath)}" alt="${esc(name)}" class="modal-img" onerror="this.style.display='none'">` : '';
    const charsHtml = chars.length ? `<div class="modal-chars"><h4>Caractéristiques morphologiques</h4><ul>${chars.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></div>` : '';

    body.innerHTML = `
        <div class="modal-header">
            <span class="modal-order-tag">${icon} ${esc(orderLabel)}</span>
            <h2 class="modal-title" id="modalTitle">${esc(name)}</h2>
            ${auth   ? `<p class="modal-author">${esc(auth)}</p>` : ''}
            ${common && common!==name ? `<p class="modal-common">${esc(common)}</p>` : ''}
        </div>
        ${imgHtml}
        <div class="modal-grid">
            ${fam  ? `<div class="modal-field"><div class="modal-field-label">Famille</div><div class="modal-field-value"><em>${esc(fam)}</em></div></div>` : ''}
            ${orderLabel ? `<div class="modal-field"><div class="modal-field-label">Ordre</div><div class="modal-field-value">${icon} ${esc(orderLabel)}</div></div>` : ''}
            ${sz   ? `<div class="modal-field"><div class="modal-field-label">Taille</div><div class="modal-field-value">${esc(sz)}</div></div>` : ''}
            ${col  ? `<div class="modal-field"><div class="modal-field-label">Couleur</div><div class="modal-field-value">${esc(col)}</div></div>` : ''}
            ${host ? `<div class="modal-field" style="grid-column:1/-1"><div class="modal-field-label">Culture / Hôte</div><div class="modal-field-value">🌿 ${esc(host)}</div></div>` : ''}
        </div>
        ${charsHtml}
        ${desc ? `<div class="modal-desc">${esc(desc)}</div>` : ''}
        <div class="modal-footer">
            <a href="https://gd.eppo.int/search?q=${encodeURIComponent(name)}" target="_blank" rel="noopener" class="modal-link">🔬 EPPO Global DB</a>
            <a href="https://www.catalogueoflife.org/data/search?q=${encodeURIComponent(name)}" target="_blank" rel="noopener" class="modal-link">📚 Catalogue of Life</a>
        </div>`;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('modalClose')?.focus();
}

function closeModal() {
    const m = $('speciesModal');
    if (m) { m.hidden = true; document.body.style.overflow = ''; }
}

function initModal() {
    $('modalClose')?.addEventListener('click', closeModal);
    $('modalOverlay')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });
}

/* ── Tooltip générique ── */
function showTooltip(ev, sp, opts={}) {
    const tt = $('spTooltip');
    if (!tt) return;
    const name  = sp.scientificName||sp.name||'';
    const common= sp.commonName||sp.common||'';
    const auth  = sp.author||'';
    const fam   = sp.family||opts.family||'';
    const sz    = sp.size||sp.taille||'';
    const host  = sp.host||sp.hote||sp.habitat||sp.cultures||'';
    const desc  = sp.description||'';
    const rows  = [];
    if (auth)   rows.push(['Auteur', auth]);
    if (common && common!==name) rows.push(['Nom commun', common]);
    if (fam)    rows.push(['Famille', fam]);
    if (sp.order||opts.order) rows.push(['Ordre', (ORDER_ICONS[sp.order||opts.order]||'')+ ' ' +(sp.order||opts.order||'')]);
    if (sz)     rows.push(['Taille', sz]);
    if (host)   rows.push(['Hôte', host]);
    if (desc)   rows.push(['Info', desc.slice(0,95)+(desc.length>95?'…':'')]);

    tt.innerHTML = `
        <div class="sp-tt-title">${esc(name)}</div>
        ${rows.map(([l,v])=>`<div class="sp-tt-row"><span class="sp-tt-label">${l} :</span><span class="sp-tt-val">${esc(v)}</span></div>`).join('')}
        <p style="font-size:.65rem;color:var(--text-d);margin-top:.45rem">Cliquez pour la fiche complète</p>`;
    tt.classList.add('show');
    posTooltipAt(ev.clientX||0, ev.clientY||0);
}
function posTooltipAt(cx,cy) {
    const tt=$('spTooltip'); if(!tt?.classList.contains('show')) return;
    const mg=14,tw=290,th=210;
    let x=cx+mg, y=cy+mg;
    if(x+tw>window.innerWidth-mg)  x=cx-tw-mg;
    if(y+th>window.innerHeight-mg) y=cy-th-mg;
    tt.style.left=x+'px'; tt.style.top=y+'px';
}
function hideTooltip(){$('spTooltip')?.classList.remove('show');}

/* ================================================================
   RECHERCHE GLOBALE (navbar – fonctionne sur toutes les pages)
   ================================================================ */
function initGlobalSearch() {
    const input = $('globalSearch');
    const drop  = $('searchDropdown');
    if (!input||!drop) return;

    const getIdx = () => window.GLOBAL_SEARCH_INDEX || [];
    let debounce, cur=[], activeIdx=-1;

    input.addEventListener('input', () => { clearTimeout(debounce); debounce=setTimeout(()=>run(input.value.trim()),140); });
    input.addEventListener('focus', () => { if(input.value.trim().length>=2) drop.classList.add('open'); });
    document.addEventListener('click', e => { if(!input.contains(e.target)&&!drop.contains(e.target)) drop.classList.remove('open'); });
    input.addEventListener('keydown', e => {
        if(e.key==='ArrowDown'){e.preventDefault();const f=drop.querySelector('.sd-item');f?.focus();}
        if(e.key==='Escape'){drop.classList.remove('open');input.blur();}
        if(e.key==='Enter'&&cur.length>0){drop.classList.remove('open');openModal(cur[0]);}
    });

    function run(q) {
        if(q.length<2){drop.classList.remove('open');return;}
        const ql=q.toLowerCase();
        cur = getIdx().filter(sp=>
            (sp.name||'').toLowerCase().includes(ql)||
            (sp.common||'').toLowerCase().includes(ql)||
            (sp.family||'').toLowerCase().includes(ql)||
            (sp.order||'').toLowerCase().includes(ql)||
            (sp.host||'').toLowerCase().includes(ql)
        ).slice(0,12);
        render(cur, q);
    }

    function render(results, q) {
        activeIdx=-1; drop.innerHTML='';
        if(!results.length){drop.innerHTML='<div class="sd-empty">Aucune espèce trouvée</div>';drop.classList.add('open');return;}
        results.forEach((sp,i)=>{
            const el=document.createElement('div');
            el.className='sd-item'; el.setAttribute('role','option'); el.setAttribute('tabindex','0');
            const icon=ORDER_ICONS[sp.order]||'🐛';
            el.innerHTML=`<span class="sd-order">${icon} ${esc(sp.order)}</span>
                <strong>${hi(sp.name,q)}</strong>
                <small>${sp.common?esc(sp.common)+' · ':''}${esc(sp.family)}</small>`;
            el.addEventListener('click',()=>{ drop.classList.remove('open'); input.value=sp.name; openModal(sp); });
            el.addEventListener('keydown',e=>{
                if(e.key==='Enter'){drop.classList.remove('open');openModal(sp);}
                if(e.key==='ArrowDown'){e.preventDefault();drop.querySelectorAll('.sd-item')[i+1]?.focus();}
                if(e.key==='ArrowUp'){e.preventDefault();const p=drop.querySelectorAll('.sd-item')[i-1];if(p)p.focus();else input.focus();}
                if(e.key==='Escape'){drop.classList.remove('open');input.focus();}
            });
            drop.appendChild(el);
        });
        drop.classList.add('open');
    }

    function hi(text,q){
        const re=new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
        return esc(text).replace(re,'<mark style="background:rgba(200,165,74,.28);color:var(--gold-l);border-radius:2px">$1</mark>');
    }
}

/* ================================================================
   INIT GLOBAL
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initNavbarScroll();
    initSmoothScroll();
    initOrderCards();
    initCounters();
    initBackToTop();
    initModal();
    initGlobalSearch();
    initParticles();
});

/* Expose pour sous-pages */
window.ENT = { openModal, showTooltip, posTooltipAt, hideTooltip, esc, ORDER_ICONS, PREFIX };
