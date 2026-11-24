/* =============================================================
   CONTEÚDO CIENTÍFICO DO MAPA MENTAL
   Cada conceito pode ter:
     desc     -> definição
     chars    -> características (lista)
     examples -> exemplos (lista)
     extra    -> informação complementar
     items    -> subdivisões (abrem novas ramificações)
   Referências principais: Código Civil Português (arts. 1576.º e ss.),
   Constituição da República Portuguesa (arts. 36.º, 67.º e 68.º),
   Lei n.º 7/2001 (união de facto), G. P. Murdock (1949), T. Parsons (1955),
   OpenStax – Introduction to Anthropology.
   ============================================================= */

const ROOT_INFO = {
  desc: 'A família é um grupo social cujos membros estão ligados por laços de parentesco, casamento, união de facto ou adoção, e que partilham responsabilidades de cuidado, afeto e apoio. É uma das instituições sociais mais antigas e universais, mas a sua forma varia conforme a época, a cultura e a sociedade.',
  chars: ['Existe em todas as sociedades conhecidas', 'Assume formas muito diversas', 'É o primeiro espaço de socialização do indivíduo', 'Transforma-se ao longo da história'],
  examples: ['Família nuclear', 'Família monoparental', 'Família recomposta', 'Família extensa'],
  extra: 'O Código Civil português (art. 1576.º) indica como fontes das relações jurídicas familiares o casamento, o parentesco, a afinidade e a adoção.'
};

