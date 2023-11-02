# Engenharia de Software II - Trabalho Prático
Objetivo: Desenvolver um pequeno sistema, analisar qualidade e refatorar

## Membros do Grupo
  * Gabriel Valadão Meira
  * Gabriela Assunção Fonseca

## Sistema de Controle Financeiro
O sistema desenvolvido é uma solução para a gestão das finanças pessoais de seus  usuários. É um sistema de controle financeiro que permite aos usuários acompanhar suas contas de diferentes agências, registrar transações de receita e despesa e visualizar seus saldos.

Uma das principais funcionalidades do sistema é o registro de transações financeiras. Os usuários podem inserir detalhes como tipo (receita ou despesa), categoria, descrição, valor, agência e data da transação. A cada transação, o sistema realiza automaticamente as modificações no saldo da conta correspondente, mantendo os registros atualizados.

Além disso, dentro do sistema, o usuário pode consultar suas transações filtrando com base em diversos critérios (tipo, categoria, agência, período, valor mínimo e valor máximo), atualizar transações e excluí-las, com as devidas alterações no saldo da conta.
 
Os usuários têm também a opção de criar contas, especificando a agência e o saldo inicial. Sobre as contas há a possibilidade de consulta, atualização e exclusão.

Neste sistema, a criação de usuários e a atribuição de funções são responsabilidades exclusivas do administrador, enquanto o usuário pode atualizar seus dados de nome, email, senha e idade. Além disso, o administrador possui a capacidade de visualizar e listar todas as contas, transações e usuários no sistema.

## Tecnologias Utilizadas
Este sistema foi desenvolvido na linguagem <b>JavaScript</b> e o ambiente <b>Node.js</b> foi adotado para a execução do código JavaScript no servidor. O framework <b>Express.js</b>, foi empregado para criar rotas e gerenciar requisições. Além disso, utilizamos <b>SQLite</b> para o gerenciamento de banco de dados, assegurando eficiência e confiabilidade no armazenamento e recuperação de informações. 
