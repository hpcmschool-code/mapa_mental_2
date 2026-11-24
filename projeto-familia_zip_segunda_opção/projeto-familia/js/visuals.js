/* =============================================================
   ELEMENTOS VISUAIS (só apresentação — não contém conteúdo do mapa)
   - ilustrações dos temas principais (formatos diferentes)
   - ícones dos subtópicos (herdam o ícone do ramo-pai se não tiverem o seu)
   ============================================================= */
(function(){
  const c = (x,y,r)=>`M${x-r} ${y}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0`;
  const P = {
    home:'M3 11l9-8 9 8M5 9.5V21h14V9.5M10 21v-6h4v6',
    users:c(9,8,3)+'M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6'+c(17,9,2.5)+'M16.5 14c3 0 5.5 2 5.5 5',
    heart:'M12 20.5S3.5 15 3.5 9.5A4.5 4.5 0 0112 7.2a4.5 4.5 0 018.5 2.3C20.5 15 12 20.5 12 20.5z',
    book:'M3 5h7a2 2 0 012 2v13a2 2 0 00-2-2H3zM21 5h-7a2 2 0 00-2 2v13a2 2 0 012-2h7z',
    coin:c(12,12,9)+'M12 7v10M14.5 9.5c0-1-1-1.5-2.5-1.5s-2.5.6-2.5 1.5 1 1.4 2.5 1.6 2.5.7 2.5 1.6-1 1.5-2.5 1.5-2.5-.6-2.5-1.5',
    shield:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
    globe:c(12,12,9)+'M3 12h18M12 3c3.5 3.5 3.5 14.5 0 18M12 3c-3.5 3.5-3.5 14.5 0 18',
    clock:c(12,12,9)+'M12 7v5l3.5 2',
    scale:'M12 3v18M6 21h12M5 7h14M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z',
    face:c(12,12,9)+'M9 10h.01M15 10h.01M8.5 14.5c1.8 2 5.2 2 7 0',
    phone:'M8 2.5h8a1 1 0 011 1v17a1 1 0 01-1 1H8a1 1 0 01-1-1v-17a1 1 0 011-1zM11 18.5h2',
    ring:c(12,15,6)+'M9 3.5h6l2 4H7z',
    tree:'M12 6v9M5.5 15v-4h13v4'+c(12,4,2)+c(5.5,17.5,2.5)+c(18.5,17.5,2.5)+c(12,17.5,2.5),
    pin:'M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z'+c(12,10,2.5),
    check:'M4 12.5l5 5L20 6.5',
    alert:'M12 3.5l9.5 17h-19zM12 10v4.5M12 17.5h.01',
    brief:'M3 8h18v12H3zM8.5 8V5h7v3',
    plane:'M2.5 11.5l19-8-6.5 17-3.5-7z',
    lock:'M5 11h14v10H5zM8 11V7.5a4 4 0 018 0V11',
    sparkle:'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18',
    dna:'M7 3c0 7 10 7 10 18M17 3c0 7-10 7-10 18M8.5 7h7M8.5 17h7',
    church:'M12 2v5M10 4h4M5 21V12l7-5 7 5v9zM10 21v-5h4v5',
    doc:'M6 3h9l4 4v14H6zM9 12h7M9 16h7',
    columns:'M3 21h18M5 21V10M10 21V10M14 21V10M19 21V10M2.5 10L12 4l9.5 6z',
    factory:'M3 21V10l6 4v-4l6 4V6h4v15z',
    sprout:'M12 21v-9M12 12C12 8 9 6 5 6c0 4 3 6 7 6zM12 14c0-3 2.5-5 7-5 0 3.5-3 5.5-7 5z',
    arrows:'M4 8h14l-4-4M20 16H6l4 4'
  };
  const MAP = {};
  ('conceito:book tipos:users caracteristicas:home organizacao:tree evolucao:clock funcoes:heart papeis:scale desafios:alert '+
   'origem:sprout instituicao:columns fam-sociedade:globe constituicao:home const-bio:dna const-uniao:ring const-adocao:heart '+
   'nuclear:home extensa:tree monoparental:face recomposta:arrows adotiva:sprout acolhimento:shield sem-filhos:home org-conjugal:ring monogamica:ring monogamia:ring '+
   'residencia:pin neolocal:home parentesco-tipos:tree consanguineo:dna afinidade-res:ring adocao-par:heart casamento:ring civil:doc religioso:church uniao-facto:heart '+
   'consanguinidade:dna afinidade-org:ring fam-org-social:globe transmissao:arrows '+
   'antigas:columns idade-media:shield rev-industrial:factory sec-xx:clock contemporanea:phone transf-papeis:arrows mudancas:globe '+
   'educativa:book afetiva:heart economica:coin protecao:shield socializadora:users cultural:globe reprodutiva:sprout '+
   'conjugais:ring resp-conjuges:check igualdade:scale partilha:arrows parentais:users resp-parentais:shield educacao-filhos:book cooperacao:arrows direitos-deveres:doc '+
   'divorcio:doc desemprego:brief conciliacao:brief migracao:plane tecnologia:phone violencia:alert novos-modelos:sparkle educ-criancas:book privacidade:lock')
   .split(' ').forEach(p=>{ const [k,v]=p.split(':'); MAP[k]=v; });

  const svg = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]||P.home}"/></svg>`;
  function icon(node){ for (let n=node; n; n=n.parent) if (MAP[n.id]) return svg(MAP[n.id]); return svg('home'); }

  /* Ilustrações dos temas principais (viewBox 64×64) */
  const IL = {
    tipos:'<circle cx="22" cy="16" r="5.5"/><path d="M12 40c0-8 4-13 10-13s10 5 10 13z"/><circle cx="42" cy="16" r="5.5"/><path d="M32 40c0-8 4-13 10-13s10 5 10 13z"/><circle cx="32" cy="43" r="4"/><path d="M25 58c0-5 3-8 7-8s7 3 7 8z"/>',
    caracteristicas:'<path d="M6 30L32 9l26 21M13 26v26h38V26M26 52V37h12v15"/><path d="M32 22h.01" stroke-width="5"/>',
    organizacao:'<circle cx="32" cy="12" r="6"/><circle cx="14" cy="36" r="5"/><circle cx="50" cy="36" r="5"/><circle cx="6" cy="55" r="3.5"/><circle cx="22" cy="55" r="3.5"/><circle cx="42" cy="55" r="3.5"/><circle cx="58" cy="55" r="3.5"/><path d="M32 18v8M32 26H14v5M32 26h18v5M14 41v5M14 46H6v5M14 46h8v5M50 41v5M50 46h-8v5M50 46h8v5"/>',
    evolucao:'<path d="M17 9h30M17 55h30M19 9c0 15 13 17 13 23S19 40 19 55M45 9c0 15-13 17-13 23s13 8 13 23M25 49h14"/>',
    funcoes:'<path d="M32 55S9 41 9 25a12 12 0 0123-4 12 12 0 0123 4c0 16-23 30-23 30z"/><path d="M32 24v14M25 31h14"/>',
    papeis:'<path d="M32 9v44M17 55h30M11 19h42M11 19L3 36h16zM53 19l-8 17h16z"/><path d="M3 36a8 8 0 0016 0M45 36a8 8 0 0016 0"/>',
    desafios:'<path d="M22 6h20a3 3 0 013 3v46a3 3 0 01-3 3H22a3 3 0 01-3-3V9a3 3 0 013-3zM29 51h6M25 25a10 10 0 0114 0M21 19a16 16 0 0122 0"/><path d="M32 32h.01" stroke-width="5"/>'
  };
  const SHAPE = { conceito:'circle', tipos:'card', caracteristicas:'hex', organizacao:'arch', evolucao:'blob', funcoes:'squircle', papeis:'ring', desafios:'card' };
  function art(id){
    if (!SHAPE[id]) return '';
    const inner = id === 'conceito'
      ? '<img src="assets/images/familia-circulo.jpg" alt="" loading="lazy">'
      : `<svg viewBox="0 0 64 64" aria-hidden="true">${IL[id]}</svg>`;
    return `<span class="art" data-shape="${SHAPE[id]}">${inner}</span>`;
  }
  window.FAMILY_VISUALS = { icon, art };
})();
