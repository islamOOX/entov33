/**
 * ENTOMASTER – classification_script.js v3
 * ✔ Onglets cliquables (addEventListener robuste)
 * ✔ Cartes cliquables → modal détaillé
 * ✔ Tooltip au survol
 * ✔ Recherche locale avec filtrage temps réel
 * ✔ Grilles vides gérées
 */
'use strict';

const GRID_MAP = {
    cruciferes:'g-cruciferes', solanacees:'g-solanacees', cucurbitacees:'g-cucurbitacees',
    legumineuses:'g-legumineuses', betterave:'g-betterave',
    rosacees_noyaux:'g-rosacees_noyaux', rosacees_pepins:'g-rosacees_pepins',
    agrumes:'g-agrumes', vigne:'g-vigne', fruits_rouges:'g-fruits_rouges',
    olivier:'g-olivier', ornementaux:'g-ornementaux',
    palmiers:'g-palmiers', cereales:'g-cereales',
    cotonnier:'g-cotonnier', luzerne:'g-luzerne',
};

let allCards = [];

/* ── Render ── */
function renderAll() {
    const data = window.speciesData;
    if (!data) return;
    allCards = [];
    Object.entries(GRID_MAP).forEach(([key, gid]) => {
        const grid = document.getElementById(gid);
        if (!grid) return;
        const spp = data[key];
        if (!spp || !spp.length) {
            grid.innerHTML = '<p style="font-size:.82rem;font-style:italic;color:var(--text-d);padding:.4rem 0">Aucune espèce répertoriée.</p>';
            return;
        }
        spp.forEach(sp => {
            const card = makeCard(sp);
            grid.appendChild(card);
            allCards.push({el:card, sp});
        });
    });
    updateCount();
}

function makeCard(sp) {
    const {openModal, showTooltip, posTooltipAt, hideTooltip, esc, ORDER_ICONS} = window.ENT||{};
    const e = esc||((s)=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
    const icon = ORDER_ICONS?.[sp.order]||'🐛';
    const name = sp.name||'';
    const img  = sp.image ? `images/${sp.image}` : '';

    const card = document.createElement('article');
    card.className = 'sp-card';
    card.setAttribute('tabindex','0');
    card.setAttribute('aria-label', `${name} – cliquer pour détails`);
    card.dataset.name    = name.toLowerCase();
    card.dataset.order   = (sp.order||'').toLowerCase();
    card.dataset.family  = (sp.family||'').toLowerCase();
    card.dataset.culture = (sp.cultures||sp.host||'').toLowerCase();

    card.innerHTML = `
        <div class="sp-img">
            ${img ? `<img src="${e(img)}" alt="${e(name)}" loading="lazy" onerror="this.parentElement.innerHTML='<span style=font-size:2.5rem;display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-d)>${icon}</span>'">` : `<span style="font-size:2.5rem;display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-d)">${icon}</span>`}
            <span class="sp-img-badge">${e(sp.family||sp.order||'')}</span>
        </div>
        <div class="sp-body">
            <p class="sp-name">${e(name)}</p>
            ${sp.author ? `<p class="sp-author">${e(sp.author)}</p>` : ''}
            <span class="card-badge" style="width:fit-content;font-size:.66rem;color:var(--green-l);background:rgba(74,140,94,.1);border:1px solid rgba(74,140,94,.2);padding:.12rem .5rem;border-radius:50px">${icon} ${e(sp.order||'')}</span>
            ${sp.cultures ? `<p class="sp-host">🌿 ${e(sp.cultures)}</p>` : ''}
            ${sp.description ? `<p class="sp-family" style="font-size:.73rem;color:var(--text-m);line-height:1.33;margin-top:.2rem">${e(sp.description.slice(0,75))}…</p>` : ''}
        </div>
        <span class="sp-more">Voir la fiche →</span>`;

    /* Tooltip au survol */
    if (showTooltip) {
        card.addEventListener('mouseenter', ev => showTooltip(ev, {name:sp.name,author:sp.author,common:'',family:sp.family,order:sp.order,host:sp.cultures,description:sp.description,size:''}, {}));
        card.addEventListener('mousemove',  ev => posTooltipAt(ev.clientX, ev.clientY));
        card.addEventListener('mouseleave', hideTooltip);
        card.addEventListener('focus',      ev => showTooltip(ev, {name:sp.name,author:sp.author,common:'',family:sp.family,order:sp.order,host:sp.cultures,description:sp.description,size:''}, {}));
        card.addEventListener('blur',       hideTooltip);
    }

    /* Clic → modal */
    const go = () => {
        if (openModal) openModal({name:sp.name,author:sp.author,common:'',family:sp.family,order:sp.order,host:sp.cultures,description:sp.description,size:'',image:sp.image?`images/${sp.image}`:'',characteristics:[]});
        else alert(sp.name);
    };
    card.addEventListener('click', go);
    card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();go();} });

    return card;
}

