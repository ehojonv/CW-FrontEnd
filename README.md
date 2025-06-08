⚠️ CoreWave - Sistema de Controle e Monitoramento
Este projeto foi desenvolvido como parte da Global Solutions, utilizando Next.js e TypeScript, com estilização em TailwindCSS. Ele inclui funcionalidades como login, geração de eventos e visualização no sistema.

🚀 Tecnologias Utilizadas
Next.js (App Router)
TypeScript
TailwindCSS
Git/GitHub para versionamento

 Estrutura do Projeto
/
├── src/
│   ├── app/
│   │   ├── login/page.tsx  # Página inicial (Login)
│   │   ├── integrantes/page.tsx  # Página dos membros da equipe
│   │   ├── dashboard/page.tsx  # Página principal do sistema
│   │   ├── globals.css  # CSS global do projeto
│   │   ├── layout.tsx  # Arquivo de padronização
│   │   ├── page.tsx  # Redireciona para página de login
│   │   └── not-found.tsx # Página de não encontrado
│   ├── components/
│   │   ├──ui/Loading.tsx # Componente de carregamento
│   │   ├──Header.tsx # Componente de cabeçalho
│   │   └──ProtectedRoute.tsx # Componente de proteção de rotas
│   ├── contexts/AuthContext.tsx # Sistema de autentiação
│   ├── types/index.ts # Composição de dados do sistema
├── public/
│   ├── favicon.png  # Ícone do site
│   └── matheus.jpeg, juan.jpeg e joao.jpeg  # Imagens dos membros
├── .gitignore  # Ignora arquivos desnecessários no Git
├── README.md  # Documentação do projeto
├── tailwind.config.ts  # Estilização do projeto
└── package.json  # Dependências e scripts do projeto

Funcionalidades Implementadas
✅ Página de Login com validação de credenciais.
✅ Página de Membros da Equipe com nomes, RM e turma.
✅ Sistema de Monitoramento de Eventos com detalhes e controles sobre os mesmos.
✅ Responsividade para desktop, tablet e mobile.
✅ Componentização seguindo boas práticas.
✅ Uso do GitHub para versionamento do código

🔧 Como Rodar o Projeto
Clone o repositório:

git clone https://github.com/MMChallengeMM/Challenge-FrontEnd
Acesse a pasta do projeto:

cd marmota-mobilidade
Instale as dependências:

npm install
Rode o projeto:

npm run dev
Acesse no navegador: http://localhost:3000

📹 Vídeo de Apresentação
🎥 O vídeo do projeto pode ser acessado neste link

👥 Membros da Equipe
Nome	RM	Turma
João Alves	RM559369	1TDSPB
Juan Coelho	RM560445	1TDSPB
Matheus Mariotto	RM560276	1TDSPB
📜 Licença
Este projeto foi desenvolvido para fins acadêmicos e segue as diretrizes do curso.
