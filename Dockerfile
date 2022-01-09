FROM node:16 as backend
WORKDIR /app
COPY ./my-cargonaut-backend/package*.json .
RUN npm i -f
COPY ./my-cargonaut-backend .
RUN npm run build

FROM node:14 as frontend
WORKDIR /app
COPY ./my-cargonaut-frontend/package*.json .
RUN npm ci
COPY ./my-cargonaut-frontend .
RUN npm run build

FROM node:16
WORKDIR /app
COPY ./my-cargonaut-backend/package*.json .
COPY ./my-cargonaut-backend/ormconfig_docker.json ormconfig.json
RUN npm i -f
COPY --from=backend /app/dist .
COPY --from=frontend /app/dist/my-cargonaut-frontend ./angular
CMD ["node", "main.js"]