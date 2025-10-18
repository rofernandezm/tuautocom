// Agente con comandos para gestión del frontend tuautocom
// Enriquecido con funcionalidades de v0 de Vercel

// Ruta relativa al workspace (frontend es la raíz del workspace)
const FRONTEND_PATH = './';  // Directorio actual del workspace
const WORKSPACE_NAME = 'frontend';

export async function register(runtime: any) {
  
  // Comando: /start-server
  runtime.registerCommand({
    name: '/start-server',
    description: 'Ejecuta live-server en el directorio frontend',
    handler: async () => {
      return {
        text: `🚀 **Comando para iniciar live-server**\n\n` +
              `📁 Directorio: Workspace actual (\`${WORKSPACE_NAME}\`)\n\n` +
              `Ejecuta en terminal integrada de VSCode:\n` +
              `\`\`\`bash\n` +
              `live-server\n` +
              `\`\`\`\n\n` +
              `O si prefieres especificar el directorio:\n` +
              `\`\`\`bash\n` +
              `cd frontend\n` +
              `live-server\n` +
              `\`\`\`\n\n` +
              `🌐 Estará disponible en: http://localhost:8080\n` +
              `⏹️ Para detener: \`Ctrl+C\` o \`pkill -f live-server\`\n\n` +
              `💡 **Tip**: Asegúrate de estar en el directorio \`frontend\` del workspace`
      };
    }
  });

  // Comando: /setup
  runtime.registerCommand({
    name: '/setup',
    description: 'Configura Node, pnpm y dependencias del proyecto',
    handler: async () => {
      return {
        text: `🔧 **Setup del entorno de desarrollo**\n\n` +
              `📁 **Workspace**: \`${WORKSPACE_NAME}\`\n\n` +
              `### 1. Verificar/Instalar Node.js\n` +
              `\`\`\`bash\n` +
              `node --version  # Verificar instalación\n` +
              `\`\`\`\n\n` +
              `### 2. Configurar pnpm\n` +
              `\`\`\`bash\n` +
              `npm install -g pnpm     # Instalar pnpm\n` +
              `pnpm setup              # Configurar paths\n` +
              `source ~/.bashrc        # Recargar configuración\n` +
              `\`\`\`\n\n` +
              `### 3. Instalar live-server\n` +
              `\`\`\`bash\n` +
              `pnpm add -g live-server\n` +
              `\`\`\`\n\n` +
              `### 4. Verificar proyecto en workspace\n` +
              `\`\`\`bash\n` +
              `pwd                     # Verificar directorio actual\n` +
              `ls -la                  # Verificar archivos del frontend\n` +
              `\`\`\`\n\n` +
              `### 5. Abrir terminal integrada en VSCode\n` +
              `- **Ctrl+\`** (backtick) o **Terminal > New Terminal**\n` +
              `- El terminal se abrirá automáticamente en el workspace correcto\n\n` +
              `✅ **Listo para desarrollo!**\n` +
              `🚀 Siguiente paso: Ejecuta \`/start-server\`\n\n` +
              `📝 **Nota**: Todos los comandos funcionan desde el workspace de VSCode`
      };
    }
  });

  // Comando: /update-readme
  runtime.registerCommand({
    name: '/update-readme',
    description: 'Actualiza el README.md del frontend con los cambios recientes',
    handler: async () => {
      const timestamp = new Date().toLocaleDateString('es-ES');
      
      return {
        text: `📝 **Contenido actualizado para README.md**\n\n` +
              `📁 Ubicación: \`README.md\` (en el workspace actual)\n\n` +
              `**Cambios incluidos:**\n` +
              `- ✅ Estructura modular documentada\n` +
              `- ✅ Comandos de desarrollo actualizados\n` +
              `- ✅ Instrucciones de setup con pnpm\n` +
              `- ✅ Información del agente Copilot\n` +
              `- ✅ Arquitectura y beneficios explicados\n` +
              `- ✅ Rutas relativas al workspace de VSCode\n\n` +
              `**Última actualización:** ${timestamp}\n\n` +
              `**Instrucciones para actualizar:**\n` +
              `1. Abre \`README.md\` en el editor de VSCode\n` +
              `2. Reemplaza todo el contenido con la versión actualizada\n` +
              `3. Incluye información sobre el workspace y rutas relativas\n\n` +
              `💡 **Tip**: El README ahora es compatible con cualquier ubicación del workspace`
      };
    }
  });

  // Comando: /create-component (basado en v0)
  runtime.registerCommand({
    name: '/create-component',
    description: 'Genera componentes React optimizados siguiendo las mejores prácticas de v0',
    handler: async (args: any) => {
      const componentName = args?.componentName || 'MyComponent';
      const type = args?.type || 'ui';
      
      return {
        text: `⚛️ **Generador de Componentes React (v0 Style)**\n\n` +
              `📝 **Componente**: \`${componentName}\`\n` +
              `🎯 **Tipo**: \`${type}\`\n\n` +
              `### 🏗️ Estructura recomendada (v0):\n\n` +
              `**Para componentes UI:**\n` +
              `\`\`\`typescript\n` +
              `'use client';\n\n` +
              `import React from 'react';\n\n` +
              `interface ${componentName}Props {\n` +
              `  children?: React.ReactNode;\n` +
              `  className?: string;\n` +
              `}\n\n` +
              `export default function ${componentName}({ children, className = '' }: ${componentName}Props) {\n` +
              `  return (\n` +
              `    <div className={\`\${className}\`}>\n` +
              `      {children}\n` +
              `    </div>\n` +
              `  );\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `**Para páginas (App Router):**\n` +
              `\`\`\`typescript\n` +
              `export default function ${componentName}Page() {\n` +
              `  return (\n` +
              `    <main className="container mx-auto px-4 py-8">\n` +
              `      <h1 className="text-2xl font-bold">${componentName}</h1>\n` +
              `    </main>\n` +
              `  );\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `### 🎨 Mejores prácticas v0:\n` +
              `- ✅ Usar TypeScript con interfaces claras\n` +
              `- ✅ Props por defecto para mejor UX\n` +
              `- ✅ Tailwind CSS para styling\n` +
              `- ✅ Diseño responsive automático\n` +
              `- ✅ Accesibilidad (ARIA) incluida\n` +
              `- ✅ Server Components cuando sea posible\n\n` +
              `📂 **Ubicación sugerida**: \`src/components/${componentName}.tsx\`\n\n` +
              `🚀 **Next Steps**: Usa este template como base para tu componente`
      };
    }
  });

  // Comando: /setup-nextjs (basado en v0)
  runtime.registerCommand({
    name: '/setup-nextjs',
    description: 'Configura un proyecto Next.js con App Router y mejores prácticas de v0',
    handler: async () => {
      return {
        text: `🚀 **Setup Next.js con v0 Best Practices**\n\n` +
              `### 📦 Crear nuevo proyecto Next.js\n\n` +
              `\`\`\`bash\n` +
              `npx create-next-app@latest my-app --typescript --tailwind --eslint --app\n` +
              `cd my-app\n` +
              `\`\`\`\n\n` +
              `### 🛠️ Dependencias recomendadas v0\n\n` +
              `\`\`\`bash\n` +
              `# Vercel AI SDK\n` +
              `npm install @ai-sdk/openai @ai-sdk/react ai\n\n` +
              `# Componentes UI (shadcn/ui)\n` +
              `npx shadcn@latest init\n` +
              `npx shadcn@latest add button card input\n\n` +
              `# Iconos Lucide React\n` +
              `npm install lucide-react\n\n` +
              `# Utilidades adicionales\n` +
              `npm install clsx tailwind-merge\n` +
              `\`\`\`\n\n` +
              `### 📁 Estructura App Router (v0):\n\n` +
              `\`\`\`\n` +
              `app/\n` +
              `├── layout.tsx          # Layout raíz\n` +
              `├── page.tsx           # Página principal\n` +
              `├── globals.css        # Estilos globales\n` +
              `├── api/\n` +
              `│   └── chat/\n` +
              `│       └── route.ts   # API para AI SDK\n` +
              `└── components/        # Componentes reutilizables\n` +
              `\`\`\`\n\n` +
              `### ⚙️ Configuraciones v0:\n\n` +
              `**tailwind.config.js**:\n` +
              `\`\`\`javascript\n` +
              `module.exports = {\n` +
              `  darkMode: 'class',\n` +
              `  content: ['./app/**/*.{js,ts,jsx,tsx}'],\n` +
              `  theme: {\n` +
              `    extend: {}\n` +
              `  },\n` +
              `  plugins: []\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `### 🎯 Features v0 incluidas:\n` +
              `- ✅ App Router por defecto\n` +
              `- ✅ TypeScript configurado\n` +
              `- ✅ Tailwind CSS + shadcn/ui\n` +
              `- ✅ Lucide React icons\n` +
              `- ✅ Vercel AI SDK ready\n` +
              `- ✅ Server Components optimizados\n` +
              `- ✅ Dark mode support\n\n` +
              `🌐 **Deploy**: \`vercel --prod\` cuando esté listo`
      };
    }
  });

  // Comando: /ai-integration (basado en v0 AI SDK)
  runtime.registerCommand({
    name: '/ai-integration',
    description: 'Integra Vercel AI SDK para chatbots y funcionalidades de IA',
    handler: async (args: any) => {
      const feature = args?.feature || 'chatbot';
      
      return {
        text: `🤖 **Integración Vercel AI SDK (v0)**\n\n` +
              `🎯 **Feature**: \`${feature}\`\n\n` +
              `### 1️⃣ API Route (app/api/chat/route.ts):\n\n` +
              `\`\`\`typescript\n` +
              `import { openai } from '@ai-sdk/openai';\n` +
              `import { streamText } from 'ai';\n\n` +
              `export const maxDuration = 30;\n\n` +
              `export async function POST(req: Request) {\n` +
              `  const { messages } = await req.json();\n\n` +
              `  const result = streamText({\n` +
              `    model: openai('gpt-4o'),\n` +
              `    system: 'You are a helpful assistant.',\n` +
              `    messages,\n` +
              `  });\n\n` +
              `  return result.toDataStreamResponse();\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `### 2️⃣ Componente Chat (usando useChat):\n\n` +
              `\`\`\`typescript\n` +
              `'use client';\n\n` +
              `import { useChat } from '@ai-sdk/react';\n\n` +
              `export default function ChatBot() {\n` +
              `  const { messages, input, handleInputChange, handleSubmit, status } = useChat();\n\n` +
              `  return (\n` +
              `    <div className="flex flex-col h-96 border rounded-lg">\n` +
              `      <div className="flex-1 overflow-y-auto p-4">\n` +
              `        {messages.map(message => (\n` +
              `          <div key={message.id} className="mb-4">\n` +
              `            <strong>{message.role === 'user' ? 'You: ' : 'AI: '}</strong>\n` +
              `            {message.content}\n` +
              `          </div>\n` +
              `        ))}\n` +
              `      </div>\n\n` +
              `      <form onSubmit={handleSubmit} className="p-4 border-t">\n` +
              `        <div className="flex gap-2">\n` +
              `          <input\n` +
              `            value={input}\n` +
              `            onChange={handleInputChange}\n` +
              `            placeholder="Type your message..."\n` +
              `            className="flex-1 px-3 py-2 border rounded"\n` +
              `            disabled={status !== 'ready'}\n` +
              `          />\n` +
              `          <button\n` +
              `            type="submit"\n` +
              `            disabled={status !== 'ready'}\n` +
              `            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"\n` +
              `          >\n` +
              `            {status === 'streaming' ? 'Thinking...' : 'Send'}\n` +
              `          </button>\n` +
              `        </div>\n` +
              `      </form>\n` +
              `    </div>\n` +
              `  );\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `### 🔑 Variables de entorno (.env.local):\n\n` +
              `\`\`\`bash\n` +
              `# OpenAI API Key\n` +
              `OPENAI_API_KEY=your_openai_key_here\n` +
              `\`\`\`\n\n` +
              `### 🚀 Features AI SDK disponibles:\n` +
              `- ✅ **useChat**: Chatbots con streaming\n` +
              `- ✅ **streamText**: Generación de texto\n` +
              `- ✅ **generateText**: Texto no-interactivo\n` +
              `- ✅ **Tool calling**: Funciones personalizadas\n` +
              `- ✅ **Multi-modal**: Imágenes + texto\n` +
              `- ✅ **Error handling**: Manejo robusto de errores\n\n` +
              `💡 **Tip**: El AI SDK funciona con múltiples providers (OpenAI, Anthropic, etc.)`
      };
    }
  });

  // Comando: /create-diagram (Mermaid support)
  runtime.registerCommand({
    name: '/create-diagram',
    description: 'Genera diagramas Mermaid para documentación técnica',
    handler: async (args: any) => {
      const type = args?.type || 'flowchart';
      const description = args?.description || 'proceso básico';
      
      let diagramExample = '';
      
      switch (type) {
        case 'flowchart':
          diagramExample = `\`\`\`mermaid\nflowchart TD\n    A["Inicio"] --> B["Proceso"]\n    B --> C{"Decisión"}\n    C -->|Sí| D["Acción A"]\n    C -->|No| E["Acción B"]\n    D --> F["Final"]\n    E --> F\n\`\`\``;
          break;
        case 'sequence':
          diagramExample = `\`\`\`mermaid\nsequenceDiagram\n    participant U as Usuario\n    participant F as Frontend\n    participant A as API\n    participant D as Database\n    \n    U->>F: Solicita datos\n    F->>A: HTTP Request\n    A->>D: Query\n    D->>A: Resultado\n    A->>F: Response\n    F->>U: Muestra datos\n\`\`\``;
          break;
        case 'class':
          diagramExample = `\`\`\`mermaid\nclassDiagram\n    class Vehicle {\n        +string brand\n        +string model\n        +number year\n        +start()\n        +stop()\n    }\n    class Car {\n        +number doors\n        +openTrunk()\n    }\n    class Truck {\n        +number capacity\n        +loadCargo()\n    }\n    Vehicle <|-- Car\n    Vehicle <|-- Truck\n\`\`\``;
          break;
        case 'er':
          diagramExample = `\`\`\`mermaid\nerDiagram\n    CUSTOMER {\n        int customer_id PK\n        string name\n        string email\n    }\n    ORDER {\n        int order_id PK\n        int customer_id FK\n        date order_date\n    }\n    PRODUCT {\n        int product_id PK\n        string name\n        decimal price\n    }\n    CUSTOMER ||--o{ ORDER : places\n    ORDER }o--|| PRODUCT : contains\n\`\`\``;
          break;
        default:
          diagramExample = `\`\`\`mermaid\nflowchart LR\n    A["Inicio"] --> B["${description}"]\n    B --> C["Fin"]\n\`\`\``;
      }
      
      return {
        text: `📊 **Generador de Diagramas Mermaid (v0)**\n\n` +
              `🎯 **Tipo**: \`${type}\`\n` +
              `📝 **Descripción**: \`${description}\`\n\n` +
              `### 🎨 Diagrama generado:\n\n` +
              `${diagramExample}\n\n` +
              `### 📋 Tipos de diagramas disponibles:\n\n` +
              `- **flowchart**: Diagramas de flujo\n` +
              `- **sequence**: Diagramas de secuencia\n` +
              `- **class**: Diagramas de clases UML\n` +
              `- **er**: Diagramas entidad-relación\n` +
              `- **gantt**: Cronogramas de proyecto\n` +
              `- **gitgraph**: Flujos de Git\n\n` +
              `### 🔧 Sintaxis especial v0:\n\n` +
              `- Usar comillas alrededor de nombres: \`"Nombre del nodo"\`\n` +
              `- Caracteres especiales: \`#43;\` para +, \`#45;\` para -\n` +
              `- Styling con CSS classes y themes\n\n` +
              `### 💡 Uso en documentación:\n\n` +
              `1. Copia el código Mermaid\n` +
              `2. Pégalo en tu README.md o docs\n` +
              `3. GitHub/GitLab lo renderizará automáticamente\n\n` +
              `🎯 **Tip**: Los diagramas Mermaid son perfectos para arquitectura de software`
      };
    }
  });

  // Comando: /migrate-ai-sdk (Migración de openai-edge)
  runtime.registerCommand({
    name: '/migrate-ai-sdk',
    description: 'Migra de openai-edge a Vercel AI SDK',
    handler: async () => {
      return {
        text: `🔄 **Migración: openai-edge → Vercel AI SDK**\n\n` +
              `### ❌ Antes (openai-edge):\n\n` +
              `\`\`\`typescript\n` +
              `import { OpenAIStream, StreamingTextResponse } from 'ai';\n` +
              `import { Configuration, OpenAIApi } from 'openai-edge';\n\n` +
              `const config = new Configuration({\n` +
              `  apiKey: process.env.OPENAI_API_KEY,\n` +
              `});\n` +
              `const openai = new OpenAIApi(config);\n\n` +
              `const response = await openai.createChatCompletion({\n` +
              `  model: 'gpt-4',\n` +
              `  messages,\n` +
              `  stream: true,\n` +
              `});\n\n` +
              `const stream = OpenAIStream(response);\n` +
              `return new StreamingTextResponse(stream);\n` +
              `\`\`\`\n\n` +
              `### ✅ Después (Vercel AI SDK):\n\n` +
              `\`\`\`typescript\n` +
              `import { openai } from '@ai-sdk/openai';\n` +
              `import { streamText } from 'ai';\n\n` +
              `const result = streamText({\n` +
              `  model: openai('gpt-4o'),\n` +
              `  messages,\n` +
              `});\n\n` +
              `return result.toDataStreamResponse();\n` +
              `\`\`\`\n\n` +
              `### 📦 Cambios en dependencias:\n\n` +
              `**Remover:**\n` +
              `\`\`\`bash\n` +
              `npm uninstall openai-edge\n` +
              `\`\`\`\n\n` +
              `**Instalar:**\n` +
              `\`\`\`bash\n` +
              `npm install @ai-sdk/openai @ai-sdk/react ai\n` +
              `\`\`\`\n\n` +
              `### 🔧 Pasos de migración:\n\n` +
              `1. **Actualizar imports**:\n` +
              `   - \`openai-edge\` → \`@ai-sdk/openai\`\n` +
              `   - \`OpenAIStream\` → \`streamText\`\n\n` +
              `2. **Simplificar configuración**:\n` +
              `   - No más \`Configuration\` ni \`OpenAIApi\`\n` +
              `   - Uso directo del provider\n\n` +
              `3. **Actualizar frontend**:\n` +
              `   - Usar \`useChat\` de \`@ai-sdk/react\`\n` +
              `   - Mejor manejo de estados y errores\n\n` +
              `4. **Variables de entorno**:\n` +
              `   - Mantener \`OPENAI_API_KEY\`\n` +
              `   - No requiere cambios adicionales\n\n` +
              `### 🚀 Beneficios de la migración:\n\n` +
              `- ✅ **Más simple**: Menos código boilerplate\n` +
              `- ✅ **Mejor TypeScript**: Tipos más precisos\n` +
              `- ✅ **Multi-provider**: Soporte para múltiples LLMs\n` +
              `- ✅ **Mejor UX**: useChat hook mejorado\n` +
              `- ✅ **Tool calling**: Soporte nativo para funciones\n` +
              `- ✅ **Streaming optimizado**: Rendimiento mejorado\n\n` +
              `💡 **Tip**: La migración es compatible hacia atrás, mantiene la funcionalidad existente`
      };
    }
  });

  // Comando: /docs (Consulta documentación interna)
  runtime.registerCommand({
    name: '/docs',
    description: 'Consulta la documentación interna del agente sobre v0 y AI SDK',
    handler: async (args: any) => {
      const topic = args?.topic || 'all';
      
      return {
        text: `📚 **Documentación Interna del Agente**\n\n` +
              `🎯 **Tema consultado**: \`${topic}\`\n\n` +
              `### 📁 Base de Conocimientos Disponible:\n\n` +
              `#### 🚀 **v0-capabilities.md**\n` +
              `- Code Projects y configuración Next.js\n` +
              `- Desarrollo de componentes React\n` +
              `- Integración del AI SDK\n` +
              `- Manejo de imágenes y media\n` +
              `- Diagramas Mermaid y matemáticas LaTeX\n` +
              `- Mejores prácticas de accesibilidad\n\n` +
              `#### 🤖 **ai-sdk-guide.md**\n` +
              `- Guía completa del Vercel AI SDK\n` +
              `- Migración desde openai-edge\n` +
              `- Hook useChat y características avanzadas\n` +
              `- Configuración de API routes\n` +
              `- Variables de entorno\n` +
              `- Patrones y mejores prácticas\n\n` +
              `#### ⚛️ **component-templates.md**\n` +
              `- Templates de componentes UI\n` +
              `- Páginas con App Router\n` +
              `- Layouts de aplicación\n` +
              `- Componentes Modal y Forms\n` +
              `- Patrones de componentes comunes\n` +
              `- TypeScript + Tailwind CSS\n\n` +
              `#### 📊 **mermaid-templates.md**\n` +
              `- Diagramas de flujo (flowcharts)\n` +
              `- Diagramas de secuencia\n` +
              `- Diagramas de clases UML\n` +
              `- Diagramas entidad-relación\n` +
              `- Arquitecturas de sistemas\n` +
              `- Pipelines CI/CD\n` +
              `- Caracteres especiales para v0\n\n` +
              `### 🔗 **Comandos que Usan Esta Documentación:**\n\n` +
              `- \`/create-component\` → component-templates.md\n` +
              `- \`/ai-integration\` → ai-sdk-guide.md\n` +
              `- \`/create-diagram\` → mermaid-templates.md\n` +
              `- \`/migrate-ai-sdk\` → ai-sdk-guide.md\n` +
              `- \`/setup-nextjs\` → v0-capabilities.md\n\n` +
              `### 📂 **Ubicación de los Archivos:**\n\n` +
              `\`\`\`\n` +
              `frontend/.copilot-agent/docs/\n` +
              `├── README.md              # Índice general\n` +
              `├── v0-capabilities.md     # Capacidades de v0\n` +
              `├── ai-sdk-guide.md        # Guía AI SDK\n` +
              `├── component-templates.md # Templates React\n` +
              `└── mermaid-templates.md   # Templates diagramas\n` +
              `\`\`\`\n\n` +
              `### 🎯 **Beneficios de la Base de Conocimientos:**\n\n` +
              `- ✅ **Respuestas precisas**: Acceso directo a sintaxis y ejemplos\n` +
              `- ✅ **Templates listos**: Código base para desarrollo rápido\n` +
              `- ✅ **Mejores prácticas**: Estándares actualizados de v0\n` +
              `- ✅ **Consistencia**: Mismos patrones en todo el proyecto\n` +
              `- ✅ **Actualizable**: Documentación mantenida y versionada\n\n` +
              `💡 **Tip**: Esta documentación se mantiene sincronizada with the latest features of v0 and Vercel AI SDK`
      };
    }
  });

  // === GITHUB COPILOT ENHANCED CAPABILITIES ===

  // Comando: /analyze-code (Análisis de código)
  runtime.registerCommand({
    name: '/analyze-code',
    description: 'Analiza código para detectar problemas, mejoras y optimizaciones',
    handler: async (args: any) => {
      const filePath = args?.filePath || 'archivo actual';
      const focus = args?.focus || 'all';
      
      return {
        text: `🔍 **Análisis de Código (GitHub Copilot)**\n\n` +
              `📁 **Archivo**: \`${filePath}\`\n` +
              `🎯 **Enfoque**: \`${focus}\`\n\n` +
              `### 🚀 **Análisis de Performance**\n\n` +
              `#### Optimizaciones JavaScript:\n` +
              `- ✅ **Lazy Loading**: Implementar carga diferida para componentes\n` +
              `- ✅ **Memoization**: Usar \`React.memo\`, \`useMemo\`, \`useCallback\`\n` +
              `- ✅ **Bundle Splitting**: Code splitting por rutas y features\n` +
              `- ✅ **Tree Shaking**: Eliminar código no utilizado\n\n` +
              `#### Optimizaciones DOM:\n` +
              `- ✅ **Virtual Scrolling**: Para listas largas de vehículos\n` +
              `- ✅ **Debouncing**: En búsquedas y filtros\n` +
              `- ✅ **Image Optimization**: WebP, lazy loading, responsive\n\n` +
              `### 🔒 **Análisis de Seguridad**\n\n` +
              `#### Vulnerabilidades Comunes:\n` +
              `- 🛡️ **XSS Prevention**: Sanitizar inputs de usuario\n` +
              `- 🛡️ **CSRF Protection**: Tokens en formularios\n` +
              `- 🛡️ **Input Validation**: Validar datos del cliente y servidor\n` +
              `- 🛡️ **Dependencies**: Escanear vulnerabilidades en npm\n\n` +
              `### ♿ **Análisis de Accesibilidad**\n\n` +
              `#### WCAG 2.1 Compliance:\n` +
              `- ♿ **Keyboard Navigation**: Tab order y focus management\n` +
              `- ♿ **Screen Readers**: ARIA labels y semantic HTML\n` +
              `- ♿ **Color Contrast**: Ratios mínimos para texto\n` +
              `- ♿ **Alternative Text**: Imágenes descriptivas\n\n` +
              `### 🧹 **Análisis de Mantenibilidad**\n\n` +
              `#### Code Quality:\n` +
              `- 📦 **Modularidad**: Single Responsibility Principle\n` +
              `- 📦 **DRY**: Don't Repeat Yourself\n` +
              `- 📦 **SOLID**: Principios de diseño\n` +
              `- 📦 **TypeScript**: Tipos explícitos y interfaces\n\n` +
              `### 📊 **Métricas Sugeridas**\n\n` +
              `\`\`\`bash\n` +
              `# Performance metrics\n` +
              `npm run lighthouse\n` +
              `npm run bundle-analyzer\n\n` +
              `# Code quality\n` +
              `npm run eslint\n` +
              `npm run sonarjs\n\n` +
              `# Security scan\n` +
              `npm audit\n` +
              `npm run security-scan\n` +
              `\`\`\`\n\n` +
              `💡 **Tip**: Usa herramientas como Lighthouse, ESLint y SonarJS para análisis automatizado`
      };
    }
  });

  // Comando: /refactor
  runtime.registerCommand({
    name: '/refactor',
    description: 'Sugiere refactorizaciones para mejorar la calidad del código',
    handler: async (args: any) => {
      const target = args?.target || 'component';
      const filePath = args?.filePath || 'archivo actual';
      
      return {
        text: `♻️ **Refactoring Assistant (GitHub Copilot)**\n\n` +
              `🎯 **Target**: \`${target}\`\n` +
              `📁 **File**: \`${filePath}\`\n\n` +
              `### 🔄 **Patrones de Refactoring**\n\n` +
              `#### Extract Component:\n` +
              `\`\`\`typescript\n` +
              `// Antes: Componente monolítico\n` +
              `function VehicleCard({ vehicle }) {\n` +
              `  return (\n` +
              `    <div className="card">\n` +
              `      <img src={vehicle.image} alt={vehicle.title} />\n` +
              `      <div className="info">\n` +
              `        <h3>{vehicle.title}</h3>\n` +
              `        <p>{vehicle.price}</p>\n` +
              `        <div className="badges">\n` +
              `          {vehicle.features.map(feature => (\n` +
              `            <span key={feature} className="badge">{feature}</span>\n` +
              `          ))}\n` +
              `        </div>\n` +
              `      </div>\n` +
              `    </div>\n` +
              `  );\n` +
              `}\n\n` +
              `// Después: Componentes modulares\n` +
              `function VehicleCard({ vehicle }) {\n` +
              `  return (\n` +
              `    <div className="card">\n` +
              `      <VehicleImage image={vehicle.image} title={vehicle.title} />\n` +
              `      <VehicleInfo vehicle={vehicle} />\n` +
              `    </div>\n` +
              `  );\n` +
              `}\n\n` +
              `function VehicleImage({ image, title }) {\n` +
              `  return <img src={image} alt={title} loading="lazy" />;\n` +
              `}\n\n` +
              `function VehicleInfo({ vehicle }) {\n` +
              `  return (\n` +
              `    <div className="info">\n` +
              `      <h3>{vehicle.title}</h3>\n` +
              `      <p>{vehicle.price}</p>\n` +
              `      <VehicleBadges features={vehicle.features} />\n` +
              `    </div>\n` +
              `  );\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `#### Custom Hooks:\n` +
              `\`\`\`typescript\n` +
              `// Extraer lógica a custom hook\n` +
              `function useVehicleFilter(vehicles, filters) {\n` +
              `  return useMemo(() => {\n` +
              `    return vehicles.filter(vehicle => {\n` +
              `      return (\n` +
              `        (!filters.brand || vehicle.brand === filters.brand) &&\n` +
              `        (!filters.maxPrice || vehicle.price <= filters.maxPrice) &&\n` +
              `        (!filters.year || vehicle.year >= filters.year)\n` +
              `      );\n` +
              `    });\n` +
              `  }, [vehicles, filters]);\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `#### State Management:\n` +
              `\`\`\`typescript\n` +
              `// Usar useReducer para estado complejo\n` +
              `const vehicleReducer = (state, action) => {\n` +
              `  switch (action.type) {\n` +
              `    case 'SET_FILTER':\n` +
              `      return { ...state, filters: { ...state.filters, ...action.payload } };\n` +
              `    case 'SET_VEHICLES':\n` +
              `      return { ...state, vehicles: action.payload, loading: false };\n` +
              `    case 'SET_LOADING':\n` +
              `      return { ...state, loading: action.payload };\n` +
              `    default:\n` +
              `      return state;\n` +
              `  }\n` +
              `};\n` +
              `\`\`\`\n\n` +
              `### 🎯 **Refactoring Checklist**\n\n` +
              `- ✅ **Single Responsibility**: Cada función/componente una responsabilidad\n` +
              `- ✅ **Pure Functions**: Sin side effects cuando sea posible\n` +
              `- ✅ **Immutability**: Evitar mutaciones directas del estado\n` +
              `- ✅ **Error Boundaries**: Manejo de errores en componentes\n` +
              `- ✅ **Performance**: Memoization y optimizaciones\n\n` +
              `💡 **Tip**: Refactoriza incrementalmente y mantén tests para asegurar funcionalidad`
      };
    }
  });

  // Comando: /debug-help
  runtime.registerCommand({
    name: '/debug-help',
    description: 'Ayuda a debuggear problemas comunes y errores en el código',
    handler: async (args: any) => {
      const error = args?.error || 'error genérico';
      const type = args?.type || 'javascript';
      
      return {
        text: `🐛 **Debug Assistant (GitHub Copilot)**\n\n` +
              `❌ **Error**: \`${error}\`\n` +
              `🔍 **Type**: \`${type}\`\n\n` +
              `### 🚨 **Errores JavaScript Comunes**\n\n` +
              `#### TypeError: Cannot read property 'X' of undefined\n` +
              `\`\`\`javascript\n` +
              `// ❌ Problemático\n` +
              `const price = vehicle.pricing.base; // vehicle.pricing puede ser undefined\n\n` +
              `// ✅ Solución - Optional chaining\n` +
              `const price = vehicle?.pricing?.base ?? 'No disponible';\n\n` +
              `// ✅ Solución - Guard clause\n` +
              `if (vehicle && vehicle.pricing && vehicle.pricing.base) {\n` +
              `  const price = vehicle.pricing.base;\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `#### ReferenceError: X is not defined\n` +
              `\`\`\`javascript\n` +
              `// ❌ Variable no declarada\n` +
              `console.log(vehicleData); // vehicleData no existe\n\n` +
              `// ✅ Verificar imports\n` +
              `import { vehicleData } from './data/vehicles';\n\n` +
              `// ✅ Verificar scope\n` +
              `const vehicleData = [];\n` +
              `console.log(vehicleData);\n` +
              `\`\`\`\n\n` +
              `### ⚛️ **Errores React Comunes**\n\n` +
              `#### Hooks called conditionally\n` +
              `\`\`\`javascript\n` +
              `// ❌ Hook condicional\n` +
              `function VehicleList({ vehicles }) {\n` +
              `  if (!vehicles) return null;\n` +
              `  const [selected, setSelected] = useState(null); // ❌ Hook después de return\n` +
              `}\n\n` +
              `// ✅ Hooks siempre al inicio\n` +
              `function VehicleList({ vehicles }) {\n` +
              `  const [selected, setSelected] = useState(null);\n` +
              `  \n` +
              `  if (!vehicles) return <div>No vehicles found</div>;\n` +
              `  return <div>...</div>;\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `#### Key prop missing\n` +
              `\`\`\`javascript\n` +
              `// ❌ Sin key prop\n` +
              `{vehicles.map(vehicle => (\n` +
              `  <VehicleCard vehicle={vehicle} />\n` +
              `))}\n\n` +
              `// ✅ Con key único\n` +
              `{vehicles.map(vehicle => (\n` +
              `  <VehicleCard key={vehicle.id} vehicle={vehicle} />\n` +
              `))}\n` +
              `\`\`\`\n\n` +
              `### 🎨 **Errores CSS Comunes**\n\n` +
              `#### Layout issues\n` +
              `\`\`\`css\n` +
              `/* ❌ Problemas de z-index */\n` +
              `.modal { z-index: 999; }\n` +
              `.navbar { z-index: 1000; }\n\n` +
              `/* ✅ Z-index sistemático */\n` +
              `.modal { z-index: var(--z-modal, 50); }\n` +
              `.navbar { z-index: var(--z-navbar, 40); }\n` +
              `\`\`\`\n\n` +
              `### 🛠️ **Herramientas de Debug**\n\n` +
              `#### React Developer Tools:\n` +
              `\`\`\`javascript\n` +
              `// Debug en componentes\n` +
              `console.log('Vehicle data:', vehicle);\n` +
              `console.log('Component props:', props);\n\n` +
              `// React DevTools Profiler\n` +
              `import { Profiler } from 'react';\n` +
              `\`\`\`\n\n` +
              `#### Browser DevTools:\n` +
              `- 🔍 **Console**: Logs y errors\n` +
              `- 🔍 **Network**: Requests y responses\n` +
              `- 🔍 **Sources**: Breakpoints y step debugging\n` +
              `- 🔍 **Performance**: Profiling y bottlenecks\n\n` +
              `### 📋 **Debug Checklist**\n\n` +
              `1. ✅ **Reproduce** el error consistentemente\n` +
              `2. ✅ **Console logs** para trazar el flujo\n` +
              `3. ✅ **Check props** y state en React DevTools\n` +
              `4. ✅ **Network tab** para errores de API\n` +
              `5. ✅ **Error boundaries** para catch errors\n\n` +
              `💡 **Tip**: Usa \`console.trace()\` para ver el call stack completo`
      };
    }
  });

  // Comando: /generate-tests
  runtime.registerCommand({
    name: '/generate-tests',
    description: 'Genera tests unitarios y de integración para componentes y funciones',
    handler: async (args: any) => {
      const target = args?.target || 'component';
      const filePath = args?.filePath || 'archivo actual';
      
      return {
        text: `🧪 **Test Generator (GitHub Copilot)**\n\n` +
              `🎯 **Target**: \`${target}\`\n` +
              `📁 **File**: \`${filePath}\`\n\n` +
              `### ⚛️ **Component Testing (React Testing Library)**\n\n` +
              `#### Test para VehicleCard:\n` +
              `\`\`\`javascript\n` +
              `import { render, screen, fireEvent } from '@testing-library/react';\n` +
              `import '@testing-library/jest-dom';\n` +
              `import VehicleCard from '../VehicleCard';\n\n` +
              `const mockVehicle = {\n` +
              `  id: '1',\n` +
              `  title: '2020 Toyota Camry',\n` +
              `  price: '$25,000',\n` +
              `  image: '/images/camry.jpg',\n` +
              `  features: ['Automático', 'AC', 'GPS']\n` +
              `};\n\n` +
              `describe('VehicleCard', () => {\n` +
              `  test('renders vehicle information correctly', () => {\n` +
              `    render(<VehicleCard vehicle={mockVehicle} />);\n` +
              `    \n` +
              `    expect(screen.getByText('2020 Toyota Camry')).toBeInTheDocument();\n` +
              `    expect(screen.getByText('$25,000')).toBeInTheDocument();\n` +
              `    expect(screen.getByAltText('2020 Toyota Camry')).toBeInTheDocument();\n` +
              `  });\n\n` +
              `  test('displays all vehicle features', () => {\n` +
              `    render(<VehicleCard vehicle={mockVehicle} />);\n` +
              `    \n` +
              `    mockVehicle.features.forEach(feature => {\n` +
              `      expect(screen.getByText(feature)).toBeInTheDocument();\n` +
              `    });\n` +
              `  });\n\n` +
              `  test('calls onClick handler when clicked', () => {\n` +
              `    const handleClick = jest.fn();\n` +
              `    render(<VehicleCard vehicle={mockVehicle} onClick={handleClick} />);\n` +
              `    \n` +
              `    fireEvent.click(screen.getByRole('button'));\n` +
              `    expect(handleClick).toHaveBeenCalledWith(mockVehicle);\n` +
              `  });\n` +
              `});\n` +
              `\`\`\`\n\n` +
              `### 🔧 **Function Testing (Jest)**\n\n` +
              `#### Test para VehicleService:\n` +
              `\`\`\`javascript\n` +
              `import VehicleService from '../VehicleService';\n\n` +
              `// Mock fetch\n` +
              `global.fetch = jest.fn();\n\n` +
              `describe('VehicleService', () => {\n` +
              `  beforeEach(() => {\n` +
              `    fetch.mockClear();\n` +
              `  });\n\n` +
              `  test('getVehicles returns vehicle data', async () => {\n` +
              `    const mockVehicles = [mockVehicle];\n` +
              `    fetch.mockResolvedValueOnce({\n` +
              `      ok: true,\n` +
              `      json: async () => mockVehicles,\n` +
              `    });\n\n` +
              `    const result = await VehicleService.getVehicles();\n` +
              `    expect(result).toEqual(mockVehicles);\n` +
              `    expect(fetch).toHaveBeenCalledWith('/api/vehicles');\n` +
              `  });\n\n` +
              `  test('handles API errors gracefully', async () => {\n` +
              `    fetch.mockRejectedValueOnce(new Error('API Error'));\n\n` +
              `    await expect(VehicleService.getVehicles()).rejects.toThrow('API Error');\n` +
              `  });\n` +
              `});\n` +
              `\`\`\`\n\n` +
              `### 🌐 **E2E Testing (Playwright/Cypress)**\n\n` +
              `#### Test E2E para flujo de búsqueda:\n` +
              `\`\`\`javascript\n` +
              `// playwright.test.js\n` +
              `import { test, expect } from '@playwright/test';\n\n` +
              `test('vehicle search flow', async ({ page }) => {\n` +
              `  await page.goto('http://localhost:3000');\n` +
              `  \n` +
              `  // Search for vehicles\n` +
              `  await page.fill('[data-testid="search-input"]', 'Toyota');\n` +
              `  await page.click('[data-testid="search-button"]');\n` +
              `  \n` +
              `  // Verify results\n` +
              `  await expect(page.locator('[data-testid="vehicle-card"]')).toHaveCount(3);\n` +
              `  await expect(page.locator('text=Toyota')).toBeVisible();\n` +
              `  \n` +
              `  // Click on first vehicle\n` +
              `  await page.click('[data-testid="vehicle-card"]:first-child');\n` +
              `  await expect(page.locator('[data-testid="vehicle-details"]')).toBeVisible();\n` +
              `});\n` +
              `\`\`\`\n\n` +
              `### 🚀 **API Testing**\n\n` +
              `#### Test para endpoints:\n` +
              `\`\`\`javascript\n` +
              `import request from 'supertest';\n` +
              `import app from '../app';\n\n` +
              `describe('Vehicles API', () => {\n` +
              `  test('GET /api/vehicles returns vehicles list', async () => {\n` +
              `    const response = await request(app)\n` +
              `      .get('/api/vehicles')\n` +
              `      .expect(200);\n\n` +
              `    expect(Array.isArray(response.body)).toBe(true);\n` +
              `    expect(response.body.length).toBeGreaterThan(0);\n` +
              `  });\n\n` +
              `  test('GET /api/vehicles/:id returns specific vehicle', async () => {\n` +
              `    const response = await request(app)\n` +
              `      .get('/api/vehicles/1')\n` +
              `      .expect(200);\n\n` +
              `    expect(response.body).toHaveProperty('id', '1');\n` +
              `    expect(response.body).toHaveProperty('title');\n` +
              `  });\n` +
              `});\n` +
              `\`\`\`\n\n` +
              `### 📋 **Testing Best Practices**\n\n` +
              `- ✅ **AAA Pattern**: Arrange, Act, Assert\n` +
              `- ✅ **Test Isolation**: Cada test independiente\n` +
              `- ✅ **Mock External**: APIs, timers, modules\n` +
              `- ✅ **Descriptive Names**: Tests auto-documentados\n` +
              `- ✅ **Edge Cases**: Errores, límites, estados vacíos\n\n` +
              `### 🛠️ **Setup Testing Environment**\n\n` +
              `\`\`\`bash\n` +
              `# Install testing dependencies\n` +
              `npm install --save-dev @testing-library/react @testing-library/jest-dom\n` +
              `npm install --save-dev jest @playwright/test\n\n` +
              `# Run tests\n` +
              `npm test\n` +
              `npm run test:e2e\n` +
              `npm run test:coverage\n` +
              `\`\`\`\n\n` +
              `💡 **Tip**: Apunta a 80%+ code coverage pero prioriza tests de alta calidad sobre cantidad`
      };
    }
  });

  // Comando: /optimize
  runtime.registerCommand({
    name: '/optimize',
    description: 'Optimiza rendimiento, bundle size y experiencia de usuario',
    handler: async (args: any) => {
      const type = args?.type || 'performance';
      const scope = args?.scope || 'app';
      
      return {
        text: `⚡ **Optimization Assistant (GitHub Copilot)**\n\n` +
              `🎯 **Type**: \`${type}\`\n` +
              `📍 **Scope**: \`${scope}\`\n\n` +
              `### 🚀 **Performance Optimization**\n\n` +
              `#### React Performance:\n` +
              `\`\`\`javascript\n` +
              `// Memo para componentes puros\n` +
              `const VehicleCard = React.memo(({ vehicle, onClick }) => {\n` +
              `  return (\n` +
              `    <div className="vehicle-card" onClick={() => onClick(vehicle.id)}>\n` +
              `      <img src={vehicle.image} alt={vehicle.title} loading="lazy" />\n` +
              `      <h3>{vehicle.title}</h3>\n` +
              `    </div>\n` +
              `  );\n` +
              `});\n\n` +
              `// useMemo para cálculos costosos\n` +
              `const VehicleList = ({ vehicles, filters }) => {\n` +
              `  const filteredVehicles = useMemo(() => {\n` +
              `    return vehicles.filter(vehicle => \n` +
              `      vehicle.brand.includes(filters.brand) &&\n` +
              `      vehicle.price <= filters.maxPrice\n` +
              `    );\n` +
              `  }, [vehicles, filters]);\n\n` +
              `  const handleVehicleClick = useCallback((vehicleId) => {\n` +
              `    // Handle click logic\n` +
              `  }, []);\n\n` +
              `  return (\n` +
              `    <div className="vehicle-grid">\n` +
              `      {filteredVehicles.map(vehicle => (\n` +
              `        <VehicleCard \n` +
              `          key={vehicle.id} \n` +
              `          vehicle={vehicle}\n` +
              `          onClick={handleVehicleClick}\n` +
              `        />\n` +
              `      ))}\n` +
              `    </div>\n` +
              `  );\n` +
              `};\n` +
              `\`\`\`\n\n` +
              `#### Code Splitting:\n` +
              `\`\`\`javascript\n` +
              `// Lazy loading de páginas\n` +
              `const AutosPage = lazy(() => import('./pages/AutosPage'));\n` +
              `const CamionetasPage = lazy(() => import('./pages/CamionetasPage'));\n\n` +
              `function App() {\n` +
              `  return (\n` +
              `    <Router>\n` +
              `      <Suspense fallback={<LoadingSpinner />}>\n` +
              `        <Routes>\n` +
              `          <Route path="/autos" element={<AutosPage />} />\n` +
              `          <Route path="/camionetas" element={<CamionetasPage />} />\n` +
              `        </Routes>\n` +
              `      </Suspense>\n` +
              `    </Router>\n` +
              `  );\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `### 📦 **Bundle Optimization**\n\n` +
              `#### Tree Shaking:\n` +
              `\`\`\`javascript\n` +
              `// ❌ Import completo\n` +
              `import _ from 'lodash';\n\n` +
              `// ✅ Import específico\n` +
              `import { debounce } from 'lodash/debounce';\n\n` +
              `// ✅ Import directo\n` +
              `import debounce from 'lodash.debounce';\n` +
              `\`\`\`\n\n` +
              `#### Bundle Analysis:\n` +
              `\`\`\`bash\n` +
              `# Analizar bundle size\n` +
              `npm install --save-dev webpack-bundle-analyzer\n` +
              `npm run build -- --analyze\n\n` +
              `# Vite bundle analyzer\n` +
              `npm install --save-dev rollup-plugin-visualizer\n` +
              `\`\`\`\n\n` +
              `### 🖼️ **Image Optimization**\n\n` +
              `#### Next.js Image Component:\n` +
              `\`\`\`javascript\n` +
              `import Image from 'next/image';\n\n` +
              `function VehicleGallery({ images }) {\n` +
              `  return (\n` +
              `    <div className="gallery">\n` +
              `      {images.map((image, index) => (\n` +
              `        <Image\n` +
              `          key={index}\n` +
              `          src={image.src}\n` +
              `          alt={image.alt}\n` +
              `          width={400}\n` +
              `          height={300}\n` +
              `          priority={index === 0}\n` +
              `          placeholder="blur"\n` +
              `          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."\n` +
              `        />\n` +
              `      ))}\n` +
              `    </div>\n` +
              `  );\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `### ♿ **Accessibility Optimization**\n\n` +
              `#### ARIA y Semantic HTML:\n` +
              `\`\`\`javascript\n` +
              `function VehicleFilter({ onFilterChange }) {\n` +
              `  return (\n` +
              `    <form role="search" aria-label="Filtros de vehículos">\n` +
              `      <fieldset>\n` +
              `        <legend>Marca del vehículo</legend>\n` +
              `        <select \n` +
              `          aria-label="Seleccionar marca"\n` +
              `          onChange={(e) => onFilterChange('brand', e.target.value)}\n` +
              `        >\n` +
              `          <option value="">Todas las marcas</option>\n` +
              `          <option value="toyota">Toyota</option>\n` +
              `          <option value="honda">Honda</option>\n` +
              `        </select>\n` +
              `      </fieldset>\n\n` +
              `      <button \n` +
              `        type="submit"\n` +
              `        aria-describedby="filter-help"\n` +
              `      >\n` +
              `        Aplicar filtros\n` +
              `      </button>\n` +
              `      <div id="filter-help" className="sr-only">\n` +
              `        Presiona Enter para aplicar los filtros seleccionados\n` +
              `      </div>\n` +
              `    </form>\n` +
              `  );\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `### 🔍 **SEO Optimization**\n\n` +
              `#### Meta Tags y Structured Data:\n` +
              `\`\`\`javascript\n` +
              `// pages/autos/[id].js (Next.js)\n` +
              `export async function generateMetadata({ params }) {\n` +
              `  const vehicle = await getVehicle(params.id);\n` +
              `  \n` +
              `  return {\n` +
              `    title: \`\${vehicle.title} - TuAutocom\`,\n` +
              `    description: \`\${vehicle.title} en venta. Precio: \${vehicle.price}. \${vehicle.description}\`,\n` +
              `    keywords: \`\${vehicle.brand}, \${vehicle.model}, \${vehicle.year}, auto usado\`,\n` +
              `    openGraph: {\n` +
              `      title: vehicle.title,\n` +
              `      description: vehicle.description,\n` +
              `      images: [vehicle.images[0]],\n` +
              `      type: 'product',\n` +
              `    },\n` +
              `    schema: {\n` +
              `      '@context': 'https://schema.org',\n` +
              `      '@type': 'Car',\n` +
              `      name: vehicle.title,\n` +
              `      offers: {\n` +
              `        '@type': 'Offer',\n` +
              `        price: vehicle.price,\n` +
              `        priceCurrency: 'USD'\n` +
              `      }\n` +
              `    }\n` +
              `  };\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `### 📊 **Performance Metrics**\n\n` +
              `#### Core Web Vitals:\n` +
              `\`\`\`javascript\n` +
              `// pages/_app.js (Next.js)\n` +
              `import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';\n\n` +
              `function reportWebVitals(metric) {\n` +
              `  // Enviar a analytics\n` +
              `  gtag('event', metric.name, {\n` +
              `    event_category: 'Web Vitals',\n` +
              `    value: Math.round(metric.value),\n` +
              `    event_label: metric.id,\n` +
              `  });\n` +
              `}\n\n` +
              `export default function App({ Component, pageProps }) {\n` +
              `  return <Component {...pageProps} />;\n` +
              `}\n\n` +
              `export { reportWebVitals };\n` +
              `\`\`\`\n\n` +
              `### 🛠️ **Optimization Tools**\n\n` +
              `\`\`\`bash\n` +
              `# Performance testing\n` +
              `npm install --save-dev lighthouse\n` +
              `npm install --save-dev @next/bundle-analyzer\n\n` +
              `# SEO testing\n` +
              `npm install --save-dev next-seo\n\n` +
              `# Accessibility testing\n` +
              `npm install --save-dev @axe-core/react\n` +
              `\`\`\`\n\n` +
              `### 📋 **Optimization Checklist**\n\n` +
              `- ✅ **Code Splitting**: Lazy loading de rutas\n` +
              `- ✅ **Image Optimization**: WebP, lazy loading\n` +
              `- ✅ **Bundle Size**: Tree shaking, dead code elimination\n` +
              `- ✅ **Caching**: Service Worker, CDN\n` +
              `- ✅ **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1\n` +
              `- ✅ **Accessibility**: WCAG 2.1 AA compliance\n` +
              `- ✅ **SEO**: Meta tags, structured data, sitemap\n\n` +
              `💡 **Tip**: Usa Lighthouse CI para monitoreo continuo de performance`
      };
    }
  });

  // Comando: /code-review
  runtime.registerCommand({
    name: '/code-review',
    description: 'Realiza review del código siguiendo mejores prácticas',
    handler: async (args: any) => {
      const scope = args?.scope || 'file';
      const checklist = args?.checklist || 'all';
      
      return {
        text: `👁️ **Code Review Assistant (GitHub Copilot)**\n\n` +
              `📍 **Scope**: \`${scope}\`\n` +
              `📋 **Checklist**: \`${checklist}\`\n\n` +
              `### 🔍 **Code Review Checklist**\n\n` +
              `#### 📐 **Code Structure & Design**\n` +
              `- ✅ **Single Responsibility**: Cada función/clase tiene una responsabilidad\n` +
              `- ✅ **DRY Principle**: No hay código duplicado innecesariamente\n` +
              `- ✅ **SOLID Principles**: Diseño orientado a objetos sólido\n` +
              `- ✅ **Separation of Concerns**: UI, lógica y datos separados\n` +
              `- ✅ **Consistent Naming**: Variables y funciones con nombres descriptivos\n\n` +
              `#### ⚛️ **React Best Practices**\n` +
              `\`\`\`javascript\n` +
              `// ✅ Good: Functional component with hooks\n` +
              `function VehicleCard({ vehicle, onSelect }) {\n` +
              `  const [isExpanded, setIsExpanded] = useState(false);\n` +
              `  \n` +
              `  const handleToggle = useCallback(() => {\n` +
              `    setIsExpanded(prev => !prev);\n` +
              `  }, []);\n\n` +
              `  const handleSelect = useCallback(() => {\n` +
              `    onSelect(vehicle.id);\n` +
              `  }, [vehicle.id, onSelect]);\n\n` +
              `  return (\n` +
              `    <article className="vehicle-card" role="article">\n` +
              `      <h3>{vehicle.title}</h3>\n` +
              `      <button onClick={handleToggle} aria-expanded={isExpanded}>\n` +
              `        {isExpanded ? 'Show Less' : 'Show More'}\n` +
              `      </button>\n` +
              `      {isExpanded && (\n` +
              `        <div className="vehicle-details">\n` +
              `          <p>{vehicle.description}</p>\n` +
              `        </div>\n` +
              `      )}\n` +
              `    </article>\n` +
              `  );\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `#### 🔒 **Security Review**\n` +
              `- 🛡️ **Input Validation**: Todos los inputs validados\n` +
              `- 🛡️ **XSS Prevention**: dangerouslySetInnerHTML evitado\n` +
              `- 🛡️ **CSRF Protection**: Tokens en formularios\n` +
              `- 🛡️ **API Security**: Headers de seguridad implementados\n` +
              `- 🛡️ **Dependencies**: No vulnerabilidades conocidas\n\n` +
              `\`\`\`javascript\n` +
              `// ❌ Vulnerable to XSS\n` +
              `function VehicleDescription({ description }) {\n` +
              `  return <div dangerouslySetInnerHTML={{ __html: description }} />;\n` +
              `}\n\n` +
              `// ✅ Safe approach\n` +
              `function VehicleDescription({ description }) {\n` +
              `  const sanitizedDescription = DOMPurify.sanitize(description);\n` +
              `  return <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />;\n` +
              `}\n\n` +
              `// ✅ Even safer - use text content\n` +
              `function VehicleDescription({ description }) {\n` +
              `  return <div>{description}</div>;\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `#### 🚀 **Performance Review**\n` +
              `- ⚡ **Unnecessary Re-renders**: React.memo y useCallback apropiados\n` +
              `- ⚡ **Heavy Computations**: useMemo para cálculos costosos\n` +
              `- ⚡ **Bundle Size**: Imports optimizados\n` +
              `- ⚡ **Image Optimization**: Lazy loading y formatos modernos\n` +
              `- ⚡ **Memory Leaks**: Event listeners y subscriptions limpiados\n\n` +
              `\`\`\`javascript\n` +
              `// ✅ Cleanup en useEffect\n` +
              `useEffect(() => {\n` +
              `  const handleResize = () => {\n` +
              `    setWindowWidth(window.innerWidth);\n` +
              `  };\n\n` +
              `  window.addEventListener('resize', handleResize);\n` +
              `  \n` +
              `  return () => {\n` +
              `    window.removeEventListener('resize', handleResize);\n` +
              `  };\n` +
              `}, []);\n` +
              `\`\`\`\n\n` +
              `#### ♿ **Accessibility Review**\n` +
              `- ♿ **Semantic HTML**: Elementos semánticos apropiados\n` +
              `- ♿ **ARIA Labels**: Labels descriptivos para screen readers\n` +
              `- ♿ **Keyboard Navigation**: Tab order lógico\n` +
              `- ♿ **Color Contrast**: Ratios mínimos cumplidos\n` +
              `- ♿ **Focus Management**: Estados de focus visibles\n\n` +
              `#### 🧪 **Testing Review**\n` +
              `- 🧪 **Test Coverage**: Funciones críticas testeadas\n` +
              `- 🧪 **Edge Cases**: Casos límite considerados\n` +
              `- 🧪 **Mock Quality**: Mocks realistas y útiles\n` +
              `- 🧪 **Test Independence**: Tests no dependen entre sí\n` +
              `- 🧪 **Descriptive Names**: Tests auto-documentados\n\n` +
              `### 📝 **Documentation Review**\n\n` +
              `\`\`\`javascript\n` +
              `/**\n` +
              ` * Displays a vehicle card with image, details, and actions\n` +
              ` * @param {Object} vehicle - Vehicle data object\n` +
              ` * @param {string} vehicle.id - Unique vehicle identifier\n` +
              ` * @param {string} vehicle.title - Vehicle title/name\n` +
              ` * @param {string} vehicle.price - Formatted price string\n` +
              ` * @param {Function} onSelect - Callback when vehicle is selected\n` +
              ` * @returns {JSX.Element} Vehicle card component\n` +
              ` */\n` +
              `function VehicleCard({ vehicle, onSelect }) {\n` +
              `  // Component implementation\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `### 🔧 **Code Quality Metrics**\n\n` +
              `#### Complexity Analysis:\n` +
              `\`\`\`bash\n` +
              `# Cyclomatic complexity\n` +
              `npm install --save-dev complexity-report\n` +
              `complexity-report src/ --output=json\n\n` +
              `# Code duplication\n` +
              `npm install --save-dev jscpd\n` +
              `jscpd src/\n\n` +
              `# Technical debt\n` +
              `npm install --save-dev sonarjs\n` +
              `eslint --ext .js,.jsx src/ --plugin sonarjs\n` +
              `\`\`\`\n\n` +
              `### 📋 **Pull Request Checklist**\n\n` +
              `- ✅ **Functionality**: Features funcionan como se espera\n` +
              `- ✅ **Tests**: Tests pasan y cubren nueva funcionalidad\n` +
              `- ✅ **Performance**: No degradación de rendimiento\n` +
              `- ✅ **Security**: No vulnerabilidades introducidas\n` +
              `- ✅ **Accessibility**: WCAG guidelines seguidas\n` +
              `- ✅ **Documentation**: Código y APIs documentados\n` +
              `- ✅ **Breaking Changes**: Cambios breaking identificados\n` +
              `- ✅ **Dependencies**: Nuevas dependencias justificadas\n\n` +
              `### 🤖 **Automated Review Tools**\n\n` +
              `\`\`\`yaml\n` +
              `# .github/workflows/code-review.yml\n` +
              `name: Code Review\n` +
              `on: [pull_request]\n` +
              `jobs:\n` +
              `  quality:\n` +
              `    runs-on: ubuntu-latest\n` +
              `    steps:\n` +
              `      - uses: actions/checkout@v3\n` +
              `      - name: ESLint\n` +
              `        run: npm run lint\n` +
              `      - name: Tests\n` +
              `        run: npm test\n` +
              `      - name: Security scan\n` +
              `        run: npm audit\n` +
              `      - name: Bundle analysis\n` +
              `        run: npm run analyze\n` +
              `\`\`\`\n\n` +
              `💡 **Tip**: Usa herramientas como SonarQube, CodeClimate o DeepCode para análisis automatizado`
      };
    }
  });

  // Comando: /generate-docs
  runtime.registerCommand({
    name: '/generate-docs',
    description: 'Genera documentación automática para código y APIs',
    handler: async (args: any) => {
      const type = args?.type || 'component';
      const format = args?.format || 'markdown';
      
      return {
        text: `📚 **Documentation Generator (GitHub Copilot)**\n\n` +
              `📄 **Type**: \`${type}\`\n` +
              `📝 **Format**: \`${format}\`\n\n` +
              `### 📖 **Component Documentation**\n\n` +
              `#### JSDoc para VehicleCard:\n` +
              `\`\`\`javascript\n` +
              `/**\n` +
              ` * Vehicle card component for displaying vehicle information\n` +
              ` * \n` +
              ` * @component\n` +
              ` * @param {Object} props - Component props\n` +
              ` * @param {Vehicle} props.vehicle - Vehicle data object\n` +
              ` * @param {string} props.vehicle.id - Unique vehicle identifier\n` +
              ` * @param {string} props.vehicle.title - Vehicle title/name\n` +
              ` * @param {string} props.vehicle.brand - Vehicle brand\n` +
              ` * @param {string} props.vehicle.price - Formatted price string\n` +
              ` * @param {string[]} props.vehicle.features - List of vehicle features\n` +
              ` * @param {Function} props.onSelect - Callback when vehicle is selected\n` +
              ` * @param {string} [props.className] - Additional CSS classes\n` +
              ` * @param {'small'|'medium'|'large'} [props.size='medium'] - Card size variant\n` +
              ` * @returns {JSX.Element} Rendered vehicle card\n` +
              ` * \n` +
              ` * @example\n` +
              ` * // Basic usage\n` +
              ` * <VehicleCard \n` +
              ` *   vehicle={vehicleData} \n` +
              ` *   onSelect={(id) => console.log('Selected:', id)}\n` +
              ` * />\n` +
              ` * \n` +
              ` * @example\n` +
              ` * // With custom styling\n` +
              ` * <VehicleCard \n` +
              ` *   vehicle={vehicleData}\n` +
              ` *   onSelect={handleSelect}\n` +
              ` *   className="custom-card"\n` +
              ` *   size="large"\n` +
              ` * />\n` +
              ` */\n` +
              `function VehicleCard({ vehicle, onSelect, className = '', size = 'medium' }) {\n` +
              `  // Component implementation\n` +
              `}\n` +
              `\`\`\`\n\n` +
              `💡 **Tip**: Mantén la documentación actualizada con cada PR y usa herramientas de generación automática`
      };
    }
  });

  // Comando: /security-scan
  runtime.registerCommand({
    name: '/security-scan',
    description: 'Escanea código en busca de vulnerabilidades de seguridad',
    handler: async (args: any) => {
      const scope = args?.scope || 'all';
      
      return {
        text: `🔒 **Security Scanner (GitHub Copilot)**\n\n` +
              `🔍 **Scope**: \`${scope}\`\n\n` +
              `### 🛡️ **Frontend Security Checklist**\n\n` +
              `💡 **Tip**: Implementa security scanning en tu CI/CD pipeline y mantén dependencias actualizadas`
      };
    }
  });

  // Comando: /workflow-setup
  runtime.registerCommand({
    name: '/workflow-setup',
    description: 'Configura workflows de CI/CD, GitHub Actions y automatización',
    handler: async (args: any) => {
      const type = args?.type || 'ci';
      const platform = args?.platform || 'github-actions';
      
      return {
        text: `⚙️ **Workflow Setup (GitHub Copilot)**\n\n` +
              `🎯 **Type**: \`${type}\`\n` +
              `🏗️ **Platform**: \`${platform}\`\n\n` +
              `### 🔄 **CI/CD Pipeline Setup**\n\n` +
              `💡 **Tip**: Configura branch protection rules y requiere PR reviews para main branch`
      };
    }
  });
}