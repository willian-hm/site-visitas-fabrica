# Etapa de build
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala somente as dependências de produção
RUN npm install --omit=dev

# Copia o restante do projeto
COPY . .

# Expõe a porta (altere se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
