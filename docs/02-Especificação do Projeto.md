# Especificações do Projeto

Por meio da técnica de observação e brainstorming foram analisadas as necessidades dos usuários do sistema de forma a atender suas demandas. 

A partir das informações coletadas, foram determinadas as personas e histórias de usuários que serão de suma importância para a definição das funcionalidades.

## Personas

As personas, ou seja, os usuários ideais do site foram definidos abaixo: 

**Isabela:**  

- Isabela tem 35 anos, mora em São Paulo e atua como Tech Recruiter em uma empresa de sua região. 
- Ela recebeu uma solicitação do setor de RH da empresa para contratar alguns profissionais com perfil voltado para a área de tecnologia. 
- Isabela verificou que os candidatos devem possuir algumas habilidades em linguagens de programação específicas. 
- Ela então necessita de um meio para divulgar as vagas e assim receber candidaturas para a mesma. 
- Isabela precisa verificar quem se interessou na vaga e se o perfil desta pessoa se encaixa na vaga, para possível contato.

**Fernando:** 

- Fernando tem 26 anos, atualmente mora em Belo Horizonte, atua como gestor de uma equipe de desenvolvedores em uma empresa de sua região. 
- Ele percebe que necessita de mais um desenvolvedor .NET, pois o projeto está escalando e precisará de algumas alterações no sistema. 
- Fernando então decide fazer uma busca ativa por candidatos que possuam conhecimento em .NET abertos ao mercado de trabalho. 
- Ele após encontrar algum perfil que se enquadra na vaga, precisa entrar em contato com o candidato para apresentar a proposta. 

**Felipe:** 

- Felipe, mora em Belo Horizonte e possui 19 anos. 
- Ele cursa Análise e Desenvolvimento de Sistemas e está em busca de sua primeira oportunidade como desenvolvedor. 
- Felipe realizou diversos cursos direcionados para desenvolvimento web Frontend, criou seu portfólio e atuou como freelancer em alguns projetos da área. 
- Ele então decide buscar vagas com o tema “Desenvolvedor Frontend”. 
- Fernando, após encontrar alguma vaga interessante, tem a necessidade de demonstrar esse interesse para o recrutador, para que o mesmo possa analisar seu perfil.

**Bianca:**

- Bianca possui 23 anos, mora em São Paulo e atua como desenvolvedora Python. 
- Ela está buscando uma recolocação na mesma linguagem de programação, porém em uma outra empresa. 
- Bianca então deseja visualizar diversas vagas com esse tema, bem como os requisitos e benefícios, para assim tomar verificar se está vaga seria de seu interesse. 
- Ela após encontrar uma vaga interessante, gostaria de demonstrar que está aberta a participar do processo de seleção. 
- Bianca então, caso o recrutador goste do seu perfil, gostaria de entrar em contato para solucionar algumas dúvidas que restaram sobre a vaga. 

## Histórias de Usuários

Com a observação do cotidiano das personas e a compreensão de suas necessidades, foram definidas as seguintes histórias de usuários.  

