# Plano de Testes de Usabilidade

O teste de usabilidade permite avaliar a qualidade da interface com o usuário da aplicação interativa. O Plano de Testes de Software é gerado a partir da especificação do sistema e consiste em casos de testes que deverão ser executados quando a implementação estiver parcial ou totalmente pronta.

#Plano de testes para Recrutadores

## 1. Teste: Tela de Cadastro de Recrutadores

**Objetivo:** Verificar se a tela de cadastro de recrutadores está funcionando corretamente e permite que os recrutadores se inscrevam no site.

**Passos:**
1. Abra a página de registro de recrutadores no site.
2. Preencha todos os campos obrigatórios, como nome, sobrenome, endereço de e-mail, senha, número de telefone, nome da empresa, cargo e outras informações relevantes.
3. Certifique-se de que todas as informações inseridas são válidas e seguem os critérios definidos para cada campo (por exemplo, o formato correto do endereço de e-mail, requisitos de senha).
4. Clique no botão "Cadastrar".

**Resultado Esperado:**
O sistema deve armazenar as informações do recrutador no banco de dados, criando um novo perfil de recrutador.

-------------------------------------------------------------------------------------------------

## 2. Teste: Tela de Login de Recrutadores

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

## 3. Teste: "Esqueceu a Senha?"

**Objetivo:** Verificar se a funcionalidade "Esqueceu a senha?" permite que os usuários redefinam suas senhas com sucesso e garante que o processo seja seguro.

**Passos:**
1. Abra um navegador na página de login e clique em "Esqueceu a senha" para iniciar a recuperação de senha.
2. Verifique se a página exibe um campo de entrada para "Endereço de E-mail".
3. Digite um endereço de e-mail válido no campo "Endereço de E-mail".
4. Clique no botão "Enviar" ou pressione a tecla "Enter" no teclado.

**Resultado Esperado:**
- Se o endereço de e-mail estiver registrado no sistema, o sistema deve enviar um e-mail de recuperação de senha para o endereço fornecido.
- O e-mail de recuperação de senha deve conter o token para a recuperação da senha.
- Se o e-mail não estiver cadastrado, a mensagem "Usuário não encontrado" deve aparecer.
- Se o código informado no token for incorreto, a mensagem "Código inválido" deve ser exibida.
- Se o código informado no token for o correto, a tela para alteração de senha será exibida.

-------------------------------------------------------------------------------------------------

## 4. Teste: Utilizar Filtro de Pesquisa das Vagas

**Objetivo:** Verificar se a funcionalidade de filtro de pesquisa de vagas permite aos recrutadores filtrar vagas de acordo com critérios específicos e fornece resultados precisos.

**Passos:**
1. Abra o navegador na página do feed de recrutadores.
2. Vá até o canto direito da tela e teste as 3 opções de filtro.

**Resultado Esperado:**
Espera-se que, ao usar as opções de filtro, o sistema apresente resultados precisos de acordo com os critérios selecionados. Os resultados devem corresponder aos filtros aplicados.


-------------------------------------------------------------------------------------------------

## 5. Teste: Editar Tela Perfil do Recrutador

**Objetivo:** Verificar se a funcionalidade de edição do perfil do recrutador permite que o usuário atualize com sucesso as informações do seu perfil.

**Passos:**
1. Abra o navegador e acesse a página de perfil do recrutador.
2. Localize a opção de edição de perfil ou botão de "Editar" e clique nele.
3. Edite as informações desejadas no perfil do recrutador, como nome, informações de contato, foto de perfil, ou outras informações relevantes.
4. Salve as alterações clicando no botão "Salvar".

**Resultado Esperado:**
Espera-se que, após a conclusão dos passos acima, as informações do perfil do recrutador sejam atualizadas com sucesso. As informações editadas devem ser refletidas corretamente no perfil do recrutador, e o sistema deve fornecer uma confirmação de "Informações atualizadas com sucesso".


-------------------------------------------------------------------------------------------------

## 6. Teste: Chat

**Objetivo:** Verificar a funcionalidade do chat e garantir que os usuários possam interagir com sucesso por meio do chat.

