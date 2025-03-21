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
- 🔐 **密码保护**：通过密码验证机制控制访问权限，降低滥用风险和成本

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

### 快速部署指南

1. **登录 Cloudflare 控制台**
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/) 并登录您的账户

2. **创建新的 Worker**
   - 在左侧导航栏中，点击 "Workers & Pages"
   - 点击 "Create Application"
   - 选择 "Create Worker"
   - 输入 Worker 名称（如 "markdown-converter"）
   - 点击 "Create Worker" 按钮

3. **复制代码**
   - 在 Worker 编辑界面中，删除默认的代码
   - 复制并粘贴 `src/index.js` 中的代码到编辑器中

4. **配置 AI 绑定和环境变量**
   - 点击 "Settings" 选项卡，然后点击 "Variables"
   - 在 "AI Bindings" 区域，点击 "Add binding"
     - 名称输入 "AI"（必须大写）
   - 在 "Environment Variables" 区域，点击 "Add variable"
     - 名称输入 "APP_PASSWORD"
     - 值输入您想设置的密码（例如：`your_secure_password`）
   - 点击 "Save and Deploy"

5. **测试您的应用**
   - 部署成功后，访问 `https://[worker-name].[your-account].workers.dev`
   - 输入您设置的密码进行登录
   - 开始使用文档转换功能

### 方法一：一键部署（推荐）

只需点击上方的 "Deploy to Cloudflare Workers" 按钮，按照提示操作即可快速部署：

1. 点击按钮后，您将被重定向到 Cloudflare 的部署页面
2. 登录您的 Cloudflare 账户（如果尚未登录）
3. 确认部署设置，保持默认配置即可
4. 点击 "Deploy" 按钮
5. 等待部署完成，系统会自动为您配置 AI 绑定
6. 部署完成后，点击生成的链接即可访问您的应用
7. **重要**：部署后，记得设置 APP_PASSWORD 环境变量来启用密码保护

> 注意：一键部署需要您授权 Cloudflare 访问 GitHub 仓库。

### 方法二：使用 Wrangler 命令行工具

如果您偏好使用命令行工具：

1. **安装 Wrangler CLI**：
```bash
npm install -g wrangler
```

2. **登录到 Cloudflare**：
```bash
wrangler login
```

3. **创建项目目录**：
```bash
mkdir markdown-converter
cd markdown-converter
```

4. **创建 wrangler.toml 配置文件**：
```toml
name = "markdown-converter"
main = "src/index.js"
compatibility_date = "2023-10-30"

[ai]
binding = "AI"

[vars]
APP_PASSWORD = "your_secure_password"  # 设置访问密码
```

5. **创建 src 目录并添加 index.js 文件**
```bash
mkdir src
# 将 index.js 代码复制到该文件中
```

6. **部署 Worker**：
```bash
wrangler deploy
```

## 使用方法

1. 访问应用 URL
2. 输入访问密码登录
3. 点击"选择文件"按钮或直接拖拽文件到上传区域
4. 选择一个或多个支持的文档文件
5. 点击"开始转换"按钮
6. 等待转换完成，查看生成的 Markdown 内容
7. 可以选择复制 Markdown 文本或下载为 .md 文件

## 密码保护功能

为了防止服务被滥用并控制成本，应用集成了密码保护功能：

- 访问应用时需要输入正确的密码才能使用转换功能
- 密码通过 Cloudflare 环境变量 `APP_PASSWORD` 进行设置
- 登录成功后会创建一个有效期为24小时的会话令牌
- 会话过期后需要重新登录

修改密码：
1. 在 Cloudflare Dashboard 中，进入 Workers 部分
2. 选择您的 Worker 应用
3. 点击 "Settings" 选项卡，然后点击 "Variables"
4. 在 "Environment Variables" 中修改 `APP_PASSWORD` 的值
5. 点击 "Save and Deploy"

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
- 密码保护：请使用复杂密码以提高安全性，并定期更换密码

## 免费使用限制

- 默认情况下，Cloudflare Workers AI 提供每天 100,000 次免费调用
- 图像转换会使用两个 AI 模型，可能消耗更多额度
- 超出免费额度后，将按照 Cloudflare 的定价计费（每 1000 次请求 $0.0005）
- 使用密码保护功能可以有效控制使用量，避免额度被过快消耗

## 许可证

MIT 