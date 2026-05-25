# Projeto de automação de teste de API usando cypress 

## API usada para automação 
https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth-CreateToken

### Health da aplicação
``` curl
curl -i https://restful-booker.herokuapp.com/ping
```

## Funcionalidades da api

> Criar token

> Criar agendamento

> Alterar agendamento parcial

> Alterar agendamento total

> Deletar agendamento 

> Buscar agendamento

> Buscar todos agendamentos

### Instalação

Criar projeto
``` javascript
npm init -y
```

Instalar cypress
``` javascript
npm install cypress 
```

### Bibliotecas

faker-js

``` javascript
npm install @faker-js/faker
```

### Executar projeto

``` javascript
npx cypress open
```

------
###### Mentoria qazando