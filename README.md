# Engenharia de Software II - Trabalho Prático
Objetivo: Desenvolver um pequeno sistema, analisar qualidade e refatorar

## Membros do Grupo
  * Gabriel Valadão Meira
  * Gabriela Assunção Fonseca

## Sistema de Controle Financeiro
O sistema desenvolvido é uma solução para a gestão das finanças pessoais de seus  usuários. É um sistema de controle financeiro que permite aos usuários acompanhar suas contas de diferentes agências, registrar transações de receita e despesa e visualizar seus saldos.

### Entidades
#### User
- ```id``` (INTEGER): Id auto incrementável, chave primária do usuáiro.
- ```name``` (STRING): Nome do usuário.
- ```email``` (STRING): Email do usuário.
- ```password``` (STRING): Senha do usuário.
- ```age``` (INTEGER): Idade do usuário.
- ```role``` (ENUM): Papel do usuário no sistema: 'user', 'admin'.

#### Account
- ```id``` (INTEGER): Id auto incrementável, chave primária da conta.
- ```agency``` (STRING): Agência da conta.
- ```balance``` (FLOAT): Saldo da Conta.
- ```userId``` (INTEGER): Idade do usuário ao qual a conta está associada.

#### Transaction
- ```id``` (INTEGER): Id auto incrementável, chave primária da transação.
- ```type``` (ENUM): Tipo da transação: 'recita', 'despesa'.
- ```category``` (ENUM): Categoria da transação: 'restaurante', 'supermercado', 'roupas', 'educação', 'lazer', 'moradia', 'salário', 'saúde', 'transporte', 'investimento', 'viagem', 'imposto', 'outros'.
- ```description``` (STRING): Descrição opcional da transação.
- ```value``` (FLOAT): Valor da Transação.
- ```accountId``` (INTEGER): ID da conta à qual a transação está asssociada.
- ```date``` (DATEONLY): Data da transação.

### Funcionalidades
Uma das principais funcionalidades do sistema é o registro de transações financeiras, onde os usuários podem inserir os detalhes de tipo (receita ou despesa), categoria, descrição, valor, agência e data da transação. A cada transação, o sistema realiza automaticamente as modificações no saldo da conta correspondente, mantendo os registros atualizados.

Além disso, dentro do sistema, o usuário pode consultar suas transações filtrando com base em diversos critérios (tipo, categoria, agência, período, valor mínimo e valor máximo), atualizar transações e excluí-las, com as devidas alterações no saldo da conta.
 
Os usuários têm também a opção de criar contas, especificando a agência e o saldo inicial. Sobre as contas há a possibilidade de consulta, atualização e exclusão.

Neste sistema, a criação de usuários e a atribuição de seus papeis são responsabilidades exclusivas do administrador, enquanto o usuário pode atualizar seus dados de nome, email, senha e idade. Além disso, o administrador possui a capacidade de visualizar e listar todas as contas, transações e usuários no sistema.

## Tecnologias Utilizadas
Este sistema foi desenvolvido na linguagem <b>JavaScript</b> e o ambiente <b>Node.js</b> foi adotado para a execução do código JavaScript no servidor. O framework <b>Express.js</b> foi empregado para criar rotas e gerenciar requisições.

Para lidar com a autenticação de usuários, foi utilizada a biblioteca <b>Passport</b>, permitindo que eles façam login e acessem suas contas de forma segura. Nesse mesmo contexto, o padrão <b>JWT (JSON Web Tokens)</b> foi usado para gerar tokens que autenticam as solicitações dos usuários, garantindo a segurança das operações.

Para interagir com o banco de dados, o sistema recorre ao <b>Sequelize</b>, um ORM (Object-Relational Mapper), que permite o mapeamento de objetos JavaScript para tabelas em bancos de dados, simplificando assim o acesso e manipulação dos dados armazenados do sistema. Além disso, utilizamos <b>SQLite</b> para o gerenciamento de banco de dados, assegurando eficiência e confiabilidade no armazenamento e recuperação de informações. 
