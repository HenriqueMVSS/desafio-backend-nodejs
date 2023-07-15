# Aplicação de Gerenciamento de Boletos

Esta é uma aplicação de gerenciamento de boletos, que permite realizar diversas operações relacionadas a boletos, incluindo criação, consulta e geração de relatórios.

## Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Node.js (versão 14.21.3 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Banco de dados (por exemplo, MySQL)

## Instalação

1. Clone este repositório em sua máquina local:

```
git clone https://github.com/HenriqueMVSS/desafio-backend-nodejs.git
```

2. Navegue até o diretório do projeto:

```
cd desafio-backend-nodejs
```

3. Instale as dependências do projeto usando o npm:

```
npm install
```

4. Renomeie o arquivo `.env-example para .env` e configure as informações de conexão com o banco de dados no arquivo `.env`, fornecendo os valores adequados para as variáveis de ambiente.

## Execução

Após a conclusão da instalação e configuração, você pode executar a aplicação da seguinte maneira:

```
npm start
```

A aplicação estará sendo executada em `http://localhost:3000`.

## Utilização

### Obs: Obrigatoriamente será necessário criar uma pasta na raiz do projeto com o nome `uploads`, para o PDF ser salvo e desmembrado localmente dentro da mesma.

A aplicação oferece as seguintes funcionalidades:

### 1. Importação de Boletos

Você pode importar um boleto enviando uma solicitação POST para o endpoint `/boletos/importar`. Inclua o arquivo CSV no corpo da requisição com a chave file e obrigatoriamente o boleto tem que conter os campos abaixo:

- `nome_sacado`: Nome do sacado.
- `id_lote`: ID do lote ao qual o boleto está associado.
- `valor`: Valor do boleto.
- `linha_digitavel`: Linha digitável do boleto.
- `ativo`: Indicador de status do boleto (true para ativo, false para inativo).

### 2. Consulta de Boletos

Você pode consultar todos os boletos existentes no sistema enviando uma solicitação GET para o endpoint `/boletos`. Os boletos serão retornados em formato JSON.

Também é possível realizar filtros opcionais na consulta, usando os seguintes parâmetros de consulta:

- `nome`: Filtra os boletos pelo nome do sacado.
- `valor_inicial`: Filtra os boletos pelo valor mínimo.
- `valor_final`: Filtra os boletos pelo valor máximo.
- `id_lote`: Filtra os boletos pelo ID do lote.

Exemplo de uso:

```
GET /boletos?nome_sacado=JOSE&valor=182.54&id_lote=3
```

## 3. Importação dos boletos em PDF

Envie uma requisição POST para o endpoint `/pdf/importar` utilizando o Postman ou outra ferramenta similar. Inclua o arquivo PDF no corpo da requisição com a chave file. O servidor irá importar os boletos do PDF, desmembra-los caso tenham mais de 1 página e salva-los na pasta uploads.

## 3. Geração de Relatório em PDF

Para gerar um relatório em PDF com os boletos filtrados, envie uma requisição GET para o endpoint `/pdf/relatorio?relatorio=1`. Certifique-se de que o parâmetro `relatorio` esteja definido como `1`.

O servidor irá gerar um arquivo PDF contendo um relatório com os boletos que correspondem aos filtros especificados. O relatório será retornado como uma resposta JSON com a chave `base64`, contendo o base64 do arquivo PDF.

### Considerações finais

No projeto tem dois arquivos `boletos.csv e boletos.pdf`, que podem ser utilizados no teste da funcionalidade da aplicação

## Contribuição

Se você quiser contribuir para este projeto, fique à vontade para enviar pull requests ou relatar problemas.

## Licença

Este projeto está licenciado sob a licença [MIT](https://opensource.org/licenses/MIT).