**Passos:**
1. Acesse a área de chat do sistema após o match com o candidato.
3. Envie uma mensagem para o destinatário.
4. Aguarde uma resposta do destinatário.
   
**Resultado Esperado:**
Espera-se que o chat funcione de maneira adequada e que os seguintes resultados sejam alcançados:
- As mensagens são enviadas e recebidas de forma rápida e confiável.
- Mensagens formatadas são exibidas corretamente.
- O chat proporciona uma experiência de comunicação satisfatória entre os usuários.


-------------------------------------------------------------------------------------------------

## 7. Teste: Exclusão do Recrutador

**Objetivo:** Verificar a funcionalidade de exclusão do perfil do recrutador.

**Passos:**
1. Abra o navegador e acesse a página de perfil do recrutador.
3. Clicar em "Excluir conta".
4. Apar3cerá uma janela de confirmação da exclusão do perfil: "VocÊ tem certeza que deseja deletar a sua conta?
5. Clicar em "Excluir"
   
**Resultado Esperado:**
Resultado Esperado:  O recrutador será redirecionado para a página principal da aplicação com uma mensagem confirmação de "Conta excluída com sucesso! Você será desconectado".


-------------------------------------------------------------------------------------------------

## 8. Teste: Alteração de Senha Recrutador

**Objetivo:** Verificar a funcionalidade de alteração de senha recrutador.

**Passos:**
1. Abra o navegador e acesse a página de perfil do recrutador.
3. Clicar em "Alterar senha".
4. Aparecerá uma janela de confirmação da exclusão do perfil: "VocÊ tem certeza que deseja deletar a sua conta?
5. Clicar em "Excluir"
   
**Resultado Esperado:**
O sistema deve fornecer uma confirmação de "Senha atualizada com sucesso!"


-------------------------------------------------------------------------------------------------


#Plano de testes para Candidatos

# Teste: Tela de Cadastro de Candidatos

**Objetivo:** Verificar se a tela de cadastro de candidatos está funcionando corretamente e permite que os recrutadores se inscrevam no site.

**Passos:**
1. Abra a página de registro de candidatos no site.
2. Preencha todos os campos obrigatórios, como nome, sobrenome, endereço de e-mail, senha, número de telefone, nome da empresa, cargo e outras informações relevantes.
3. Certifique-se de que todas as informações inseridas são válidas e seguem os critérios definidos para cada campo (por exemplo, o formato correto do endereço de e-mail, requisitos de senha).
4. Clique no botão "Cadastrar".

**Resultado Esperado:**
O sistema deve armazenar as informações do candidato no banco de dados, criando um novo perfil de candidato.

-------------------------------------------------------------------------------------------------

## 2. Teste: Tela de Login de Candidatos

**Objetivo:** Verificar se a tela de login de candidatos permite que os recrutadores acessem o sistema com sucesso e fornece segurança na autenticação.

**Passos:**
1. Abra um navegador da web e vá para a página de login dos candidatos.
2. Verifique se a página de login está acessível e se a URL está correta.
3. Verifique se a página exibe campos de entrada para "Nome de Usuário" e "Senha".
4. Digite um nome de usuário válido no campo "Nome de Usuário".
5. Digite uma senha válida no campo "Senha".
6. Clique no botão "Entrar" ou pressione a tecla "Enter" no teclado.

**Resultado Esperado:**
Se as informações estiverem corretas, o sistema deve redirecionar o recrutador para a página inicial do sistema.

-------------------------------------------------------------------------------------------------

## 3. Teste: "Esqueceu a Senha?"

**Objetivo:** Verificar se a funcionalidade "Esqueceu a senha?" permite que os usuários redefinam suas senhas com sucesso e garante que o processo seja seguro.

**Passos:**
1. Abra um navegador na página de login e clique em "Esqueceu a senha" para iniciar a recuperação de senha.
2. Verifique se a página exibe um campo de entrada para "Endereço de E-mail".
3. Digite um endereço de e-mail válido no campo "Endereço de E-mail".
4. Clique no botão "Enviar" ou pressione a tecla "Enter" no teclado.

