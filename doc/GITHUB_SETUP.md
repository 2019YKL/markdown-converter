# GitHub 仓库设置指南

本文档将指导您如何将此项目上传到 GitHub 并配置"一键部署"功能。

## 1. 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录您的账户
2. 点击右上角的 "+" 图标，然后选择 "New repository"
3. 仓库名称填写 `markdown-converter`
4. 添加描述: `基于 Cloudflare Workers AI 构建的文档转换工具`
5. 选择公开仓库 (Public)
6. 不要初始化仓库（不勾选 "Add a README file"）
7. 点击 "Create repository"

## 2. 将本地代码推送到 GitHub

在终端中执行以下命令（将 `YOUR_USERNAME` 替换为您的 GitHub 用户名）：

```bash
# 将远程仓库添加为 origin
git remote add origin https://github.com/YOUR_USERNAME/markdown-converter.git

# 重命名主分支为 main（现代 GitHub 惯例）
git branch -M main

# 推送代码到远程仓库
git push -u origin main
```

## 3. 设置 GitHub Actions 密钥

为了让 GitHub Actions 工作流能够自动部署到 Cloudflare Workers，您需要设置以下密钥：

1. 在 Cloudflare 控制台获取 API 令牌
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - 点击 "Create Token"
   - 选择 "Edit Cloudflare Workers" 模板
   - 按指示完成创建

2. 复制您的 Cloudflare 账户 ID
   - 在 Cloudflare 控制台右侧可以找到

3. 在 GitHub 仓库中添加这些密钥
   - 转到您的 GitHub 仓库
   - 点击 "Settings" > "Secrets and variables" > "Actions"
   - 点击 "New repository secret"
   - 添加以下两个密钥：
     - 名称: `CF_API_TOKEN`，值: 您的 Cloudflare API 令牌
     - 名称: `CF_ACCOUNT_ID`，值: 您的 Cloudflare 账户 ID

## 4. 更新 README.md 中的一键部署按钮

编辑 README.md 文件，将一键部署按钮的 URL 中的 `YOUR_USERNAME` 替换为您的实际 GitHub 用户名：

```markdown
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOUR_USERNAME/markdown-converter)
```

## 5. 更新 package.json

编辑 package.json 文件，更新以下字段中的 `YOUR_USERNAME` 为您的 GitHub 用户名：

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/YOUR_USERNAME/markdown-converter.git"
},
"bugs": {
  "url": "https://github.com/YOUR_USERNAME/markdown-converter/issues"
},
"homepage": "https://github.com/YOUR_USERNAME/markdown-converter#readme",
```

## 6. 提交并推送更改

```bash
git add README.md package.json
git commit -m "更新GitHub用户名"
git push
```

## 7. 验证一键部署

1. 访问您的 GitHub 仓库页面
2. 查看 README.md 文件是否正确显示"Deploy to Cloudflare Workers"按钮
3. 点击该按钮测试部署流程

完成以上步骤后，任何人都可以通过点击您 README 中的按钮一键部署此应用程序到他们自己的 Cloudflare Workers 账户中。 