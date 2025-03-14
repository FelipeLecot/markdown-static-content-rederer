FROM node:16 AS builder

WORKDIR /workspace

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build-client
RUN npm run build-server

FROM node:16-slim

WORKDIR /app

COPY --from=builder /workspace/dist ./dist
COPY --from=builder /workspace/public ./public
COPY --from=builder /workspace/src/content ./dist/content
COPY --from=builder /workspace/src/templates ./dist/templates
COPY --from=builder /workspace/package*.json ./

RUN npm install --only=production

EXPOSE 3001

CMD ["node", "dist/index.js"]
