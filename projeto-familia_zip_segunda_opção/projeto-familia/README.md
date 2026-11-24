# Família — Uma sociedade, diferentes famílias

Website educativo com um **mapa mental interativo sobre a família**, desenvolvido para a disciplina de **Área de Integração (AI)** do curso profissional de **Gestão e Programação de Sistemas Informáticos (GPSI)**.

## Funcionalidades
- **Página inicial** com imagem de uma família, título FAMÍLIA, a frase «Uma sociedade, diferentes famílias.» e o botão **INICIAR** (com animação e transição suave para o mapa).
- **Mapa mental progressivo**: começa apenas com o botão FAMÍLIA no centro do ecrã.
  - 1.º clique em FAMÍLIA → aparecem os 8 tópicos principais (4 de cada lado).
  - Clique num tópico → aparecem as suas subdivisões; cada subdivisão pode abrir outras.
  - Clicar de novo num conceito aberto fecha esse ramo.
  - Cada ramo tem a sua cor; as ligações são desenhadas em SVG.
  - Os ramos nunca se sobrepõem: cada ramo reserva o seu próprio espaço.
- **Painel de definições** (escondido por defeito): ao selecionar um conceito aparece o botão **VER DEFINIÇÃO**. O painel mostra o nome, a definição, as características, exemplos, informação complementar e as subdivisões. Atualiza-se quando se seleciona outro conceito e tem botão para fechar. No computador, empurra o mapa para o lado em vez de o tapar.
- **Expandir tudo / Recolher tudo / Recentrar**.
- **Quiz final** (botão «Quiz» no topo do mapa): 10 perguntas sobre os tipos e as funções da família. Cada resposta é corrigida na hora com uma explicação, e no fim aparece a pontuação com a opção de repetir.
- **Zoom** (roda do rato, botões + e −, ou dois dedos no telemóvel) e **arrastar** o mapa com o rato ou o dedo.
- Design responsivo (computador, tablet e telemóvel).

## Redesenho visual
- `js/visuals.js` (novo) contém apenas elementos gráficos: ilustrações dos temas principais, ícones dos subtópicos e os formatos das imagens (círculo, cartão, hexágono, arco, forma orgânica, quadrado arredondado, anel).
- O layout do mapa passou a ser assimétrico (`TOPIC_LAYOUT` em `js/main.js`), com centro maior e órbitas decorativas.
- Os textos em `js/content.js` e `js/quiz.js` não foram alterados.

## Estrutura
```text
projeto-familia/
├── index.html                    ← página principal (Root Directory no Vercel)
├── css/style.css                 ← estilos
├── js/content.js                 ← conteúdos científicos do mapa (8 tópicos)
├── js/visuals.js                 ← ilustrações e ícones
├── js/main.js                    ← lógica: mapa, animações, zoom, painel
├── js/quiz.js                    ← quiz final (perguntas e lógica)
├── assets/images/familia-inicio.jpg
├── assets/images/familia-circulo.jpg
└── README.md
```

## Como executar
Não precisa de instalação nem de dependências (HTML, CSS e JavaScript puro).
- Abrir `index.html` num navegador, **ou**
- `python3 -m http.server 8080` dentro da pasta e abrir `http://localhost:8080`.

## Publicação (GitHub + Vercel)
1. Substituir no repositório os ficheiros `index.html`, `css/style.css`, `js/content.js`, `js/main.js`, `js/quiz.js` e a pasta `assets/images/` por estes.
2. A imagem nova chama-se `familia-inicio.jpg`. A antiga `familia-inicio.png` já não é usada e pode ser apagada.
3. Fazer *commit* e *push*. O Vercel volta a publicar o site automaticamente.
4. O `index.html` tem de estar na pasta definida como **Root Directory** no Vercel. Se for a raiz do repositório, os ficheiros ficam na raiz; se for `projeto-familia/`, ficam dentro dessa pasta.
5. Não é necessário qualquer *build*. No Vercel, o **Framework Preset** deve ser «Other».

## Para alterar conteúdos
Todos os textos estão em `js/content.js`. Cada conceito pode ter:
`title` (nome), `desc` (definição), `chars` (características), `examples` (exemplos), `extra` (informação complementar) e `items` (subdivisões).

## Para alterar o quiz
As perguntas estão no início de `js/quiz.js`. Cada uma tem `q` (pergunta), `options` (4 respostas), `answer` (posição da certa, a contar de 0) e `explain` (explicação).

## Fontes
- Constituição da República Portuguesa, artigos 36.º, 67.º e 68.º.
- Código Civil Português, artigos 1576.º a 1586.º (relações familiares, parentesco, afinidade), 1577.º (casamento), 1672.º (deveres dos cônjuges), 1877.º e seguintes (responsabilidades parentais).
- Lei n.º 7/2001 (união de facto); Lei n.º 9/2010 (casamento entre pessoas do mesmo sexo); Lei n.º 2/2016 (adoção); Lei n.º 61/2008 (divórcio e responsabilidades parentais); Decreto-Lei n.º 139/2019 (acolhimento familiar).
- Código Penal, artigos 152.º (violência doméstica) e 247.º (bigamia).
- G. P. Murdock, *Social Structure* (1949); T. Parsons & R. Bales, *Family, Socialization and Interaction Process* (1955).
- OpenStax, *Introduction to Anthropology* — Kinship, Family and Marriage: https://openstax.org/books/introduction-anthropology/pages/11-2-defining-family-and-household
- Instituto Nacional de Estatística: https://www.ine.pt/

## Nota científica
As classificações familiares variam entre autores. O mapa separa os tipos de família **quanto à composição** dos tipos **quanto à organização conjugal**. A poligamia, a poliginia e a poliandria são apresentadas como categorias de estudo antropológico. Não são formas de casamento permitidas em Portugal.

## Imagem
Fotografia da página inicial: Unsplash (licença Unsplash, uso livre).