| EU COMO... `PERSONA` | QUERO/PRECISO ... `FUNCIONALIDADE` | PARA ... `MOTIVO/VALOR`                |
| -------------------- | ---------------------------------- | -------------------------------------- |
| Isabela | Realizar o seu cadastro e login no sistema como uma recrutadora. | Poder publicar vagas abertas em sua empresa ou encontrar candidatos de forma ativa. |
|Felipe | Realizar o seu cadastro no aplicativo como um candidato. | Encontrar vagas relacionadas ao seu perfil e demostrar interesse nas mesmas. |
| Fernando | Fazer alterações em seus dados cadastrais. | Ajustar o seu nível de habilidade em desenvolvimento Frontend. |
| Bianca | Visualizar diversas vagas de trabalho no mercado de tecnologia. |Analisar requisitos das vagas, modelo de trabalho e remuneração. |
| Bianca | Deletar seu perfil. | Encontrou a vaga que desejava. |
| Felipe | Demostrar interesse em uma determinada vaga que se encaixou em seu perfil. |Mostrar ao recrutador seu interesse na vaga. |
| Bianca | Filtrar as vagas que possuam requisitos relacionados a linguagem de programação que utiliza. | Possui preferência por vagas relacionadas a linguagem Python. |
| Isabela | Criar uma postagem de vaga aberta em sua empresa. | Receber candidaturas pra que possa selecionar a pessoa ideal para a vaga. |
| Fernando | Buscar candidatos com habilidades em uma linguagem de programação específica. | Procura alguém especializado em .NET C#. |
| Isabela | Encerrar uma vaga aberta postada anteriormente na plataforma. | Encontrou o candidato que precisava. |
| Fernando | Entrar em contato com um candidato que se enquadrou no perfil que buscava. | Solicitar mais informações ao candidato e marcar uma entrevista. |
| Isabela | Verificar os candidatos interessados na vaga. | Selecionar os melhores perfis. |
| Felipe | Recuperar sua senha. | Não se lembra da senha anterior. |
| Isabela | Visualizar todas as vagas que postou na plataforma. | Controle de vagas abertas e encerradas. |
| Fernando | Demonstrar interesse em um candidato. | Demonstrar ao candidato que gostou do seu perfil. |

## Modelagem do Processo de Negócio

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional.

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN.

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores.

Usar o seguinte modelo:

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori.

## Requisitos

No projeto, sua estrutura e suas funções são determinadas a partir dos requisitos funcionais e não-funcionais.

Os requisitos funcionais podem ser definidos como a descrição das funções que os usuários poderão utilizar para satisfazer suas necessidades. Já os requisitos não funcionais são aqueles que descrevem as características de usabilidade e outros aspectos que o site necessita apresentar de maneira geral.

Portanto, com os estudos das personas e histórias dos usuários identificadas para o projeto, foram definidos os seguintes requisitos.

### Requisitos Funcionais

Os requisitos funcionais do projeto e seus respectivos níveis de prioridade de entrega são apresentados na tabela a seguir.

| ID     | Descrição do Requisito                                                                                                                                                                                                                                                                         | Prioridade |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RF-001 | A aplicação deve permitir a criação de usuários recrutadores, com os seguintes campos de preenchimento: Nome, e-mail, senha, telefone e opcionalmente o link do LinkedIn pessoal.                                                                                                              | ALTA       |
| RF-002 | A aplicação deve permitir a criação de usuários candidatos, com os seguintes campos de preenchimento: Nome, e-mail, senha, telefone, telefone, Hardskills, Softskills e opcionalmente as Experiências Profissionais, Faculdade, Cursos, link do GitHub, LinkedIn, Instagram e Site(Portfólio). | ALTO       |
| RF-003 | A aplicação deve permitir o login de recrutadores e candidatos utilizando e-mail e senha.                                                                                                                                                                                                      | ALTO       |
| RF-004 | A aplicação deve permitir recuperação de senha para recrutadores e candidatos.                                                                                                                                                                                                                 | MÉDIA      |
| RF-005 | A aplicação deve ter a opção do recrutador ou candidato editar seus dados cadastrais e excluir seu perfil.                                                                                                                                                                                     | MÉDIA      |
| RF-006 | A aplicação deve possuir uma listagem de vagas para candidatos, com cada vaga contendo os dados da empresa, requisitos da vaga, data de publicação, benefícios e remuneração.                                                                                                                  | ALTO       |
| RF-007 | A aplicação deverá dar a opção do candidato curtir a vaga, mostrando interesse nela.                                                                                                                                                                                                           | ALTO       |
| RF-008 | A aplicação terá filtro para o candidato buscar a vaga por linguagem de programação ou pelo nome na barra de pesquisa.                                                                                                                                                                         | BAIXA      |
| RF-009 | A aplicação deve permitir o recrutador criar postagens de vaga, com os dados da empresa, requisitos necessários (Hardskill e Softskills) para a vaga, benefícios e remuneração.                                                                                                                | ALTO       |
| RF-010 | A aplicação deverá ter uma lista com as vagas que o recrutador postou.                                                                                                                                                                                                                         | ALTO       |
| RF-011 | Para cada vaga, a aplicação deverá listar os candidatos que curtiram a vaga.                                                                                                                                                                                                                   | ALTO       |
| RF-012 | A aplicação deverá ter a opção para o recrutador curtir o candidato que desejar da lista de candidatos que curtiram a vaga, criando uma conexão para conversar via Chat (que a primeira mensagem pode ser iniciada pelo candidato ou pelo recrutador).                                         | ALTO       |
| RF-013 | A aplicação deverá ter a opção de o recrutador encerrar a publicação da vaga quando desejar.                                                                                                                                                                                                   | MÉDIA      |
| RF-014 | A aplicação terá que disponibilizar para os recrutadores a listagem de todos os candidatos cadastrados na plataforma, com a opção de buscar com auxilia de filtro de linguagem de programação ou barra de pesquisa.                                                                            | MÉDIA      |

