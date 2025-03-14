# Build Stage
FROM node:16 AS builder

WORKDIR /workspace

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code into the container
COPY . .

# Build the client and server
RUN npm run build-client
RUN npm run build-server

# Final Stage
FROM node:16-slim

WORKDIR /app

# Copy the built server, client, and content files from the builder stage
# We assume that the content and template.html are in the src folder, outside of the workspace
COPY --from=builder /workspace/dist ./dist
COPY --from=builder /workspace/public ./public
COPY --from=builder /workspace/src/content ./dist/content
COPY --from=builder /workspace/src/template.html ./dist/template.html
COPY --from=builder /workspace/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port
EXPOSE 3001

# Start the application
CMD ["node", "dist/index.js"]