**Resultado Esperado:**
- Se o endereço de e-mail estiver registrado no sistema, o sistema deve enviar um e-mail de recuperação de senha para o endereço fornecido.
- O e-mail de recuperação de senha deve conter o token para a recuperação da senha.
- Se o e-mail não estiver cadastrado, a mensagem "Usuário não encontrado" deve aparecer.
- Se o código informado no token for incorreto, a mensagem "Código inválido" deve ser exibida.
- Se o código informado no token for o correto, a tela para alteração de senha será exibida.

-------------------------------------------------------------------------------------------------

## 4. Teste: Utilizar Filtro de Pesquisa das Vagas

**Objetivo:** Verificar se a funcionalidade de filtro de pesquisa de vagas permite aos recrutadores filtrar vagas de acordo com critérios específicos e fornece resultados precisos.

**Passos:**
1. Abra o navegador na página do feed de recrutadores.
2. Vá até o canto direito da tela e teste as 3 opções de filtro.

**Resultado Esperado:**
Espera-se que, ao usar as opções de filtro, o sistema apresente resultados precisos de acordo com os critérios selecionados. Os resultados devem corresponder aos filtros aplicados.


-------------------------------------------------------------------------------------------------

## 5. Teste: Editar Tela Perfil do Candidato

**Objetivo:** Verificar se a funcionalidade de edição do perfil do recrutador permite que o usuário atualize com sucesso as informações do seu perfil.

**Passos:**
1. Abra o navegador e acesse a página de perfil do candidato.
2. Localize a opção de edição de perfil ou botão de "Editar" e clique nele.
3. Edite as informações desejadas no perfil do recrutador, como nome, informações de contato, foto de perfil, ou outras informações relevantes.
4. Salve as alterações clicando no botão "Salvar".

**Resultado Esperado:**
Espera-se que, após a conclusão dos passos acima, as informações do perfil do candidato sejam atualizadas com sucesso. As informações editadas devem ser refletidas corretamente no perfil do candidato, e o sistema deve fornecer uma confirmação de "Informações atualizadas com sucesso".

-------------------------------------------------------------------------------------------------

## 6. Teste: Chat

**Objetivo:** Verificar a funcionalidade do chat e garantir que os usuários possam interagir com sucesso por meio do chat.

**Passos:**
1. Acesse a área de chat do sistema após o match com o recrutador.
3. Envie uma mensagem para o destinatário.
4. Aguarde uma resposta do destinatário.
   
**Resultado Esperado:**
Espera-se que o chat funcione de maneira adequada e que os seguintes resultados sejam alcançados:
- As mensagens são enviadas e recebidas de forma rápida e confiável.
- Mensagens formatadas são exibidas corretamente.
- O chat proporciona uma experiência de comunicação satisfatória entre os usuários.


-------------------------------------------------------------------------------------------------

## 7. Teste: Exclusão do Usuário

**Objetivo:** Verificar a funcionalidade de exclusão do perfil do recrutador.

**Passos:**
1. Abra o navegador e acesse a página de perfil do recrutador.
3. Clicar em "Excluir conta".
4. Apar3cerá uma janela de confirmação da exclusão do perfil: "VocÊ tem certeza que deseja deletar a sua conta?
5. Clicar em "Excluir"
   
**Resultado Esperado:**
Resultado Esperado:  O recrutador será redirecionado para a página principal da aplicação com uma mensagem confirmação de "Conta excluída com sucesso! Você será desconectado".


-------------------------------------------------------------------------------------------------

## 8. Teste: Alteração de Senha Usuário

**Objetivo:** Verificar a funcionalidade de alteração de senha recrutador.

**Passos:**
1. Abra o navegador e acesse a página de perfil do recrutador.
3. Clicar em "Alterar senha".
4. Aparecerá uma janela de confirmação da exclusão do perfil: "VocÊ tem certeza que deseja deletar a sua conta?
5. Clicar em "Excluir"
   
**Resultado Esperado:**
O sistema deve fornecer uma confirmação de "Senha atualizada com sucesso!"
-------------------------------------------------------------------------------------------------



