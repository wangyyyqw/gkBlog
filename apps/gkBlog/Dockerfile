# 使用 Node.js 18 的 Alpine 版本作为基础镜像
FROM node:18-alpine AS base

# 安装必要依赖（修复 OpenSSL 问题）
RUN apk update && apk add --no-cache \
    libc6-compat \
    openssl \
    openssl-dev \
    ca-certificates \
    curl \
    python3 \
    make \
    g++

# 全局安装 Turbo 和 pnpm
RUN npm install -g turbo pnpm

#######################################################

# 创建修剪阶段
FROM base AS prune
WORKDIR /app
COPY . .
RUN turbo prune gkBlog --docker

#######################################################

# 创建安装阶段
FROM base AS installer
WORKDIR /app
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/full/ .
RUN pnpm install

#######################################################

# 创建生产安装阶段
FROM installer AS installer-production
WORKDIR /app
COPY --from=prune /app/out/json/ .
RUN pnpm install --only=production

#######################################################

# 创建构建阶段
FROM installer AS builder
WORKDIR /app
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/apps/gkBlog/node_modules /app/apps/gkBlog/node_modules
COPY --from=prune /app/out/full/ .
RUN pnpm run build

#######################################################

# 创建运行阶段
FROM base AS runner
WORKDIR /app

# 不以 root 身份运行生产环境
RUN addgroup --system --gid 1001 web-group && \
    adduser --system --uid 1001 web-user
USER web-user

# 复制所需文件到运行环境
COPY --from=installer-production --chown=web-user:web-group /app/node_modules /app/node_modules
COPY --from=installer-production --chown=web-user:web-group /app/apps/gkBlog/node_modules /app/apps/gkBlog/node_modules
COPY --from=installer-production --chown=web-user:web-group /app/packages/rehype-plugins/node_modules /app/packages/rehype-plugins/node_modules
COPY --from=installer-production --chown=web-user:web-group /app/packages/remark-plugins/node_modules /app/packages/remark-plugins/node_modules
COPY --from=prune --chown=web-user:web-group /app/out/json/ .
COPY --from=prune --chown=web-user:web-group /app/out/full/ .
COPY --from=builder --chown=web-user:web-group /app/apps/gkBlog/.next /app/apps/gkBlog/.next
COPY --from=builder --chown=web-user:web-group /app/apps/gkBlog/public /app/apps/gkBlog/public

WORKDIR /app/apps/gkBlog

# 创建符号链接解决 OpenSSL 问题
USER root
RUN ln -s /usr/lib/libssl.so.3 /usr/lib/libssl.so.1.1 && \
    ln -s /usr/lib/libcrypto.so.3 /usr/lib/libcrypto.so.1.1
USER web-user

# 解决 Prisma 依赖问题
RUN pnpm exec prisma generate

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["pnpm", "run", "start"]