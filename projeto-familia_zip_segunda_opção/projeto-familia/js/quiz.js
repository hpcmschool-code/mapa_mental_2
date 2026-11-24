/* =============================================================
   QUIZ FINAL — Tipos e funções da família
   Cada pergunta: q (pergunta), options, answer (índice certo),
   explain (explicação mostrada após responder)
   ============================================================= */
(function(){
  const QUESTIONS = [
    { q:'A Ana vive sozinha com os seus dois filhos depois do divórcio. Que tipo de família é esta?',
      options:['Família nuclear','Família monoparental','Família extensa','Família recomposta'], answer:1,
      node:'monoparental', explain:'A família monoparental é formada por um só progenitor e os seus filhos.' },
    { q:'O Rui e a Marta casaram-se. Ele tem um filho e ela tem uma filha de relações anteriores. Que tipo de família formaram?',
      options:['Família recomposta','Família adotiva','Família monoparental','Família de acolhimento'], answer:0,
      node:'recomposta', explain:'A família recomposta (ou reconstituída) integra filhos de relações anteriores de um ou de ambos os membros do casal.' },
    { q:'Avós, pais e netos vivem todos na mesma casa e ajudam-se mutuamente. Que tipo de família é?',
      options:['Família nuclear','Família sem filhos','Família extensa','Família homoparental'], answer:2,
      node:'extensa', explain:'A família extensa (ou alargada) inclui outros parentes além de pais e filhos e reúne, muitas vezes, três ou mais gerações.' },
    { q:'Como se chama a forma de poligamia em que uma mulher tem vários maridos ao mesmo tempo?',
      options:['Poliginia','Monogamia','Poliandria','União de facto'], answer:2,
      node:'poliandria', explain:'Na poliandria, uma mulher tem vários maridos. Na poliginia, um homem tem várias esposas.' },
    { q:'Qual é a diferença entre uma família de acolhimento e uma família adotiva?',
      options:['Não há diferença','O acolhimento é temporário e não cria laço de filiação','A adoção é sempre temporária','O acolhimento só existe para adultos'], answer:1,
      node:'acolhimento', explain:'O acolhimento familiar é uma medida de proteção temporária. A adoção cria um vínculo de filiação legal e permanente.' },
    { q:'«Família monoparental» e «família monogâmica» são classificadas segundo critérios diferentes. Qual é o critério da família monogâmica?',
      options:['A composição','A residência','A organização conjugal','A descendência'], answer:2,
      node:'org-conjugal', explain:'A família monogâmica é classificada segundo a organização conjugal (número de cônjuges). A monoparental é classificada segundo a composição.' },
    { q:'Os pais ensinam a criança a cumprimentar, a partilhar e a respeitar regras para viver em sociedade. Que função da família é esta?',
      options:['Função económica','Função socializadora','Função reprodutiva','Função de proteção'], answer:1,
      node:'socializadora', explain:'A função socializadora transmite normas, valores e comportamentos. A família é o principal agente de socialização primária.' },
    { q:'Gerir o orçamento, assegurar a alimentação, a habitação e o vestuário corresponde a que função?',
      options:['Função cultural','Função afetiva','Função educativa','Função económica'], answer:3,
      node:'economica', explain:'A função económica garante a satisfação das necessidades materiais. Hoje, a família é sobretudo uma unidade de consumo.' },
    { q:'Que função da família está presente quando um neto cuida do avô doente?',
      options:['Função de proteção','Função reprodutiva','Função cultural','Função económica'], answer:0,
      node:'protecao', explain:'A função de proteção consiste em cuidar dos membros mais vulneráveis: crianças, idosos, doentes e pessoas com deficiência.' },
    { q:'Receitas de família, festas tradicionais e a língua materna transmitidas entre gerações são exemplos de que função?',
      options:['Função afetiva','Função cultural','Função económica','Função reprodutiva'], answer:1,
      node:'cultural', explain:'A função cultural transmite a língua, as tradições, as crenças e a memória do grupo.' }
  ];

  const $ = id => document.getElementById(id);
  const modal = $('quizModal'), body = $('quizBody'), bar = $('quizProgressBar'), counter = $('quizCounter');
  let current = 0, score = 0, lastFocus = null;

  function open(){
    lastFocus = document.activeElement;
    current = 0; score = 0;
    modal.classList.remove('hidden');
    renderQuestion();
  }
  function close(){
    modal.classList.add('hidden');
    if (lastFocus) lastFocus.focus();
  }

  function renderQuestion(){
    const item = QUESTIONS[current];
    counter.textContent = `Pergunta ${current + 1} de ${QUESTIONS.length}`;
    bar.style.width = `${(current / QUESTIONS.length) * 100}%`;
    body.innerHTML = `
      <h3 class="quiz-question" id="quizQuestion">${item.q}</h3>
      <div class="quiz-options" role="group" aria-labelledby="quizQuestion">
        ${item.options.map((o,i)=>`<button type="button" class="quiz-option" data-index="${i}"><span class="quiz-letter">${'ABCD'[i]}</span><span>${o}</span></button>`).join('')}
      </div>
      <div class="quiz-feedback hidden" id="quizFeedback" aria-live="polite"></div>
      <div class="quiz-actions"><button type="button" class="quiz-secondary hidden" id="quizSeeMap">Ver no mapa</button><button type="button" class="quiz-next hidden" id="quizNext">${current === QUESTIONS.length - 1 ? 'Ver resultado' : 'Seguinte'}</button></div>`;
    body.querySelectorAll('.quiz-option').forEach(btn=> btn.addEventListener('click', ()=> answer(Number(btn.dataset.index))));
    $('quizNext').addEventListener('click', next);
    $('quizSeeMap').addEventListener('click', ()=>{ close(); window.FamilyMap.focusNode(item.node); });
    body.querySelector('.quiz-option').focus();
  }

  function answer(i){
    const item = QUESTIONS[current];
    const correct = i === item.answer;
    if (correct) score++;
    body.querySelectorAll('.quiz-option').forEach(btn=>{
      const idx = Number(btn.dataset.index);
      btn.disabled = true;
      if (idx === item.answer) btn.classList.add('correct');
      else if (idx === i) btn.classList.add('wrong');
    });
    const fb = $('quizFeedback');
    fb.className = 'quiz-feedback ' + (correct ? 'ok' : 'ko');
    fb.innerHTML = `<strong>${correct ? 'Certo!' : 'Não é bem assim.'}</strong> ${item.explain}`;
    const nextBtn = $('quizNext');
    nextBtn.classList.remove('hidden');
    $('quizSeeMap').classList.remove('hidden');
    nextBtn.focus();
  }

  function next(){
    current++;
    if (current < QUESTIONS.length) renderQuestion();
    else renderResult();
  }

  function renderResult(){
    bar.style.width = '100%';
    counter.textContent = 'Resultado';
    const pct = score / QUESTIONS.length;
    const msg = pct === 1 ? 'Excelente! Dominas os tipos e as funções da família.'
      : pct >= 0.7 ? 'Muito bem! Conheces bem os conceitos principais.'
      : pct >= 0.5 ? 'Bom esforço! Revê alguns ramos do mapa e tenta outra vez.'
      : 'Explora os ramos «Tipos de família» e «Funções da família» no mapa e tenta de novo.';
    body.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-score" id="quizScore"><span>${score}</span>/${QUESTIONS.length}</div>
        <p>${msg}</p>
        <div class="quiz-actions center">
          <button type="button" class="quiz-next" id="quizRetry">Repetir quiz</button>
          <button type="button" class="quiz-secondary" id="quizBack">Voltar ao mapa</button>
        </div>
      </div>`;
    $('quizRetry').addEventListener('click', open);
    $('quizBack').addEventListener('click', close);
  }

  $('openQuiz').addEventListener('click', open);
  $('closeQuiz').addEventListener('click', close);
  modal.addEventListener('click', e=>{ if (e.target === modal) close(); });
  document.addEventListener('keydown', e=>{ if (e.key === 'Escape' && !modal.classList.contains('hidden')) close(); });
})();
