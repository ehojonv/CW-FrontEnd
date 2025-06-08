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
