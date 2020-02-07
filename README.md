
# DESAFIO DA EMPRESA CODELOOP

  

## Desenvolver um sistema básico de cadastramento de estudantes

1. O usuário deve poder “criar, editar e deletar” alunos com as seguintes informações:

- Nome (100 caracteres)

- Data de Nascimento (Data válida)

- Série de Ingresso (1º ao 9º ano)

- Endereço:

- CEP (CEP válido)

- Rua (120 caracteres)

- Número (Apenas números)

- Complemento (50 caracteres)

- Bairro (100 caracteres)

- Cidade (Especificação livre)

- Estado (Especificação livre)

- Dados da mãe:

- Nome da mãe (100 caracteres)

- CPF da mãe (CPF válido)

- Data preferencial para pagamento da mensalidade (Data válida)

2. O usuário deve poder ver todos os alunos cadastrados.

**Notas: Itens com Especificação Livre devem ter seu formato e validação elaborados pelo candidato.**

  ## Requisitos

- NODE.JS (https://nodejs.org/en/download/)
- EXPO (https://docs.expo.io/versions/v36.0.0/)
- YARN (https://classic.yarnpkg.com/pt-BR/docs/install#debian-stable)

  

## Como executar o projeto

- Você deve ter um celular ou um emulador com o aplicativo do EXPO instalado.
- Para iniciar o projeto você deve executar o comando: `yarn start`
- Abra o aplicativo e escanei o QRcode que foi gerado no seu navegador, para testar a aplicação


## Considerações
- Foi utilizado o Redux e Redux Persist para fazer a persistência dos dados.
- Foi utilizado a API do IBGE para retornar os estados brasileiros (https://servicodados.ibge.gov.br/api/docs/localidades).
- Para validar o CPF foi utilizado um codigo pronto disponibilizado pela receita (https://www.devmedia.com.br/validar-cpf-com-javascript/23916).
- Para validar o CEP foi utilizado a API da ViaCEP (https://viacep.com.br/).