### Requisitos não Funcionais

Os requisitos não funcionais que a equipe deverá seguir durante o desenvolvimento, como também seus respectivos níveis de prioridade de entrega são apresentados na tabela a seguir.

| ID      | Descrição do Requisito                                                                                                                                          | Prioridade |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | A aplicação deve funcionar 7 dias por semana, 24h por dia.                                                                                                      | ALTA       |
| RNF-002 | O banco de dados da aplicação terá senhas criptografadas.                                                                                                       | MÉDIA      |
| RNF-003 | A aplicação deverá funcionar em IOS e Android.                                                                                                                  | ALTA       |
| RNF-005 | O site deve ser compatível com os principais navegadores do mercado (Google Chrome, Firefox, Opera).                                                            | ALTA       |
| RNF-006 | A interface deve ser agradável, intuitiva, de fácil utilização para o usuário e deve ser organizado de tal maneira que os erros dos usuários sejam minimizados. | MÉDIA      |
| RNF-007 | Os formulários devem informar ao usuário quais são os campos de preenchimento obrigatório.                                                                      | MÉDIA      |
| RNF-008 | Utilizar símbolo e ícone para ajudar no entendimento e conseguir uma associação imediata sobre aplicações de reconhecimento.                                    | MÉDIA      |

## Restrições

A tabela a seguir apresenta as condições que limitam a execução desse projeto.

| ID    | Restrição                                                                                                                                                                                                 |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RE-01 | O projeto deve ser entregue até dia 10/12/2023.                                                                                                                                                           |
| RE-02 | A equipe não pode contratar terceiros para o desenvolvimento do projeto.                                                                                                                                  |
| RE-03 | O site deve ser desenvolvido utilizando linguagens de programação para banco de dados relacional, mais especificamente SQL.                                                                               |
| RE-04 | O site deve ser desenvolvido utilizando linguagens de programação Back-end, mais especificamente TypeScript juntamente com o framework Nest.js e os frameworks Express e Prisma para a construção da API. |
| RE-05 | site deve ser desenvolvido utilizando linguagens de programação Web, mais especificamente CSS, HTML, TypeScript e bem como o framework React.                                                             |
| RE-06 | O site deve ser desenvolvido utilizando linguagens de programação Mobile, mais especificamente CSS, TypeScript e bem como o framework React Native.                                                       |

## Técnica de Priorização de Requisitos

Ao usar a matriz GUT na tecnologia, é possível avaliar fatores como a complexidade do projeto, a qualidade do código, a experiência da equipe de desenvolvimento e a disponibilidade de recursos. Cada um desses fatores pode ser avaliado de acordo com sua importância relativa para o sucesso do projeto, permitindo que a equipe de gerenciamento de projetos priorize os recursos e o tempo de acordo com as necessidades do projeto.

![GUT](img/matriz-gut.png)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
>
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

# Matriz de Rastreabilidade

Para identificarmos a correlação entre os requisitos utilizamos a método a Matrix de Rastreabilidade entre Funcionalidades, representada no quadro abaixo:

![Matriz de rastreabilidade](img/matriz-de-rastreabilidade.png)

# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados.

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
