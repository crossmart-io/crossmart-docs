# Static build of the docs site, served by nginx.
#   docker build --build-arg PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX -t crossmart-docs .
#   docker run -p 8080:8080 crossmart-docs

ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine AS build
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# Public build-time settings, baked into the static pages. Railway passes service variables
# with these names as build arguments. Empty turns analytics and the cookie banner off.
ARG PUBLIC_GA_MEASUREMENT_ID=
ENV PUBLIC_GA_MEASUREMENT_ID=${PUBLIC_GA_MEASUREMENT_ID}
RUN pnpm build

FROM nginx:1.27-alpine AS runtime
# Railway sets PORT at runtime; the nginx image fills it into the template on start.
ENV PORT=8080
COPY deploy/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
