# Preencher Colunas

Automatiza o preenchimento da coluna **Chave** na tabela **Mapeamento de saída** (componente *Exportar Dados* da Ótima) a partir do cabeçalho de uma planilha.

## Como usar

1. Abra `index.html` no navegador e envie o arquivo (`.xlsx`, `.xls`, `.csv`, `.txt`).
   Só a primeira linha é lida, e nada é enviado para a internet.
   Para arquivos Excel a página carrega o leitor SheetJS do cdnjs; no CSV não precisa de internet.
2. Confira/edite a lista de colunas e copie o script gerado.
3. Na página do fluxo, com o painel do componente aberto, aperte `F12` → **Console**, cole o script e Enter.
4. Clique em **Salvar**.

O script:
- preenche as linhas de **Chave** vazias, na ordem das colunas;
- clica no botão **+** automaticamente quando as linhas em branco acabam;
- ignora colunas que já estão na tabela (pode rodar de novo sem duplicar);
- opcionalmente apaga as linhas vazias que sobrarem;
- deixa a coluna **Valor** em branco.

Se o Chrome bloquear a colagem no console, digite `allow pasting` e Enter antes.
