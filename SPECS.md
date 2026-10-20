# Especificação Técnica do Projeto — Jogo Casual de Adivinhação de Palavras

## 1. Visão geral

Este documento detalha a implementação técnica do jogo casual de adivinhação de palavras, com base no design escolhido: "Palavra em 6". O objetivo é entregar uma experiência web rápida, intuitiva e altamente repetível, com foco em estudantes, mecânica de tentativa por palavra, feedback visual instantâneo e baixa curva de aprendizado.

A solução será uma aplicação web responsiva, de fácil manutenção, com arquitetura simples e extensível para futuras evoluções como modos diário, categoria, ranking local e persistência.

## 2. Objetivo do produto

Implementar um jogo em que o usuário tenta descobrir uma palavra secreta em até seis tentativas. A cada tentativa, o sistema avalia cada letra e devolve feedback visual:

- verde: letra correta na posição correta
- amarelo: letra correta em outra posição
- cinza: letra inexistente na palavra

A interface deve ser clara, legível e acessível, prioritando velocidade e facilidade de uso em navegadores desktop e mobile.

## 3. Escopo funcional

### 3.1 Funcionalidades principais
- Iniciar partida com uma palavra aleatória
- Exibir pista ou categoria opcional
- Validar palavra digitada pelo jogador
- Avaliar cada tentativa
- Controlar número de tentativas restantes
- Encerrar vitória ou derrota
- Exibir mensagem final com resultado e palavra correta
- Permitir nova partida
- Registrar estatísticas locais do jogador

### 3.2 Funcionalidades futuras
- modo diário
- categorias por tema
- ranking local
- histórico de partidas
- modo infinito
- login opcional
- suporte multilíngue

## 4. Design escolhido

### 4.1 Nome do conceito
Palavra em 6

### 4.2 Características do design
- visual minimalista
- foco na grade central de letras
- teclado virtual abaixo da grade
- feedback evidente por cor e texto explicativo
- interface de alta legibilidade
- estilização retrô leve, sem excesso visual

### 4.3 Perfil do usuário
- estudantes universitários e do ensino médio
- jogadores casuais
- usuários com pouca familiaridade com jogos digitais complexos
- público que usa celular e navegador web

## 5. Requisitos de negócio

### 5.1 Requisitos funcionais
1. O sistema deve gerar uma palavra aleatória da base de dados disponível.
2. O sistema deve validar se a tentativa possui quantidade correta de letras.
3. O sistema deve comparar cada letra da tentativa com a palavra secreta.
4. O sistema deve fornecer feedback por posição com indicação visual clara.
5. O sistema deve impedir entradas inválidas ou repetidas sem quebrar a UX.
6. O jogo deve permitir no máximo 6 tentativas.
7. O sistema deve exibir vitória ou derrota ao final da rodada.
8. O sistema deve persistir estatísticas locais no navegador.
9. O sistema deve funcionar em desktop e mobile.
10. O sistema deve seguir boas práticas de acessibilidade.

### 5.2 Requisitos não funcionais
- Tempo de resposta imediato
- Interface responsiva
- Compatibilidade com navegadores modernos
- Acessibilidade mínima com contraste e foco visível
- Código modular e fácil de evoluir
- Navegação sem bloqueios e sem dependência de biblioteca pesada

## 6. Arquitetura da solução

### 6.1 Stack proposta
Para uma solução rápida e eficiente, a recomendação técnica é:

- HTML5 para estrutura
- CSS3 para apresentação e responsividade
- JavaScript (ES6+) para lógica
- LocalStorage para persistência local
- Sem framework obrigatório para versão inicial

### 6.2 Arquitetura lógica
A aplicação pode seguir um padrão de SPA simples (Single Page Application) ou uma estrutura baseada em módulos:

- App shell: inicializa a aplicação e controla o estado da partida
- Game engine: gera palavra, valida tentativa, calcula feedback
- UI renderer: renderiza grid, teclado e mensagens
- Storage service: salva estatísticas e preferências
- Accessibility layer: garante foco, leitura e teclado

### 6.3 Estrutura de pastas sugerida
```text
project/
├─ index.html
├─ styles/
│  ├─ base.css
│  ├─ layout.css
│  ├─ game.css
│  └─ accessibility.css
├─ js/
│  ├─ app.js
│  ├─ state.js
│  ├─ game.js
│  ├─ storage.js
│  ├─ ui.js
│  └─ utils.js
├─ data/
│  └─ words.json
├─ assets/
│  ├─ icons/
│  └─ fonts/
└─ README.md
```

## 7. Modelo de dados

### 7.1 Palavra
```js
{
  id: 123,
  text: "JANELA",
  category: "Casa",
  difficulty: "medium",
  hint: "Lugar por onde entra luz"
}
```

