# Imagem de Origem
FROM node:13-alpine
# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /usr/src/app

# Instalando dependências da aplicação e armazenando em cache.
COPY package.json .
RUN npm install 
RUN npm install react-scripts -g
# Inicializa a aplicação
CMD ["npm", "start"]