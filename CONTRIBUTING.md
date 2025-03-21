# 贡献指南

感谢您考虑为 Markdown 文档转换工具项目做出贡献！以下是帮助您参与项目的指南。

## 开发环境设置

1. 克隆仓库：
```bash
git clone https://github.com/YOUR_USERNAME/markdown-converter.git
cd markdown-converter
```

2. 安装依赖：
```bash
npm install
```

3. 安装 Wrangler CLI（如果尚未安装）：
```bash
npm install -g wrangler
```

4. 运行开发服务器：
```bash
npm start
# 或
wrangler dev
```

## 提交更改

1. 创建一个新分支：
```bash
git checkout -b feature/your-feature-name
```

2. 进行更改并提交：
```bash
git add .
git commit -m "描述您的更改"
```

3. 推送到您的分支：
```bash
git push origin feature/your-feature-name
```

4. 创建一个 Pull Request

## 代码风格指南

- 使用 2 空格缩进
- 代码注释请使用中文，使文档保持一致性
- 确保您的代码在提交前已经过测试

## 报告问题

如果您发现问题或有改进建议，请在 GitHub 仓库的 Issues 部分提交。

## Cloudflare Workers AI 资源

- [Cloudflare Workers AI 文档](https://developers.cloudflare.com/workers-ai/)
- [toMarkdown API 文档](https://developers.cloudflare.com/workers-ai/models/tomarkdown/)

再次感谢您的贡献！ 