### 7.2 Tentativa
```js
{
  attemptIndex: 0,
  guess: "JOGAR",
  result: [
    { letter: "J", status: "correct" },
    { letter: "O", status: "absent" },
    { letter: "G", status: "present" },
    { letter: "A", status: "present" },
    { letter: "R", status: "absent" }
  ]
}
```

### 7.3 Estado da partida
```js
const gameState = {
  secretWord: "",
  currentRow: 0,
  currentCol: 0,
  board: Array.from({ length: 6 }, () => Array(5).fill(null)),
  keyboardState: {},
  attempts: [],
  status: "playing", // playing | won | lost
  category: "",
  hint: "",
  startTime: null,
  endTime: null
};
```

## 8. Lógica de jogo

### 8.1 Geração da palavra
A palavra deve ser escolhida aleatoriamente a partir de um banco de palavras válido para o idioma do jogo (português brasileiro). A seleção deve:

- usar apenas palavras com a quantidade correta de letras
- preferir palavras comuns e acessíveis para estudantes
- permitir filtro por categoria e dificuldade no futuro
- evitar palavras duplicadas em sequência, quando possível

### 8.2 Validação da tentativa
A tentativa deve respeitar as regras:
- palavra deve conter 5 letras
- deve estar presente no banco de palavras
- não pode ser vazia
- não pode conter caracteres inválidos
- deve rejeitar palavras fora do idioma ou fora do conjunto permitido

### 8.3 Cálculo do feedback
Para cada posição da palavra, comparar letra por letra:

- se `guess[i] === secretWord[i]`: status = `correct`
- senão, se `secretWord.includes(guess[i])`: status = `present`
- caso contrário: status = `absent`

Observação importante: a lógica deve evitar contar letras duplicadas de forma incorreta. Exemplo:
- palavra secreta: `MELA`
- tentativa: `AMADA`

A solução deve aplicar regra de contagem por índice e quantidade restante para garantir consistência.

### 8.4 Regras de vitória e derrota
- vitória: palavra correta antes do fim das tentativas
- derrota: 6 tentativas concluídas sem acerto
- após finalização, bloquear novas entradas e exibir ação de nova partida

## 9. Estrutura da interface

### 9.1 Layout principal
A tela principal é composta por:
- cabeçalho com título e indicador do modo
- área de categoria ou dica
- grade de tentativa central
- teclado virtual na parte inferior
- área de mensagem de status
- botão de nova partida

### 9.2 Estrutura visual do protótipo escolhido
- Fundo claro com visual minimalista
- grade de 6 linhas x 5 colunas
- cada célula com borda uniforme e preenchimento condicional
- teclado com letras em blocos grandes e acessíveis
- feedback textual por cor e descrição
- estado de foco visível para acessibilidade

## 10. Componentes da interface

### 10.1 Header
Responsável por:
- exibir nome do jogo
- mostrar categoria ou quantidade de letras
- informar o número de tentativas restantes

### 10.2 Grade de tentativa
Estrutura:
- 6 linhas
- 5 colunas
- cada célula tem tamanho adaptável para mobile e desktop
- aceita entrada por teclado e por clique no teclado virtual

### 10.3 Teclado virtual
Regras:
- exibir todas as letras disponíveis
- atualizar status visual conforme o jogo avança
- permitir interação por clique/touch
- usar `button` ou elemento acessível equivalente

### 10.4 Mensagem de status
Exemplo:
- "Sua palavra precisa ter 5 letras."
- "Letra correta na posição certa!"
- "Você venceu!"
- "A palavra era JANELA."

## 11. Experiência de usuário e UX

### 11.1 Fluxo principal
1. Usuário entra na página
2. Sistema inicializa nova partida
3. Usuário digita a palavra
4. Sistema valida entrada
5. Sistema avalia a tentativa
6. Sistema atualiza grade e teclado
7. Sistema verifica vitória ou derrota
8. Usuário escolhe nova partida ou repete rodada

### 11.2 Microcopy sugerida
- "Adivinhe a palavra em até 6 tentativas."
- "Sua palavra precisa ter 5 letras."
- "Você já usou essa letra."
- "Boa tentativa!"
- "A palavra era X."

### 11.3 Regras de UX
- evitar mensagens muito longas
- usar feedback instantâneo
- manter lógica consistente em todas as telas
- não depender apenas de cor para comunicar status
- priorizar ações principais acima da dobra em mobile

## 12. Acessibilidade

O design deve atender requisitos básicos de acessibilidade web:

- contraste adequado entre texto e fundo
- foco visível em botões e entradas
- navegação por teclado completo
- suporte a leitores de tela
- semântica correta com `button`, `aria-live` e labels relevantes
- tamanhos mínimos de toque adequados
- sem uso exclusivo de cor para transmitir informação

