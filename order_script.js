/**
 * ENTOMASTER – order_script.js v3
 * Script UNIVERSEL pour toutes les pages d'ordre.
 * Lit les espèces depuis GLOBAL_SEARCH_INDEX filtré sur l'ordre courant,
 * ou depuis le fichier species_data.js/species-data.js local si présent.
 * Fonctionne pour : lepidopteres, dipteres, hemipteres,
 *                   thysanopteres, hymenopteres, orthopteres
 */
'use strict';

/* ── Quel ordre sommes-nous ? ── */
const CURRENT_ORDER_KEY = (function() {
    const path = window.location.pathname;
    const dirs = ['lepidopteres','dipteres','hemipteres','thysanopteres','hymenopteres','orthopteres','coleopteres'];
    for (const d of dirs) { if (path.includes('/'+d+'/')) return d; }
    return '';
})();

const ORDER_LABELS = {
    'coleopteres':'Coléoptères','lepidopteres':'Lépidoptères','dipteres':'Diptères',
    'hemipteres':'Hémiptères','thysanopteres':'Thysanoptères',
    'hymenopteres':'Hyménoptères','orthopteres':'Orthoptères'
};
const CURRENT_ORDER_FR = ORDER_LABELS[CURRENT_ORDER_KEY] || '';

let allCards = [];

/* ================================================================
   OBTENIR LES DONNÉES DE L'ORDRE COURANT
   ================================================================ */
function getSpeciesForOrder() {
    const idx = window.GLOBAL_SEARCH_INDEX || [];
    // Filter by order label
    const byOrder = idx.filter(sp =>
        (sp.order || '').toLowerCase() === (CURRENT_ORDER_FR || '').toLowerCase()
    );

    /* Si on a des données locales (species_data.js / speciesData), on les préfère
       car elles sont plus riches (characteristics, suborder, etc.) */
    if (window.speciesData) {
        // speciesData peut être un objet {family:[]} ou un tableau
        if (Array.isArray(window.speciesData)) return enrichFromLocal(byOrder, window.speciesData);
        // Object keys = families
        const flat = [];
        Object.entries(window.speciesData).forEach(([fKey, spp]) => {
            if (!Array.isArray(spp)) return;
            spp.forEach(sp => flat.push({...sp, _family: fKey}));
        });
        return flat.length ? enrichFromLocal(byOrder, flat) : byOrder;
    }
    return byOrder;
}

function enrichFromLocal(indexItems, localItems) {
    /* Merge: pour chaque item d'index, on cherche sa version locale plus riche */
    return indexItems.map(sp => {
        const match = localItems.find(l =>
            (l.scientificName||l.name||'').toLowerCase() === (sp.name||'').toLowerCase()
        );
        if (!match) return sp;
        return {
            name: sp.name,
            common: match.commonName||match.common||sp.common||'',
            family: match.family||sp.family||'',
            host: match.host||match.hote||match.habitat||match.cultures||sp.host||'',
            author: match.author||sp.author||'',
            size: match.size||match.taille||match.envergure||sp.size||'',
            color: match.color||match.colour||match.couleur||sp.color||'',
            image: match.image||sp.image||'',
            description: match.description||sp.description||'',
            order: sp.order,
            url: sp.url,
            characteristics: match.characteristics||match.details||[],
            suborder: match.suborder||'',
        };
    });
}

/* ================================================================
   REGROUPER PAR FAMILLE
   ================================================================ */
function groupByFamily(species) {
    const groups = {};
    species.forEach(sp => {
        const fam = sp.family || 'Famille non définie';
        if (!groups[fam]) groups[fam] = [];
        groups[fam].push(sp);
    });
    return groups;
}

/* ================================================================
   RENDU
   ================================================================ */
function renderOrder() {
    const container = document.getElementById('species-container');
    if (!container) return;

    const species = getSpeciesForOrder();
    if (!species.length) {
        container.innerHTML = `<p style="text-align:center;color:var(--text-m);padding:3rem">Aucune espèce chargée pour cet ordre. Vérifiez que search_index.js est bien inclus.</p>`;
        return;
    }

    const groups = groupByFamily(species);
    const frag = document.createDocumentFragment();
    allCards = [];

    Object.entries(groups).forEach(([family, spp]) => {
        const section = document.createElement('section');
        section.className = 'family-section';
        section.dataset.family = family.toLowerCase();

        const hdr = document.createElement('div');
        hdr.className = 'family-hdr';
        hdr.innerHTML = `<h2>Famille : <em>${e(family)}</em></h2>
                         <span class="family-count">${spp.length} espèce${spp.length>1?'s':''}</span>`;
        section.appendChild(hdr);

        const grid = document.createElement('div');
        grid.className = 'sp-grid';
        grid.setAttribute('role','list');

        spp.forEach(sp => {
            const card = makeCard(sp, family);
            grid.appendChild(card);
            allCards.push({el:card, sp, family});
        });

        section.appendChild(grid);
        frag.appendChild(section);
    });

    container.appendChild(frag);
    updateCount();
}

