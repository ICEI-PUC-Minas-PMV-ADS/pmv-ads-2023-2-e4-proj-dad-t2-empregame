# Plano de Testes de Usabilidade

O teste de usabilidade permite avaliar a qualidade da interface com o usuário da aplicação interativa. O Plano de Testes de Software é gerado a partir da especificação do sistema e consiste em casos de testes que deverão ser executados quando a implementação estiver parcial ou totalmente pronta.

#Plano de testes para Recrutadores

# Teste: Tela de Cadastro de Recrutadores

**Objetivo:** Verificar se a tela de cadastro de recrutadores está funcionando corretamente e permite que os recrutadores se inscrevam no site.

**Passos:**
1. Abra a página de registro de recrutadores no site.
2. Preencha todos os campos obrigatórios, como nome, sobrenome, endereço de e-mail, senha, número de telefone, nome da empresa, cargo e outras informações relevantes.
3. Certifique-se de que todas as informações inseridas são válidas e seguem os critérios definidos para cada campo (por exemplo, o formato correto do endereço de e-mail, requisitos de senha).
4. Clique no botão "Cadastrar".

**Resultado Esperado:**
O sistema deve armazenar as informações do recrutador no banco de dados, criando um novo perfil de recrutador.

-------------------------------------------------------------------------------------------------

2- Teste: tela de login de recrutadores
**Objetivo:** Verificar se a tela de login de recrutadores permite que os recrutadores acessem o sistema com sucesso e fornece segurança na autenticação.
**Passos:** 
1. Abra um navegador da web e vá para a página de login dos recrutadores.
2. Verifique se a página de login está acessível e se a URL está correta.
3. Verifique se a página exibe campos de entrada para "Nome de Usuário" e "Senha".
4. Digite um nome de usuário válido no campo "Nome de Usuário".
5. Digite uma senha válida no campo "Senha".
6. Clique no botão "Entrar" ou pressione a tecla "Enter" no teclado.
**Resultado Esperado:**
Se as informações estiverem corretas, o sistema deve redirecionar o recrutador para a página inicial do sistema.

-------------------------------------------------------------------------------------------------

3- Teste: "Esqueceu a senha?"
**Objetivo:** Verificar se a funcionalidade "Esqueceu a senha?" permite que os usuários redefinam suas senhas com sucesso e garante que o processo seja seguro.
**Passos:**
1. Abra um navegador na página de login e clique em "Esqueceu a senha" para iniciar a recuperação de senha.
2. Verifique se a página exibe um campo de entrada para "Endereço de E-mail".
3. Digite um endereço de e-mail válido no campo "Endereço de E-mail".
4. Clique no botão "Enviar" ou pressione a tecla "Enter" no teclado.
**Resultado Esperado:**
Se o endereço de e-mail estiver registrado no sistema, o sistema deve enviar um e-mail de recuperação de senha para o endereço fornecido.
O e-mail de recuperação de senha deve conter o token para a recuperação da senha.
Se o e-mail não estiver cadastro a mensagem que aparecerá é "Usuário não encontrado".
Se o código informado no token for incorreto a mensagem "Código inválido" aparecerá".

-------------------------------------------------------------------------------------------------

4- Teste: utilizar filtro de pesquisa das vagas
**Objetivo:** Verificar se a funcionalidade de filtro de pesquisa de vagas permite aos recrutadores de acordo com critérios específicos e fornece resultados precisos.
**Passos:**
**Resultado Esperado:**

-------------------------------------------------------------------------------------------------

5- Teste editar tela perfil do recrutador
**Objetivo:**
**Passos:**
**Resultado Esperado:**

6- Teste: Chat 
**Objetivo:**
**Passos:**
**Resultado Esperado:**

7- Teste: Deletar conta de recrutador
**Objetivo:**
**Passos:**
**Resultado Esperado:**

8- Teste: Inativar uma vaga 
**Objetivo:**
**Passos:**
**Resultado Esperado:**


#Plano de testes para Candidatos

1- Teste: tela de cadastro de candidatos
**Objetivo:**
**Passos:**
**Resultado Esperado:**

2- Teste: tela de login de candidatos
**Objetivo:**
**Passos:**
**Resultado Esperado:**

3- Teste: "esqueceu a senha?"
**Objetivo:**
**Passos:**
**Resultado Esperado:**

4- Teste: utilizar filtro de pesquisa das vagas
**Objetivo:**
**Passos:**
**Resultado Esperado:**

5- Teste editar tela perfil do candidatos
**Objetivo:**
**Passos:**
**Resultado Esperado:**

6- Teste: Chat 
**Objetivo:**
**Passos:**
**Resultado Esperado:**

7- Teste: Deletar conta de candidato
**Objetivo:**
**Passos:**
**Resultado Esperado:**


