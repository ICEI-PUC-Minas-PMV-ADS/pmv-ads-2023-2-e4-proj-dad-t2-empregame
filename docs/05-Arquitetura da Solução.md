# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Para nossa arquitetura de solução, utilizamos um conjunto de tecnologias que desempenham papéis específicos e complementares:

Nest Framework como Base da API:
Utilizamos o Nest Framework como base o Express, uma biblioteca adotada para criação de APIs.

Prisma:
Ele atua garantindo a comunicação entre nossa API e o banco de dados. O Prisma nos permite estruturar eficientemente nosso banco de dados, facilitando a manipulação de dados e consultas.

Banco de Dados PostgreSQL:
Optamos pelo PostgreSQL: é de fácil utilização, armazenamento e recuperação de informações contidas nele.

Redis:
Implementamos o Redis como nosso banco de dados não relacional. O Redis desempenha um papel fundamental na implementação de cache e armazenamento em memória temporária. Usamos ele para salvar algumas informações do usuário junto com o seu token na quando faz login.

Docker e Docker Compose:
Usamos Docker e Docker Compose para simplificar a implantação local de nossa aplicação. Isso nos permite criar um ambiente isolado no qual podemos executar nossa aplicação. O Dockerfile é usado para criar imagens da nossa aplicação, enquanto o Docker Compose ajuda a orquestrar todos os componentes necessários para executar nossa solução de maneira coesa.

Next Framework de desenvolvimento FrontEnd baseado em React:
Utilizamos o Next Framework que possui como base o React para desenvolvimento da interface do FrontEnd, envio das requisições e renderização da página para o usuário.

Chakra UI:
Biblioteca utilizada para agilizar o desenvolvimento da interface, pois fornece diversos componentes personalizáveis.

![arquitetura](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t2-empregame/assets/112032850/550095fa-797e-48e2-b75c-b440b3c9f60b)

## Diagrama de Classes

O diagrama de classes é uma representação gráfica que visualiza a estrutura do software e os relacionamentos entre as classes que compõem esse software. Cada classe representada no diagrama atua como um modelo para criar os objetos que serão instanciados e executados na memória durante a operação do sistema.

![bd](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t2-empregame/assets/112032850/9f746e7c-8270-423d-8e1a-5102999c0238)

## Tecnologias Utilizadas

a) IDE: VScode
b) Banco de dados: PostgresSQL e Redis
c) Desenvolvimento BackEnd: NestJS, Prisma, NodeJS
d) Desenvolvimento FrontEnd: NextJS, React e Chakra UI
b) Ferramentas de Desenho de Tela e diagrama: Figma, Miro.
e) Infraestrutura: Docker, Render (Hospedagem dos Serviços do BackEnd e do Banco de dados), AWS (Hospedagem FrontEnd) e Umbler (Servidor de e-mail)

## Qualidade de Software

A International Organization for Standardization (ISO) e a International Electrotechnical Commission (IEC), dois órgãos de normalização internacional de grande importância na área de software, uniram forças para criar normas internacionais conjuntas. A norma ISO/IEC internacional define a qualidade do software como um conjunto de características que um produto de software deve possuir para satisfazer tanto as necessidades explicitamente declaradas quanto as implicitamente necessárias.
O nível de qualidade de um software é determinado pelo conjunto de requisitos estabelecidos para o produto e pela complexidade envolvida em sua implementação. Portanto, a avaliação da qualidade deve ser incorporada desde o início, na definição do escopo do projeto. As normas de qualidade, juntamente com os padrões, processos, controles e diretrizes, são geralmente detalhadas na política de qualidade da organização.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, identifica oito características principais e 30 subcaracterísticas de qualidade para produtos de software. Estas diretrizes são valiosas para avaliar e melhorar a qualidade dos produtos de software em todo o ciclo de vida do desenvolvimento.

1. Funcionalidade: O conjunto de funções que satisfaz as necessidades explicitas e implícitas para finalidade a qe se destina o produto.

2. Confiabilidade: O desempenho que se mantém ao longo do tempo e em condições estabelecidas.

3. Usabilidade: Esse conceito engloba a facilidade em se usar a aplicação, como por exemplo, a operacionalidade, proteção a erros, inteligibilidade e Apreensibilidade.

4. Eficiência: Os recursos e os temos utilizados são compatíveis com o nível de desempenho requerido para o produto?

5. Manutenibilidade: A capacidade (ou Facilidade) do produto de software ser modificado, incluindo tanto as melhorias ou extensões de funcionalidade quanto as correções de defeitos, falhas ou erros.

6. Portabilidade: Definida como capacidade do sistema ser transferido de um ambiente para o outro. Como ambiente, devemos considerar todos os fatores de adaptação, tais como diferentes condições de infraestrutura (sistemas operacionais, versões de banco de dados etc.), diferentes tipos de recurso de hardware (como aproveitar um número maior de processadores ou memória).

7. Segurança: Avalia o grau em que as funções e dados são protegidos de acesso não autorizado e o grau em que são disponibilizados para o acesso autorizado.

8. Compatibilidade: É o grau em que um produto, sistema ou componentes, e/ou realizar as suas funções necessárias, ao compartilhar o mesmo ambiente de hardware ou software.
