# Ligar saídas do "Executar JavaScript" a cards "Template WhatsApp"

Automatiza o gesto de arrastar cada bolinha de saída livre do card **Executar JavaScript** até o canvas
vazio, abrir a busca e escolher **Template WhatsApp**.

## Uso

1. Abra o fluxo no editor. Não precisa deixar o card visível por inteiro, mas não feche a página.
2. `F12` → **Console** → (se pedir) digite `permitir colar` e Enter.
3. Cole o conteúdo de `ligar-saidas.js`. **A primeira execução liga só 1 saída** (`QUANTIDADE = 1`) para você conferir.
4. Deu certo? Troque `QUANTIDADE = 1` por `QUANTIDADE = 0` (todas) e rode de novo.
5. Clique em **Salvar**. Os cards novos ficam em coluna à direita do fluxo; o botão de reorganizar do canvas arruma o layout.

O script só mexe em saídas **sem ligação** (sem a classe `connected`), então pode rodar de novo sem duplicar.
Ele **para** na primeira falha (popup não abriu, item não achado, card não criado), em vez de criar lixo.

## Se não funcionar

Cole `gravador.js` no console, faça **um** arrasto manual até criar o Template WhatsApp, rode `__rec.copiar()`
e mande o resultado: ele mostra quais eventos (mouse/pointer) o canvas realmente usa e o HTML do popup de busca.

## Renomear os Template WhatsApp com o nome da saída

1. (Opcional) `mapear-ligacoes.js` — só lê a página e mostra a tabela `saida → card`. Avisa se um card estiver ligado a mais de uma saída.
2. `renomear-cards.js` — para cada card ligado a uma saída: clica no card, preenche **Descrição** no painel *Propriedades* com o nome da saída e fecha o painel.
   - A primeira execução renomeia só 1 card (`QUANTIDADE = 1`). Conferiu? Troque por `0` e rode de novo.
   - Cards que já têm nome são pulados (`SOBRESCREVER = false`).
   - Cards ligados a mais de uma saída são pulados e listados no console — confira à mão.
   - Para na primeira falha (painel não abriu, nome não apareceu no card, outro card mudou junto).
3. Clique em **Salvar**.

## Organizar os cards em grupos

`organizar-cards.js` agrupa os Template WhatsApp pela base oficial da planilha
e arruma cada grupo num bloco em grade (`COLUNAS_POR_GRUPO` cards por linha), com os blocos empilhados na mesma ordem
das saídas do JavaScript. Os blocos ficam à direita do card JavaScript, num lugar livre.

- Os blocos seguem a **NOMENCLATURA BASE OFICIAL** da planilha `Templates_BV_ADM.xlsx` (tabela `BASE_OFICIAL` no topo do script, 53 saídas). Saída que não está na planilha vai para um bloco "SEM BASE OFICIAL".
- `SO_MOSTRAR_PLANO = true` só imprime a tabela com a posição de cada card, sem mover nada.
- A primeira execução move só 1 card (`QUANTIDADE = 1`). Conferiu? `QUANTIDADE = 0` move todos.
- Cards ligados a mais de uma saída são pulados e listados. Para na primeira falha. Depois, **Salvar**.

## Descobrir em qual número está cada template

`descobrir-linhas.js` descobre em qual número (linha) cada template da planilha `Templates_BV_ADM.xlsx` (53 nomes + base oficial) está disponível.
Ele usa **um** card Template WhatsApp e **marca/desmarca os números sozinho**:

1. Crie/abra um card Template WhatsApp **descartável** (sem templates escolhidos) e deixe o painel *Propriedades* aberto.
   Desmarcar um número apaga a configuração dele no card, por isso o script recusa rodar se algum número já tiver template escolhido
   (a menos que você mude `CARD_DESCARTAVEL = true`).
2. Cole o script no console e aperte Enter.
3. Para cada número da lista de **Números WhatsApp** (ou só os de `NUMEROS = [...]`): deixa só ele marcado, abre a lista **Template**,
   lê todos os itens (rolando) e fecha sem escolher nada. No fim recoloca os números que estavam marcados no começo.
4. Resultado: `console.table` (template × base oficial × números), `window.__linhas` e o download `templates_por_numero.csv`.
5. **Não salve** esse card (ou exclua-o).

Templates que não aparecem em nenhum número vêm como "— não achei —". Para na hora se não conseguir fechar a lista, para não escolher
um template sem querer. Se não achar o campo Template, guarda o HTML em `window.__diag`.