function makeCard(sp, family) {
    const {openModal, showTooltip, posTooltipAt, hideTooltip, PREFIX} = window.ENT || {};
    const icon = (window.ENT?.ORDER_ICONS||{})[sp.order] || '🐛';
    const name = sp.name || '';

    /* Build image path */
    let imgSrc = sp.image || '';
    if (imgSrc && !imgSrc.startsWith('http')) {
        // image might be relative to the order dir or already include subdir
        if (!imgSrc.includes('/')) imgSrc = 'images/' + imgSrc;
    }

    const card = document.createElement('article');
    card.className = 'sp-card';
    card.setAttribute('role','listitem');
    card.setAttribute('tabindex','0');
    card.setAttribute('aria-label', `${name} – cliquer pour la fiche détaillée`);
    card.dataset.name   = name.toLowerCase();
    card.dataset.common = (sp.common||'').toLowerCase();
    card.dataset.host   = (sp.host||'').toLowerCase();
    card.dataset.family = family.toLowerCase();

    const imgHtml = imgSrc
        ? `<img src="${e(imgSrc)}" alt="${e(name)}" loading="lazy" onerror="this.parentElement.innerHTML='<span style=font-size:2.8rem;display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-d);padding:1rem>${icon}</span>'">`
        : `<span style="font-size:2.8rem;display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-d);padding:1rem">${icon}</span>`;

    card.innerHTML = `
        <div class="sp-img">
            ${imgHtml}
            <span class="sp-img-badge">${e(family)}</span>
        </div>
        <div class="sp-body">
            <p class="sp-name">${e(name)}</p>
            ${sp.author  ? `<p class="sp-author">${e(sp.author)}</p>` : ''}
            ${sp.common && sp.common !== name ? `<p class="sp-common">${e(sp.common)}</p>` : ''}
            <p class="sp-family">${e(family)}</p>
            ${sp.host    ? `<p class="sp-host">&#x1F33F; ${e(sp.host)}</p>` : ''}
            ${sp.size    ? `<p class="sp-size">&#x1F4CF; ${e(sp.size)}</p>` : ''}
        </div>
        <span class="sp-more">Voir la fiche &#x2192;</span>`;

    /* Tooltip au survol */
    card.addEventListener('mouseenter', ev => {
        if (showTooltip) showTooltip(ev, sp, {family});
    });
    card.addEventListener('mousemove', ev => {
        if (posTooltipAt) posTooltipAt(ev.clientX, ev.clientY);
    });
    card.addEventListener('mouseleave', () => { if (window.ENT?.hideTooltip) window.ENT.hideTooltip(); });
    card.addEventListener('focus', ev => {
        if (showTooltip) showTooltip(ev, sp, {family});
    });
    card.addEventListener('blur', () => { if (window.ENT?.hideTooltip) window.ENT.hideTooltip(); });

    /* Modal au clic */
    const go = () => {
        if (openModal) {
            openModal({
                name: sp.name,
                common: sp.common,
                author: sp.author,
                family: sp.family || family,
                order: sp.order || CURRENT_ORDER_FR,
                host: sp.host,
                size: sp.size,
                color: sp.color,
                description: sp.description,
                image: imgSrc,
                characteristics: sp.characteristics || [],
            });
        }
    };
    card.addEventListener('click', go);
    card.addEventListener('keydown', ev => { if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();go();} });

    return card;
}

/* ================================================================
   FILTRE TEMPS RÉEL
   ================================================================ */
function initFilter() {
    const search  = document.getElementById('spSearch');
    const famSel  = document.getElementById('famFilter');
    const noRes   = document.getElementById('noResults');
    const resetBtn= document.getElementById('resetBtn');
    let timer;

    const apply = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const q  = (search?.value||'').toLowerCase().trim();
            const f  = (famSel?.value||'').toLowerCase();
            let vis  = 0;
            const secVis = {};

            allCards.forEach(({el, family}) => {
                const match =
                    (!q || el.dataset.name.includes(q) || el.dataset.common.includes(q) || el.dataset.host.includes(q)) &&
                    (!f || el.dataset.family.includes(f));
                el.style.display = match ? '' : 'none';
                if (match) { vis++; secVis[family.toLowerCase()] = true; }
            });

            document.querySelectorAll('.family-section').forEach(sec => {
                sec.style.display = secVis[sec.dataset.family] ? '' : 'none';
            });

            if (noRes) noRes.classList.toggle('show', vis===0);
            updateCount(vis);
        }, 120);
    };

    search?.addEventListener('input', apply);
    famSel?.addEventListener('change', apply);
    resetBtn?.addEventListener('click', () => {
        if (search)  search.value  = '';
        if (famSel)  famSel.value  = '';
        apply();
    });
}

function updateCount(visible) {
    const el = document.getElementById('filterCount');
    if (!el) return;
    const total = allCards.length;
    const v = visible !== undefined ? visible : total;
    el.textContent = v === total ? `${total} espèce${total>1?'s':''}` : `${v} / ${total} espèces`;
}

/* ── Util ── */
function e(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
    /* Attendre que shared.js et search_index.js soient prêts */
    const wait = setInterval(() => {
        if (window.ENT && window.GLOBAL_SEARCH_INDEX) {
            clearInterval(wait);
            renderOrder();
            initFilter();
        }
    }, 40);
    setTimeout(() => {
        clearInterval(wait);
        if (!allCards.length) {
            /* Fallback sans ENT */
            renderOrder();
            initFilter();
        }
    }, 4000);
});