### 12.1 Requisitos mínimos
- contraste mínimo de 4.5:1 em textos normais
- botões com área mínima de toque de 44x44px
- foco visível sempre presente
- mensagens do jogo lidas por `aria-live="polite"`

### 12.2 Implementação sugerida
- `aria-live` na área de mensagens de status
- `aria-label` no teclado virtual
- `role="status"` para alertas de jogo
- uso de texto complementar em elementos coloridos

## 13. Persistência e dados locais

### 13.1 LocalStorage
Estrutura sugerida:
```js
{
  bestStreak: 3,
  totalWins: 24,
  totalGames: 58,
  lastPlayedDate: "2026-10-20",
  preferences: {
    theme: "light",
    sound: true
  }
}
```

### 13.2 Estatísticas locais
- total de partidas
- vitórias
- derrotas
- sequência atual
- melhor sequência
- última palavra jogada

## 14. Design técnico de componentes

### 14.1 Módulos sugeridos
#### app.js
Responsável por iniciar a aplicação, sincronizar UI e eventos.

#### state.js
Responsável por manter o estado global do jogo.

#### game.js
Responsável por:
- selecionar palavra
- validar tentativa
- calcular feedback
- atualizar estado
- verificar fim da partida

#### ui.js
Responsável por:
- renderizar grid
- renderizar teclado
- inserir feedback visual
- atualizar mensagens

#### storage.js
Responsável por:
- ler e gravar LocalStorage
- carregar preferências e estatísticas

#### utils.js
Responsável por:
- normalizar texto
- remover acentos
- converter letras para maiúsculas
- validar entrada

## 15. Lógica de renderização

A renderização pode ser controlada por um único estado e re-render parcial dos elementos:

- quando a palavra muda, renderizar a linha atual
- quando a tentativa é validada, renderizar as células e o teclado
- quando o status muda, renderizar o painel de resultado

### Estrutura de renderização recomendada
- renderBoard()
- renderKeyboard()
- renderMessage()
- renderStats()
- renderControls()

## 16. Validação e testes

### 16.1 Testes unitários
Cobrir:
- seleção de palavra válida
- validação de tamanho da palavra
- cálculo de estados `correct`, `present`, `absent`
- lógica de vitória
- lógica de derrota
- manejo de palavras repetidas
- LocalStorage

### 16.2 Testes de UI
- teclado virtual funcionando
- foco visível e navegação por teclado
- partilha correta de feedback visual
- regras de entrada em mobile

### 16.3 Testes manuais
- interações em desktop e mobile
- zoom de página
- uso com leitor de tela
- uso sem mouse
- comportamento em conexão instável

## 17. Critérios de aceitação

A implementação será considerada pronta quando:

1. A página inicial abre sem erros e inicia partida imediatamente.
2. O jogador consegue digitar e validar uma palavra em até 6 tentativas.
3. A lógica de feedback está correta para todas as combinações possíveis.
4. O jogo apresenta vitória/derrota com mensagens compreensíveis.
5. O teclado virtual e o teclado físico funcionam.
6. O layout é responsivo em mobile e desktop.
7. O interface suporta foco visível e navegação por teclado.
8. Estão persistidas as estatísticas locais do jogador.

## 18. Roadmap de implementação

### Fase 1 — base funcional
- estrutura HTML
- estilos básicos
- geração de palavra
- validadores
- grade de tentativa
- feedback por letras
- vitória/derrota

### Fase 2 — refinamento UX
- teclado virtual
- painel de status
- microcopy
- responsividade
- acessibilidade inicial

### Fase 3 — persistência e melhor experiência
- LocalStorage
- estatísticas
- refinamento visual
- testes e ajustes

### Fase 4 — expansão
- desafios diários
- categorias
- histórico de partidas
- ranking local
- múltiplos idiomas

## 19. Riscos e mitigação

### Risco: palavras inválidas
Mitigação: usar banco de palavras validado e verificar comprimento e conteúdo antes de processar.

### Risco: lógica de feedback inconsistente
Mitigação: implementar testes automatizados para todas as combinações relevantes.

### Risco: baixa usabilidade em mobile
Mitigação: priorizar botões grandes, grid responsivo e feedback claro.

### Risco: baixa acessibilidade
Mitigação: testar foco, contraste e navegação por teclado antes da entrega.

## 20. Conclusão

A implementação do jogo será um produto web simples, rápido e acessível, com baixa curva de aprendizado e alto potencial de replay. O design "Palavra em 6" é a melhor base para a primeira versão, pois preserva clareza, familiaridade e velocidade, ao mesmo tempo em que oferece boa extensibilidade para versões futuras.

A arquitetura sugerida prioriza simplicidade, manutenção e boa experiência em dispositivos móveis e desktop, sem depender de complexidade técnica desnecessária na primeira entrega.
