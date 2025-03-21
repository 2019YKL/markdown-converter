# Markdown 文档转换工具

基于 Cloudflare Workers AI 构建的文档转换工具，能够将各种格式的文档高效转换为 Markdown 格式。

![CleanShot 2025-03-21 at 22 50 26@2x](https://github.com/user-attachments/assets/4e01dbb2-9f22-46e5-8cf7-b180c91b3c1b)


⬇️ 这里一键部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOUR_USERNAME/markdown-converter)

👉 **[演示站点: markdown.jkaihub.com](https://markdown.jkaihub.com)**

高频、感兴趣的朋友可以试试自建

## 功能特点

- 🚀 **多格式支持**：支持 PDF、图像、Office 文档、HTML 等多种格式的文档转换
- 💡 **智能转换**：使用 Cloudflare Workers AI 进行智能识别和处理
- 🖼️ **图像识别**：可以智能分析图像内容并生成相应的 Markdown 描述
- 📊 **美观界面**：简洁直观的用户界面，支持拖放上传
- 💾 **一键下载**：转换结果可直接下载或复制
- 🔎 **JSON 查看**：提供原始 JSON 数据查看功能
- 🔒 **速率限制**：内置防滥用保护机制，确保服务稳定可靠

## 支持的文档格式

| 格式类型 | 文件扩展名 |
|---------|----------|
| PDF 文档 | .pdf |
| 图像文件 | .jpeg, .jpg, .png, .webp, .svg |
| HTML 文档 | .html |
| XML 文档 | .xml |
| Office 文档 | .xlsx, .xlsm, .xlsb, .xls |
| OpenDocument | .ods |
| CSV 文件 | .csv |
| Apple 文档 | .numbers |

## 部署方法

### 方法一：一键部署（推荐）

只需点击上方的 "Deploy to Cloudflare Workers" 按钮，按照提示操作即可快速部署：

1. 点击按钮后，您将被重定向到 Cloudflare 的部署页面
2. 登录您的 Cloudflare 账户（如果尚未登录）
3. 确认部署设置，保持默认配置即可
4. 点击 "Deploy" 按钮
5. 等待部署完成，系统会自动为您配置 AI 绑定
6. 部署完成后，点击生成的链接即可访问您的应用

> 注意：一键部署需要您授权 Cloudflare 访问 GitHub 仓库。

### 方法二：手动部署

如果您希望手动部署，请按照以下步骤操作：

1. **登录 Cloudflare 控制台**

访问 [Cloudflare Dashboard](https://dash.cloudflare.com/) 并登录您的账户。

2. **创建新的 Worker**

- 在左侧导航栏中，点击 "Workers & Pages"
- 点击 "Create Application"
- 选择 "Create Worker"
- 输入 Worker 名称（如 "markdown-converter"）
- 点击 "Create Worker" 按钮

3. **上传 index.js 文件**

- 在 Worker 编辑界面中，删除默认的代码
- 上传或粘贴提供的 index.js 文件内容

4. **配置 AI 绑定**

- 在 Worker 编辑界面的 "Settings" 选项卡中，点击 "Variables"
- 在 "AI Bindings" 区域，点击 "Add binding"
- 名称输入 "AI"（必须大写）
- 点击 "Save and Deploy"

5. **测试您的应用**

部署成功后，您可以通过 `https://[worker-name].[your-account].workers.dev` 访问您的应用程序。

## 使用方法

1. 访问应用 URL
2. 点击"选择文件"按钮或直接拖拽文件到上传区域
3. 选择一个或多个支持的文档文件
4. 点击"开始转换"按钮
5. 等待转换完成，查看生成的 Markdown 内容
6. 可以选择复制 Markdown 文本或下载为 .md 文件

## 自定义速率限制 (防滥用)

应用内置了基于IP的速率限制功能，防止服务被滥用。默认设置为每个IP每小时最多10次请求。您可以根据需要调整此限制：

```javascript
// 在index.js文件开头找到并修改以下配置
const RATE_LIMIT = {
  maxRequests: 10,         // 每个IP每小时最多请求数（修改此值）
  windowMs: 60 * 60 * 1000,  // 时间窗口（1小时，可修改）
  ipCache: new Map()       // 存储IP及其请求次数
};
```

如果您的应用需要更高的请求频率，或者您希望完全禁用速率限制，可以相应地调整这些设置。对于私有部署，您可能希望将 `maxRequests` 设置为一个更高的值。

## 对开发者的说明

如果您想在本地开发或修改此项目：

1. 克隆仓库：
```bash
git clone https://github.com/YOUR_USERNAME/markdown-converter.git
cd markdown-converter
```

2. 安装 Wrangler CLI：
```bash
npm install -g wrangler
```

3. 本地开发：
```bash
wrangler dev
```

4. 部署更改：
```bash
wrangler deploy
```

## 注意事项

- 文件大小限制：根据 Cloudflare Workers 限制，请确保上传文件不超过 100MB
- 转换质量：不同类型文件的转换质量可能有所差异
- 速率限制：默认配置下每个IP地址每小时限制10次请求，可通过修改代码调整次数

## 免费使用限制

- 默认情况下，Cloudflare Workers AI 提供每天 100,000 次免费调用
- 图像转换会使用两个 AI 模型，可能消耗更多额度
- 超出免费额度后，将按照 Cloudflare 的定价计费（每 1000 次请求 $0.0005）

## 许可证

MIT 
