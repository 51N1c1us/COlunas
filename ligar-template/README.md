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
