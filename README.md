# Aplicação de Gerenciamento de Boletos

Esta é uma aplicação de gerenciamento de boletos, que permite realizar diversas operações relacionadas a boletos, incluindo criação, consulta e geração de relatórios.

## Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Node.js (versão X.X.X ou superior)
- npm (gerenciador de pacotes do Node.js)
- Banco de dados (por exemplo, PostgreSQL)

## Instalação

1. Clone este repositório em sua máquina local:

```
git clone https://github.com/HenriqueMVSS/desafio-backend-nodejs.git
```

2. Navegue até o diretório do projeto:

```
cd boleto-management-app
```

3. Instale as dependências do projeto usando o npm:

```
npm install
```

4. Configure as informações de conexão com o banco de dados no arquivo `.env`, fornecendo os valores adequados para as variáveis de ambiente.

5. Execute as migrações do banco de dados para criar as tabelas necessárias:

```
npm run db:migrate
```

## Execução

Após a conclusão da instalação e configuração, você pode executar a aplicação da seguinte maneira:

```
npm start
```

A aplicação estará sendo executada em `http://localhost:3000`.

## Utilização

A aplicação oferece as seguintes funcionalidades:

### 1. Criação de Boletos

Você pode criar um novo boleto enviando uma solicitação POST para o endpoint `/boletos`. O corpo da solicitação deve conter os seguintes campos:

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
GET /boletos?nome=JOSE&valor_inicial=100&valor_final=200&id_lote=2
```

### 3. Geração de Relatório

Você pode gerar um relatório em formato PDF contendo uma tabela com os boletos especificados, enviando uma solicitação GET para o endpoint `/relatorio`. O relatório será retornado em formato PDF.

Os boletos a serem incluídos no relatório devem ser especificados usando o seguinte parâmetro de consulta:

- `boletos`: Array de IDs dos boletos a serem incluídos no relatório.

Exemplo de uso:

```
GET /relatorio?boletos=1,2,3
```

O relatório será retornado como um arquivo PDF.

## Contribuição

Se você quiser contribuir para este projeto, fique à vontade para enviar pull requests ou relatar problemas.

## Licença

Este projeto está licenciado sob a licença [MIT](https://opensource.org/licenses/MIT).