const familyMap = [

/* ============ 1. CONCEITO DE FAMÍLIA ============ */
{ id:'conceito', title:'Conceito de família', color:'#4d8fc5',
  desc:'O conceito de família designa o grupo de pessoas unidas por laços de parentesco, conjugalidade ou adoção, que partilham uma vida em comum ou mantêm relações de solidariedade e responsabilidade. É simultaneamente uma realidade biológica, afetiva, jurídica e social.',
  chars:['Conceito plural: não há um modelo único','Envolve laços biológicos, legais e afetivos','Varia no tempo e no espaço'],
  extra:'Sociólogos e antropólogos distinguem «família» (relações de parentesco) de «agregado doméstico» (pessoas que vivem na mesma habitação).',
  items:[
  { id:'definicao', title:'Definição',
    desc:'Em sociologia, a família é um grupo social primário formado por pessoas ligadas por casamento, união, parentesco ou adoção, que constituem uma unidade de convivência, cooperação económica e cuidado mútuo.',
    chars:['Grupo primário: relações próximas e pessoais','Relações duradouras','Partilha de recursos e responsabilidades'],
    examples:['Pais e filhos que vivem juntos','Avós que criam os netos'] },
  { id:'origem', title:'Origem e significado',
    desc:'A palavra «família» vem do latim familia, derivada de famulus («servo doméstico»). Na Roma Antiga designava o conjunto de pessoas, escravos e bens sob a autoridade do pater familias, e não apenas os parentes.',
    chars:['Origem latina','Sentido inicial ligado à casa e à autoridade','O significado foi-se restringindo aos laços de parentesco'],
    examples:['Pater familias romano: chefe com autoridade sobre todos os membros da casa'],
    extra:'Só com o tempo o termo passou a designar sobretudo o grupo unido por laços de sangue e de casamento.' },
  { id:'instituicao', title:'Família como instituição social',
    desc:'Uma instituição social é um conjunto organizado de normas, valores e papéis que responde a necessidades fundamentais da sociedade. A família é uma instituição porque regula a reprodução, a filiação, a educação e a transmissão de bens.',
    chars:['Possui normas e papéis definidos','É reconhecida e protegida pela lei','Relaciona-se com outras instituições (escola, Estado, religião)'],
    examples:['Regras sobre casamento e herança','Proteção da família na Constituição (art. 67.º)'],
    extra:'A Constituição portuguesa reconhece a família como «elemento fundamental da sociedade», com direito à proteção do Estado.' },
  { id:'fam-sociedade', title:'Família e sociedade',
    desc:'A família e a sociedade influenciam-se mutuamente: a família prepara os indivíduos para viver em sociedade, e as mudanças económicas, culturais e políticas transformam a organização das famílias.',
    chars:['Relação de interdependência','A família reflete as mudanças sociais','A família é a base da socialização primária'],
    examples:['A entrada das mulheres no mercado de trabalho alterou a divisão de tarefas','A escolaridade obrigatória partilhou com a escola a função educativa'] },
  { id:'constituicao', title:'Diferentes formas de constituição familiar',
    desc:'Uma família pode constituir-se de várias formas: através de laços biológicos, do casamento, da união de facto ou da adoção. Todas criam relações familiares reconhecidas socialmente e, em muitos casos, juridicamente.',
    chars:['Diversidade de origens','Reconhecimento legal variável','Os laços afetivos são comuns a todas as formas'],
    items:[
      { id:'const-bio', title:'Por laços biológicos', desc:'Família formada pela filiação biológica: pais e filhos ligados pela descendência.', examples:['Um casal e os filhos biológicos'] },
      { id:'const-uniao', title:'Por casamento ou união de facto', desc:'Família formada pela união de duas pessoas que estabelecem uma comunhão de vida, formalizada pelo casamento ou reconhecida como união de facto.', examples:['Casal casado','Casal em união de facto'] },
      { id:'const-adocao', title:'Por adoção', desc:'Família formada através de um processo legal que estabelece uma relação de filiação entre pessoas sem laço biológico.', examples:['Casal ou pessoa singular que adota uma criança'] }
    ]}
]},

/* ============ 2. TIPOS DE FAMÍLIA ============ */
{ id:'tipos', title:'Tipos de família', color:'#d99a4e',
  desc:'As famílias podem ser classificadas segundo critérios diferentes. Os dois mais importantes são a composição (quem faz parte da família) e a organização conjugal (quantos cônjuges cada pessoa pode ter).',
  chars:['Classificação segundo a composição','Classificação segundo a organização conjugal','Uma família pode pertencer a vários tipos ao mesmo tempo'],
  examples:['Uma família pode ser, simultaneamente, nuclear e monogâmica'],
  extra:'É importante não misturar critérios: «monoparental» descreve a composição; «monogâmica» descreve a organização conjugal.',
  items:[
  { id:'composicao', title:'Quanto à composição',
    desc:'Classificação baseada nos membros que integram a família e nas relações entre eles (número de gerações, presença de um ou dois progenitores, origem dos filhos).',
    items:[
    { id:'nuclear', title:'Família nuclear',
      desc:'Família constituída por um casal e pelos seus filhos, biológicos ou adotados, que vivem na mesma habitação.',
      chars:['Duas gerações (pais e filhos)','Autonomia face à família de origem','Modelo associado às sociedades industriais'],
      examples:['Pai, mãe e dois filhos a viver juntos'],
      extra:'T. Parsons considerou-a o modelo mais adaptado à sociedade industrial, por ser pequena e com grande mobilidade.' },
    { id:'extensa', title:'Família extensa',
      desc:'Também chamada família alargada, inclui, além dos pais e filhos, outros parentes como avós, tios ou primos, frequentemente de três ou mais gerações.',
      chars:['Três ou mais gerações','Redes amplas de entreajuda','Comum em sociedades rurais e tradicionais'],
      examples:['Avós, pais e netos a viver na mesma casa','Famílias rurais em que várias gerações trabalham a terra'] },
    { id:'monoparental', title:'Família monoparental',
      desc:'Família formada por um só progenitor (pai ou mãe) e os seus filhos.',
      chars:['Um único adulto responsável no agregado','Pode resultar de divórcio, viuvez, separação ou opção individual','Maior vulnerabilidade económica em muitos casos'],
      examples:['Mãe divorciada que vive com os dois filhos','Pai viúvo com uma filha'] },
    { id:'recomposta', title:'Família recomposta',
      desc:'Família formada quando um ou ambos os membros de um casal trazem filhos de relações anteriores. Também se designa família reconstituída.',
      chars:['Inclui padrastos, madrastas, enteados e meios-irmãos','Exige adaptação a novos papéis','Cada vez mais frequente com o aumento dos divórcios'],
      examples:['Um casal em que ele tem um filho e ela uma filha de casamentos anteriores'] },
    { id:'homoparental', title:'Família homoparental',
      desc:'Família em que duas pessoas do mesmo sexo exercem a parentalidade de uma ou mais crianças.',
      chars:['Reconhecida juridicamente em Portugal','Os filhos podem resultar de adoção, de relações anteriores ou de procriação medicamente assistida'],
      examples:['Duas mães que criam um filho'],
      extra:'Em Portugal, o casamento entre pessoas do mesmo sexo é permitido desde 2010 (Lei n.º 9/2010) e a adoção desde 2016 (Lei n.º 2/2016).' },
    { id:'adotiva', title:'Família adotiva',
      desc:'Família em que a relação de filiação foi criada por adoção, ato jurídico que confere ao adotado a condição de filho, com os mesmos direitos e deveres dos filhos biológicos.',
      chars:['Vínculo legal e permanente','Decidida pelo tribunal no superior interesse da criança','Pode ser constituída por um casal ou por uma pessoa'],
      examples:['Casal que adota uma criança institucionalizada'] },
    { id:'acolhimento', title:'Família de acolhimento',
      desc:'Família que recebe temporariamente uma criança ou jovem em perigo, que não pode viver com a família de origem, assegurando-lhe cuidados até se encontrar uma solução definitiva.',
      chars:['Medida de proteção temporária','Não cria laço de filiação (não é adoção)','Acompanhada pela Segurança Social'],
      examples:['Família que acolhe uma criança retirada aos pais por negligência'],
      extra:'Em Portugal, o acolhimento familiar está regulado pelo Decreto-Lei n.º 139/2019.' },
    { id:'sem-filhos', title:'Família sem filhos',
      desc:'Família formada por um casal que não tem filhos, por opção ou por impossibilidade.',
      chars:['Constitui uma família de pleno direito','Cada vez mais frequente nas sociedades contemporâneas'],
      examples:['Casal que decide não ter filhos para se dedicar à carreira'] }
  ]},
  { id:'org-conjugal', title:'Quanto à organização conjugal',
    desc:'Classificação baseada no número de cônjuges que cada pessoa pode ter ao mesmo tempo.',
    items:[
    { id:'monogamica', title:'Família monogâmica',
      desc:'Família baseada na monogamia: cada pessoa tem apenas um cônjuge de cada vez.',
      chars:['Forma predominante nas sociedades ocidentais','Única forma legal de casamento em Portugal'],
      examples:['Casamento civil em Portugal'],
      items:[ { id:'monogamia', title:'Monogamia', desc:'Regime conjugal em que uma pessoa só pode estar casada com outra de cada vez.', chars:['Exclusividade conjugal','Pode haver novo casamento após divórcio ou viuvez («monogamia sucessiva»)'] } ] },
    { id:'poligamica', title:'Família poligâmica',
      desc:'Família baseada na poligamia: uma pessoa tem simultaneamente mais do que um cônjuge.',
      chars:['Estudada sobretudo pela antropologia','Não é permitida em Portugal (a bigamia é crime – art. 247.º do Código Penal)'],
      extra:'A poligamia divide-se em duas formas: poliginia e poliandria.',
      items:[
        { id:'poliginia', title:'Poliginia', desc:'Forma de poligamia em que um homem tem várias esposas ao mesmo tempo.', chars:['É a forma de poligamia mais frequente','Associada a prestígio e riqueza em várias culturas'], examples:['Permitida em alguns países com direito da família de base islâmica, com limite de quatro esposas'] },
        { id:'poliandria', title:'Poliandria', desc:'Forma de poligamia em que uma mulher tem vários maridos ao mesmo tempo.', chars:['Muito rara','Frequentemente «fraterna»: os maridos são irmãos'], examples:['Grupos dos Himalaias, como os Nyinba do Nepal'] }
      ]}
  ]}
]},

/* ============ 3. RESIDÊNCIA, PARENTESCO E CASAMENTO ============ */
{ id:'caracteristicas', title:'Características de residência, parentesco e casamento', color:'#56a78b',
  desc:'As famílias podem também ser caracterizadas pelo local onde o casal passa a viver após a união (residência), pelo tipo de laço que une os seus membros (parentesco) e pela forma da união (casamento).',
  chars:['Três dimensões de análise','Regras variam entre culturas'],
  items:[
  { id:'residencia', title:'Residência',
    desc:'Regra social que determina onde o novo casal vai viver depois da união.',
    items:[
      { id:'patrilocal', title:'Residência patrilocal', desc:'O casal vai viver com ou perto da família do marido.', chars:['Associada a sociedades patrilineares','A mulher integra-se no grupo do marido'], examples:['Sociedades rurais tradicionais da China e da Índia'] },
      { id:'matrilocal', title:'Residência matrilocal', desc:'O casal vai viver com ou perto da família da mulher.', chars:['Associada frequentemente a sociedades matrilineares','O marido integra-se no grupo da mulher'], examples:['Povo Hopi (América do Norte)'] },
      { id:'neolocal', title:'Residência neolocal', desc:'O casal estabelece uma nova residência, independente das famílias de origem.', chars:['Típica das sociedades ocidentais e urbanas','Favorece a família nuclear'], examples:['Casal português que arrenda a sua própria casa'] },
      { id:'ambilocal', title:'Residência ambilocal', desc:'O casal pode escolher viver junto da família do marido ou da família da mulher. Também se designa bilocal.', chars:['Flexibilidade de escolha','A decisão depende de recursos, terras ou apoio disponível'], examples:['Casal que vai viver para junto da família que tem mais terras ou espaço'] }
    ]},
  { id:'parentesco-tipos', title:'Parentesco',
    desc:'Vínculo entre pessoas que descendem umas das outras ou de um antepassado comum, ou que se ligam por casamento ou adoção.',
    extra:'O Código Civil define parentesco como o vínculo entre duas pessoas em que uma descende da outra ou ambas descendem de um progenitor comum (art. 1578.º).',
    items:[
      { id:'consanguineo', title:'Parentesco consanguíneo', desc:'Parentesco baseado em laços de sangue, isto é, na descendência biológica.', examples:['Pais e filhos','Irmãos','Avós e netos','Primos'] },
      { id:'afinidade-res', title:'Parentesco por afinidade', desc:'Vínculo que liga cada um dos cônjuges aos parentes do outro, criado pelo casamento (art. 1584.º do Código Civil).', examples:['Sogros','Cunhados','Genros e noras','Enteados'] },
      { id:'adocao-par', title:'Parentesco por adoção', desc:'Parentesco criado por decisão judicial, que integra o adotado na família do adotante como se fosse filho biológico.', chars:['Mesmos direitos e deveres dos filhos biológicos'], examples:['Criança adotada que passa a ter avós, tios e primos na família adotiva'] }
    ]},
  { id:'casamento', title:'Casamento e uniões',
    desc:'Formas socialmente reconhecidas de união entre duas pessoas que pretendem constituir família.',
    extra:'O Código Civil define casamento como o contrato celebrado entre duas pessoas que pretendem constituir família mediante uma plena comunhão de vida (art. 1577.º).',
    items:[
      { id:'civil', title:'Casamento civil', desc:'Casamento celebrado perante um conservador do registo civil, que produz efeitos jurídicos definidos por lei.', chars:['Laico','Pode ser dissolvido por divórcio','Permitido entre pessoas do mesmo sexo desde 2010'], examples:['Cerimónia numa Conservatória do Registo Civil'] },
      { id:'religioso', title:'Casamento religioso', desc:'Casamento celebrado segundo as regras de uma religião. Em Portugal, o casamento católico e outros religiosos podem ter efeitos civis se forem registados.', chars:['Tem significado espiritual e simbólico','Regras próprias de cada religião'], examples:['Casamento católico numa igreja'] },
      { id:'uniao-facto', title:'União de facto', desc:'Situação de duas pessoas que vivem em condições análogas às dos cônjuges há mais de dois anos, sem estarem casadas.', chars:['Regulada pela Lei n.º 7/2001','Confere alguns direitos (habitação, benefícios fiscais)','Não confere todos os efeitos do casamento (por exemplo, na herança)'], examples:['Casal que vive junto há cinco anos sem casar'] },
      { id:'mono-poli', title:'Monogamia e poligamia', desc:'Formas de organização conjugal: na monogamia cada pessoa tem um só cônjuge; na poligamia uma pessoa tem vários cônjuges ao mesmo tempo.', examples:['Monogamia: casamento em Portugal','Poligamia: poliginia e poliandria'] }
    ]}
]},

/* ============ 4. PARENTESCO E ORGANIZAÇÃO SOCIAL ============ */
{ id:'organizacao', title:'Parentesco e organização social', color:'#9277c5',
  desc:'O parentesco é um dos princípios mais antigos de organização das sociedades. Define quem pertence a cada grupo, quem herda bens e nomes, com quem se pode casar e quem tem obrigações de apoio.',
  chars:['Estrutura a pertença a grupos','Regula herança, casamento e autoridade','Especialmente importante em sociedades tradicionais'],
  items:[
  { id:'relacoes-par', title:'Relações de parentesco',
    desc:'Ligações entre familiares, organizadas em linhas e graus. A linha reta liga ascendentes e descendentes; a linha colateral liga pessoas com um antepassado comum.',
    chars:['Linha reta: pais, filhos, avós, netos','Linha colateral: irmãos, tios, sobrinhos, primos','O grau mede a proximidade (número de gerações)'],
    examples:['Pai e filho: 1.º grau da linha reta','Irmãos: 2.º grau da linha colateral'] },
  { id:'linhagem', title:'Linhagem',
    desc:'Grupo de pessoas que descendem de um antepassado comum conhecido, sendo possível traçar as ligações geração a geração.',
    chars:['Antepassado comum identificável','Partilha de nome, bens ou estatuto'],
    examples:['Famílias nobres europeias e os seus brasões'],
    extra:'Quando o antepassado comum é mítico ou não identificável, os antropólogos falam em «clã».' },
  { id:'descendencia', title:'Descendência',
    desc:'Regra que define a partir de que lado (paterno, materno ou ambos) se transmite a pertença ao grupo familiar.',
    items:[
      { id:'patrilinear', title:'Patrilinear', desc:'A descendência é contada pela linha do pai.', examples:['Transmissão do apelido paterno em muitas sociedades'] },
      { id:'matrilinear', title:'Matrilinear', desc:'A descendência é contada pela linha da mãe.', examples:['Povo Minangkabau (Indonésia)','Povo Khasi (Índia)'] },
      { id:'bilateral', title:'Bilateral', desc:'A descendência é reconhecida igualmente pelos lados materno e paterno.', examples:['Portugal: os filhos podem ter apelidos da mãe e do pai'] }
    ]},
  { id:'consanguinidade', title:'Consanguinidade',
    desc:'Relação entre pessoas que partilham ascendência biológica comum («do mesmo sangue»).',
    chars:['Base biológica','Fundamenta impedimentos ao casamento entre parentes próximos'],
    examples:['Irmãos, primos, avós e netos'] },
  { id:'afinidade-org', title:'Afinidade',
    desc:'Relação estabelecida através do casamento, que liga um cônjuge à família do outro.',
    chars:['Não tem base biológica','Cria laços entre famílias diferentes'],
    examples:['Sogra e nora','Cunhados'],
    extra:'Historicamente, o casamento serviu para criar alianças entre famílias e grupos.' },
  { id:'fam-org-social', title:'Família e organização social',
    desc:'A família organiza a vida social ao distribuir papéis, autoridade e recursos, e ao ligar o indivíduo a grupos mais vastos e ao Estado.',
    chars:['Distribui estatutos e papéis','Regula a transmissão de património','Funciona como rede de solidariedade'],
    examples:['Herança de terras e casas','Apoio dos avós no cuidado dos netos'] },
  { id:'grupos', title:'Grupos familiares',
    desc:'Conjuntos de pessoas ligadas por parentesco, de dimensão variável, desde a família nuclear até ao clã ou à tribo.',
    examples:['Família nuclear','Família extensa','Linhagem','Clã'] },
  { id:'transmissao', title:'Transmissão de valores e tradições',
    desc:'A família transmite às novas gerações a língua, os valores, as crenças, os costumes e a memória do grupo.',
    chars:['Garante a continuidade cultural','Ocorre sobretudo através do exemplo e do convívio'],
    examples:['Receitas de família','Festas como o Natal e celebrações religiosas','Histórias contadas pelos avós'] }
]},

/* ============ 5. EVOLUÇÃO HISTÓRICA ============ */
{ id:'evolucao', title:'Evolução histórica', color:'#c87891',
  desc:'A família transformou-se ao longo da história, acompanhando as mudanças económicas, religiosas, políticas e culturais. Passou de uma unidade de produção alargada e hierárquica para formas mais pequenas, diversas e baseadas no afeto.',
  chars:['Mudança da família extensa para a nuclear (no Ocidente)','Do casamento por interesse ao casamento por amor','Maior igualdade entre homens e mulheres'],
  items:[
  { id:'antigas', title:'Família nas sociedades antigas',
    desc:'Na Antiguidade, a família era uma unidade económica, religiosa e política, fortemente hierárquica. Em Roma, o pater familias tinha autoridade quase absoluta sobre a mulher, os filhos e os escravos (patria potestas).',
    chars:['Autoridade patriarcal','Casamentos combinados entre famílias','Culto dos antepassados'],
    examples:['Pater familias romano','Família grega (oikos) como unidade de produção'] },
  { id:'idade-media', title:'Família na Idade Média',
    desc:'Na Idade Média, a família era sobretudo extensa e rural, ligada ao trabalho da terra. A Igreja Católica ganhou grande influência, tornando o casamento um sacramento indissolúvel.',
    chars:['Família como unidade de produção agrícola','Casamento religioso e indissolúvel','Linhagem importante na nobreza'],
    examples:['Famílias camponesas que trabalhavam juntas a terra do senhor'] },
  { id:'rev-industrial', title:'Família durante a Revolução Industrial',
    desc:'A partir do século XVIII, a industrialização e a migração para as cidades separaram o local de trabalho da casa. A família deixou de ser unidade de produção e tornou-se sobretudo unidade de consumo.',
    chars:['Êxodo rural','Afirmação da família nuclear','Trabalho infantil e feminino nas fábricas','Separação entre esfera pública (homem) e doméstica (mulher)'],
    examples:['Famílias operárias nos bairros fabris de Inglaterra'] },
  { id:'sec-xx', title:'Família no século XX',
    desc:'O século XX trouxe grandes mudanças: entrada das mulheres no mercado de trabalho, generalização da escolaridade, métodos contracetivos, legalização do divórcio e igualdade jurídica entre cônjuges.',
    chars:['Diminuição do número de filhos','Aumento dos divórcios','Valorização do afeto e da realização pessoal'],
    examples:['Em Portugal, a Constituição de 1976 consagrou a igualdade entre cônjuges'] },
  { id:'contemporanea', title:'Família na sociedade contemporânea',
    desc:'Atualmente coexistem muitos modelos familiares: nucleares, monoparentais, recompostas, homoparentais, uniões de facto e pessoas que vivem sós. A família é vista como espaço de afeto e de escolha individual.',
    chars:['Diversidade de modelos','Menor número de filhos e casamentos mais tardios','Envelhecimento da população'],
    examples:['Famílias recompostas','Casais em união de facto','Famílias com um só filho'] },
  { id:'transf-papeis', title:'Transformações dos papéis familiares',
    desc:'Os papéis de homem e mulher deixaram de ser rigidamente separados. Pai e mãe partilham cada vez mais o sustento económico, as tarefas domésticas e a educação dos filhos.',
    chars:['Do modelo «homem-provedor / mulher-doméstica» ao modelo de dupla carreira','Maior envolvimento dos pais no cuidado dos filhos'],
    examples:['Licença parental partilhada entre pai e mãe'] },
  { id:'mudancas', title:'Mudanças culturais e sociais',
    desc:'A secularização, a urbanização, a escolarização, a emancipação feminina e as novas tecnologias contribuíram para alterar as formas e os valores familiares.',
    chars:['Maior individualismo','Maior aceitação da diversidade familiar','Novas formas de comunicação'],
    examples:['Aceitação social do divórcio e da união de facto'] }
]},

/* ============ 6. FUNÇÕES DA FAMÍLIA ============ */
{ id:'funcoes', title:'Funções da família', color:'#4caaa9',
  desc:'As funções da família são as tarefas que esta desempenha para os seus membros e para a sociedade. O antropólogo G. P. Murdock (1949) destacou as funções sexual, reprodutiva, económica e educativa; T. Parsons salientou a socialização primária e o equilíbrio emocional.',
  chars:['Algumas funções foram partilhadas com outras instituições (escola, Estado)','A função afetiva ganhou importância'],
  items:[
  { id:'educativa', title:'Função educativa', desc:'A família ensina às crianças os primeiros conhecimentos, hábitos, regras e valores, e acompanha o seu percurso escolar.', chars:['Partilhada com a escola','Começa logo nos primeiros anos de vida'], examples:['Ensinar a falar, a ler histórias, ajudar nos trabalhos de casa'] },
  { id:'afetiva', title:'Função afetiva', desc:'A família proporciona amor, segurança emocional, sentimento de pertença e apoio nos momentos difíceis.', chars:['Essencial ao desenvolvimento equilibrado','Ganhou centralidade na família contemporânea'], examples:['Apoio dos pais numa fase difícil','Demonstrações de carinho'] },
  { id:'economica', title:'Função económica', desc:'A família garante a satisfação das necessidades materiais dos seus membros: alimentação, habitação, vestuário e saúde, gerindo rendimentos e despesas.', chars:['Antigamente: unidade de produção','Hoje: sobretudo unidade de consumo'], examples:['Orçamento familiar','Apoio financeiro aos filhos estudantes'] },
  { id:'protecao', title:'Função de proteção', desc:'A família protege e cuida dos membros mais vulneráveis: crianças, idosos, doentes e pessoas com deficiência.', examples:['Cuidar de um avô doente','Garantir a segurança das crianças'] },
  { id:'socializadora', title:'Função socializadora', desc:'A família é o principal agente de socialização primária: transmite normas, valores e comportamentos que permitem ao indivíduo integrar-se na sociedade.', chars:['Socialização primária (infância)','Formação da identidade'], examples:['Aprender a cumprimentar, a partilhar e a respeitar os outros'] },
  { id:'cultural', title:'Função cultural', desc:'A família transmite a cultura do grupo: língua, tradições, crenças, gastronomia e memória coletiva.', examples:['Festas tradicionais','Transmissão da língua materna em famílias emigrantes'] },
  { id:'reprodutiva', title:'Função reprodutiva', desc:'A família assegura a renovação das gerações através do nascimento e da criação de filhos, garantindo a continuidade da sociedade.', chars:['Nem todas as famílias têm filhos','Ligada à natalidade de um país'], examples:['Nascimento e criação dos filhos'], extra:'A baixa natalidade em Portugal faz desta função um tema de preocupação social.' }
]},

/* ============ 7. PAPÉIS CONJUGAIS E PARENTAIS ============ */
{ id:'papeis', title:'Papéis conjugais e parentais', color:'#d17b5e',
  desc:'Os papéis familiares são os comportamentos, direitos e deveres esperados de cada membro. Os papéis conjugais referem-se à relação entre os cônjuges; os papéis parentais referem-se à relação entre pais e filhos.',
  chars:['São construídos socialmente','Evoluíram no sentido da igualdade'],
  items:[
  { id:'conjugais', title:'Papéis conjugais',
    desc:'Comportamentos e responsabilidades que cada cônjuge assume na vida em comum.',
    items:[
      { id:'resp-conjuges', title:'Responsabilidades dos cônjuges', desc:'Os cônjuges estão reciprocamente vinculados pelos deveres de respeito, fidelidade, coabitação, cooperação e assistência (art. 1672.º do Código Civil).', examples:['Apoiar o outro em caso de doença','Contribuir para as despesas da casa'] },
      { id:'igualdade', title:'Igualdade de género', desc:'Princípio segundo o qual homens e mulheres têm os mesmos direitos e deveres na família e na sociedade.', chars:['Consagrado na Constituição (art. 36.º)','Combate a estereótipos de género'], examples:['Ambos decidem sobre a educação dos filhos e a gestão do dinheiro'] },
      { id:'partilha', title:'Partilha de tarefas domésticas', desc:'Distribuição equilibrada das tarefas da casa e do cuidado entre os membros da família.', chars:['Ainda existem desigualdades: as mulheres dedicam, em média, mais tempo às tarefas domésticas'], examples:['Escalas de tarefas: cozinhar, limpar, tratar da roupa'] }
    ]},
  { id:'parentais', title:'Papéis parentais',
    desc:'Comportamentos e responsabilidades dos pais (ou de quem exerce a parentalidade) em relação aos filhos.',
    items:[
      { id:'resp-parentais', title:'Responsabilidades parentais', desc:'Conjunto de poderes e deveres dos pais destinados a assegurar a segurança, a saúde, o sustento, a educação e o desenvolvimento dos filhos menores.', chars:['Exercidas no superior interesse da criança','Mantêm-se após o divórcio'], extra:'Desde a Lei n.º 61/2008, a expressão «poder paternal» foi substituída por «responsabilidades parentais».' },
      { id:'educacao-filhos', title:'Educação dos filhos', desc:'Tarefa de orientar o desenvolvimento intelectual, moral e social dos filhos, preparando-os para a autonomia.', examples:['Acompanhar a vida escolar','Transmitir valores como o respeito e a responsabilidade'] },
      { id:'autoridade', title:'Autoridade parental', desc:'Capacidade dos pais de estabelecer regras e limites aos filhos, exercida de forma responsável, sem violência e respeitando a opinião da criança de acordo com a sua maturidade.', chars:['Evoluiu de um modelo autoritário para um modelo democrático/dialogante'], examples:['Definir horários e regras de utilização do telemóvel'] }
    ]},
  { id:'cooperacao', title:'Cooperação familiar', desc:'Colaboração entre todos os membros da família, incluindo os filhos, para o bem-estar comum.', examples:['Filhos que ajudam nas tarefas de acordo com a idade','Entreajuda entre gerações'] },
  { id:'direitos-deveres', title:'Direitos e deveres', desc:'Na família, todos têm direitos e deveres: os pais devem sustentar e educar os filhos; os filhos devem respeito aos pais e, quando adultos, podem ter o dever de os apoiar.', chars:['Igualdade entre cônjuges','Proteção especial das crianças','Dever de alimentos entre familiares'], extra:'A Constituição (art. 36.º) estabelece que os pais têm o direito e o dever de educação e manutenção dos filhos.' }
]},

/* ============ 8. DESAFIOS ATUAIS ============ */
{ id:'desafios', title:'Desafios atuais', color:'#cb7770',
  desc:'As famílias contemporâneas enfrentam desafios resultantes das mudanças económicas, demográficas, tecnológicas e culturais, que afetam a sua estabilidade e bem-estar.',
  chars:['Desafios diferentes conforme os recursos de cada família','Exigem políticas públicas de apoio'],
  items:[
  { id:'divorcio', title:'Divórcio e separação', desc:'Dissolução do casamento ou da união. O divórcio tornou-se mais frequente e socialmente aceite, originando famílias monoparentais e recompostas.', chars:['Pode ser por mútuo consentimento ou sem consentimento de um dos cônjuges','Exige regulação das responsabilidades parentais'], examples:['Guarda partilhada dos filhos'] },
  { id:'desemprego', title:'Desemprego e dificuldades económicas', desc:'A perda de rendimentos, a precariedade laboral e o custo da habitação afetam o bem-estar e a estabilidade das famílias.', examples:['Jovens adultos que não conseguem sair de casa dos pais','Famílias em risco de pobreza'] },
  { id:'envelhecimento', title:'Envelhecimento da população', desc:'O aumento da esperança de vida e a baixa natalidade fazem crescer o número de idosos, aumentando as necessidades de cuidado.', chars:['Mais gerações vivas em simultâneo','Sobrecarga dos cuidadores informais'], examples:['Filhos que cuidam dos pais idosos','Estatuto do Cuidador Informal'] },
  { id:'conciliacao', title:'Conciliação entre trabalho e família', desc:'Dificuldade em equilibrar horários de trabalho, deslocações e responsabilidades familiares.', examples:['Teletrabalho','Horários flexíveis','Licenças parentais'] },
  { id:'migracao', title:'Migração', desc:'A emigração e a imigração podem separar membros da família e exigir adaptação a novas culturas.', examples:['Pais emigrados que deixam filhos com os avós','Famílias transnacionais que comunicam por videochamada'] },
  { id:'tecnologia', title:'Tecnologia e redes sociais', desc:'As tecnologias facilitam a comunicação à distância, mas podem reduzir o tempo de convívio presencial e criar conflitos sobre o seu uso.', chars:['Vantagens: contacto à distância, acesso à informação','Riscos: dependência, isolamento, ciberbullying'], examples:['Refeições em família com todos ao telemóvel'] },
  { id:'violencia', title:'Violência doméstica', desc:'Maus-tratos físicos, psicológicos, sexuais ou económicos praticados entre membros da família ou numa relação íntima.', chars:['É crime público em Portugal (art. 152.º do Código Penal)','Atinge sobretudo mulheres, crianças e idosos'], examples:['Linha de apoio à vítima: 116 006 (APAV)'] },
  { id:'novos-modelos', title:'Novos modelos familiares', desc:'O aparecimento de famílias recompostas, homoparentais, monoparentais e uniões de facto exige o seu reconhecimento social e jurídico e o combate ao preconceito.', examples:['Alterações legais para reconhecer novos modelos'] },
  { id:'educ-criancas', title:'Educação das crianças', desc:'Os pais enfrentam o desafio de educar num mundo em rápida mudança, com pouco tempo disponível e muitas influências externas.', examples:['Gestão do tempo de ecrã','Equilíbrio entre proteção e autonomia'] },
  { id:'privacidade', title:'Privacidade digital', desc:'Proteção dos dados e da imagem dos membros da família, sobretudo das crianças, no mundo digital.', chars:['Risco de exposição excessiva («sharenting»)','Importância do controlo parental e da literacia digital'], examples:['Pais que publicam fotos dos filhos nas redes sociais sem o seu consentimento'] }
]}
];

/* Disponibiliza os conteúdos para main.js */
window.FAMILY_CONTENT = { familyMap, ROOT_INFO };
