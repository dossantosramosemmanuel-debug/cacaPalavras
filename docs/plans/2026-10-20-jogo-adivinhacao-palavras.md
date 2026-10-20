# PRD — Jogo casual de adivinhação de palavras

## 1. Visão geral
O jogo proposto é um título casual de adivinhação de palavras com mecânica simples, rápida e altamente viciante. A ideia é permitir sessões curtas, boa legibilidade e alto potencial de repetição, mantendo o esforço cognitivo baixo e a gratificação imediata alta.

## 2. Pesquisa de mercado e referências
### 2.1 Wordle
O Wordle popularizou um padrão de jogo baseado em:
- uma única palavra secreta por rodada;
- até 6 tentativas;
- feedback por cores (letra certa/posição certa, letra certa/posição errada, letra inexistente);
- sessões em tempo real, curtas e repetíveis;
- compartilhamento social de resultados;
- incentivo diário por "desafio do dia".

Esse modelo funciona bem porque combina simplicidade, clareza das regras e recompensa instantânea. A curva de aprendizado é baixa, e o jogador consegue entender o mecanismo em poucos segundos.

### 2.2 Hangman
O jogo de forca é uma referência clássica de adivinhação por letras. Ele funciona com:
- palavra oculta representada por traços;
- adivinhação de letras ou da palavra inteira;
- risco de erro visualizado por um desenho de progresso;
- forte senso de desafio e consequente tensão emocional.

Ele é mais acessível em termos de mecânica, mas tende a ser menos inovador e menos envolvente em comparação com modelos mais modernos, como Wordle, quando o objetivo é criar algo casual, viral e com retenção diária.

### 2.3 Padrões de sucesso em jogos casuais de palavras
A partir dos jogos mais populares, os elementos-chave de sucesso incluem:
- partidas de 30 segundos a 3 minutos;
- regra fácil de aprender em menos de 10 segundos;
- feedback visual imediato;
- sensação de progresso e resolução;
- recompensas leves: streak, pontos, conquistas, ranking local;
- algoritmo de dificuldade ajustado ao nível do jogador;
- mecanismo de repetição sem fricção (diário, infinito, desafio aleatório);
- baixa barreira de entrada em mobile e web.

## 3. Direção do produto
### Objetivo principal
Criar um jogo casual de adivinhação de palavras com boa retenção, baixa complexidade e alto potencial de replay, pensado para dispositivos móveis e web.

### Proposta de valor
- diversão rápida sem necessidade de instruções longas;
- sensação de progresso e competência;
- jogabilidade acessível para públicos diversos;
- possibilidade de expansão para modos diários, desafios, categorias e personalização.

## 4. Público-alvo
O produto pode ser direcionado a:
- jogadores casuais em geral;
- pessoas que gostam de quizzes e palavras cruzadas;
- estudantes que querem praticar vocabulário;
- usuários de mobile que procuram jogos rápidos e sem aprendizado complexo.

## 5. Core loop sugerido
1. O jogador inicia uma partida.
2. Visualiza a palavra mascarada ou a descrição/clue.
3. Escolhe letras ou tenta adivinhar a palavra.
4. Recebe feedback imediato.
5. Acumula pontos, progresso ou sequência diária.
6. Repete em novo desafio ou próxima rodada.

## 6. Funcionalidades propostas (rascunho de PRD)
### 6.1 Modo principal
- partida single-player;
- palavra secreta aleatória ou por categoria;
- feedback visual por letras corretas, erradas e mal posicionadas;
- número limitado de tentativas.

### 6.2 Modos de jogo
- modo clássico (word guessing)
- modo diário com palavra única por dia;
- modo infinito / aleatório;
- modo por categoria (animais, alimentos, tecnologia, países etc.);
- modo de dificuldade (fácil, média, difícil).

### 6.3 Sistema de progresso
- pontuação por acerto;
- streak diário;
- conquistas simples;
- histórico de partidas;
- recordes pessoais.

### 6.4 Experiência de usuário
- interface simples e responsiva;
- teclado virtual para mobile;
- feedback sonoro leve;
- animações curtas;
- mensagens de vitória/derrota esclarecedoras;
- suporte para acessibilidade (alto contraste, texto legível, elementos grandes).

### 6.5 Conteúdo
- banco de palavras em português e/ou inglês;
- definição ou dica contextual;
- classificação por tema e dificuldade;
- filtro por categoria.

### 6.6 Persistência
- salvar progresso local do jogador;
- guardar histórico de partidas;
- registrar melhor pontuação e streak;
- persistir preferências (idioma, som, tema).

## 7. Requisitos não funcionais
- tempo de carregamento baixo;
- compatibilidade com web e mobile;
- usabilidade intuitiva;
- arquitetura simples e escalável;
- tolerância a falhas de rede;
- suporte a múltiplos idiomas;
- bom desempenho em dispositivos modestos.

## 8. Riscos e desafios
- qualidade do banco de palavras;
- variedade sem repetir palavras excessivamente;
- equilíbrio de dificuldade;
- retenção a longo prazo;
- evitar fricção no fluxo de jogo;
- garantir que a experiência seja divertida e não repetitiva.

## 9. Perguntas para alinhamento do produto
Antes de fechar o PRD final, precisamos confirmar os seguintes pontos:
1. A plataforma será web, mobile, ou ambas?
2. O público principal será geral, crianças, estudantes ou jogadores de palavras em inglês/português?
3. O jogo deve seguir uma lógica mais parecida com Wordle, Hangman ou combinando os dois?
4. O projeto deve ter modo diário, modo infinito, ranking ou apenas partidas solo?
5. O jogo será em português, inglês ou multilíngue?
6. Haverá monetização (anúncios, premium, loja de skins)?
7. O foco é entretenimento puro ou também aprendizado de vocabulário?
8. A experiência deve ser mais arcade, mais casual ou mais educativa?
9. O produto precisa de login local ou persistência simples no navegador?
10. Há preferência por visual minimalista, infantil, premium ou retrô?

## 10. Próxima etapa
Com as respostas acima, será possível transformar esse rascunho em um PRD completo com:
- objetivos e metas;
- personas;
- requisitos funcionais detalhados;
- fluxo de usuário;
- backlog inicial;
- critérios de aceitação;
- roadmap de desenvolvimento.