/* ── Tabs ── */
function initTabs() {
    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active'); btn.setAttribute('aria-selected','true');
            const panel = document.getElementById('tab-'+btn.dataset.tab);
            if (panel) panel.classList.add('active');
        });
        btn.addEventListener('keydown', e => {
            const all=[...document.querySelectorAll('.tab-btn')], idx=all.indexOf(btn);
            if(e.key==='ArrowRight'){e.preventDefault();all[(idx+1)%all.length].focus();}
            if(e.key==='ArrowLeft'){e.preventDefault();all[(idx-1+all.length)%all.length].focus();}
        });
    });
}

/* ── Local search ── */
function initLocalSearch() {
    const input = document.getElementById('clfSearch');
    const btn   = document.getElementById('clfSearchBtn');
    const live  = document.getElementById('clfLiveResults');
    if (!input) return;
    let debounce;

    const run = () => {
        const q = input.value.trim().toLowerCase();
        filterCards(q);
        if (q.length>=2) showLive(q); else live&&(live.innerHTML='',live.classList.remove('open'));
    };

    input.addEventListener('input', () => { clearTimeout(debounce); debounce=setTimeout(run,130); });
    btn?.addEventListener('click', run);
    input.addEventListener('keydown', e => {
        if(e.key==='Enter') run();
        if(e.key==='Escape'){input.value='';filterCards('');live&&live.classList.remove('open');}
    });
    document.addEventListener('click', e => {
        if(live && !input.contains(e.target) && !live.contains(e.target)) live.classList.remove('open');
    });
}

function filterCards(q) {
    let vis = 0;
    if (!q) {
        allCards.forEach(({el})=>el.style.display='');
        document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
        document.querySelector('.tab-panel')?.classList.add('active');
        document.querySelectorAll('.tab-btn').forEach((b,i)=>{ b.classList.toggle('active',i===0); b.setAttribute('aria-selected',i===0?'true':'false'); });
        document.querySelectorAll('.culture-group').forEach(g=>g.style.display='');
        updateCount(allCards.length);
        return;
    }
    // Ouvrir tous les panels
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.add('active'));
    document.querySelectorAll('.tab-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});

    allCards.forEach(({el})=>{
        const m = el.dataset.name.includes(q)||el.dataset.order.includes(q)||el.dataset.family.includes(q)||el.dataset.culture.includes(q);
        el.style.display = m?'':'none';
        if(m) vis++;
    });
    document.querySelectorAll('.culture-group').forEach(g=>{
        const grd=g.querySelector('.sp-grid');
        if(!grd) return;
        const anyVis=[...grd.querySelectorAll('.sp-card')].some(c=>c.style.display!=='none');
        g.style.display=anyVis?'':'none';
    });
    updateCount(vis);
}

function showLive(q) {
    const live = document.getElementById('clfLiveResults');
    if (!live) return;
    const matches = allCards.filter(({el})=>el.style.display!=='none').slice(0,7);
    if (!matches.length){live.innerHTML='<div class="clf-live-item">Aucun résultat</div>';live.classList.add('open');return;}
    live.innerHTML = matches.map(({sp},i)=>`<div class="clf-live-item" tabindex="0" data-i="${i}">
        <strong>${(window.ENT?.esc||((s)=>s))(sp.name)}</strong> <em>– ${sp.order||''}${sp.cultures?' | '+sp.cultures:''}</em>
    </div>`).join('');
    live.querySelectorAll('.clf-live-item').forEach((item,i)=>{
        item.addEventListener('click',()=>{
            document.getElementById('clfSearch').value=matches[i].sp.name;
            live.classList.remove('open');
            if(window.ENT?.openModal) window.ENT.openModal({name:matches[i].sp.name,order:matches[i].sp.order,family:matches[i].sp.family,host:matches[i].sp.cultures,description:matches[i].sp.description,image:matches[i].sp.image?`images/${matches[i].sp.image}`:'',characteristics:[]});
        });
        item.addEventListener('keydown',e=>{if(e.key==='Enter')item.click();});
    });
    live.classList.add('open');
}

function updateCount(v) {
    const el=document.getElementById('clfCount');
    if(!el) return;
    const total=allCards.length;
    const shown=v!==undefined?v:total;
    el.textContent=shown===total?`${total} espèce${total>1?'s':''} répertoriée${total>1?'s':''}`:
        `${shown} / ${total} espèce${total>1?'s':''} affichée${shown>1?'s':''}`;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    const wait = setInterval(()=>{ if(window.speciesData){clearInterval(wait);renderAll();initLocalSearch();} }, 40);
    setTimeout(()=>clearInterval(wait), 6000);
});
