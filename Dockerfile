FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . /app
EXPOSE 3010
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
