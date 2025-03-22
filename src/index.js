// worker.js - Markdown 转换工具

// 语言定义
const LANGUAGES = {
  en: {
    title: "Document Converter - Markdown Conversion Tool",
    header: "Document Converter",
    description: "Convert various document formats to Markdown format, supporting PDF, images, Office documents and more",
    language: "English",
    login: {
      title: "Please enter access password",
      placeholder: "Enter password",
      button: "Log In",
      error: "Password incorrect, please try again",
      formatError: "Request format error",
      sessionExpired: "Session expired, please login again"
    },
    upload: {
      title: "Upload Files",
      description: "Click to upload or drag files here",
      button: "Select Files",
      startButton: "Start Conversion",
      processing: "Converting..."
    },
    fileList: {
      remove: "Remove"
    },
    status: {
      converting: "Converting files...",
      success: "Files converted successfully!",
      noFiles: "No files were successfully converted",
      unauthorized: "Unauthorized access, please login first"
    },
    results: {
      copy: "Copy Markdown",
      copied: "Copied",
      download: "Download Markdown"
    },
    formats: {
      title: "Supported Formats",
      pdf: "PDF Documents (.pdf)",
      images: "Images (.jpg, .jpeg, .png, .webp, .svg)",
      html: "HTML Documents (.html)",
      xml: "XML Documents (.xml)",
      office: "Office Documents (.xlsx, .xlsm, .xls)",
      openDoc: "OpenDocument (.ods)",
      csv: "CSV Files (.csv)",
      apple: "Apple Documents (.numbers)"
    },
    footer: {
      poweredBy: "Built on Cloudflare Workers AI | Using toMarkdown API",
      copyright: "© Viggo's ingenuity, designed by JK."
    },
    errors: {
      upload: "Please upload at least one file",
      conversion: "Conversion failed: ",
      rateLimit: "Request rate too high, please try again later",
      copy: "Copy failed, please try manually"
    },
    languageSelector: {
      selectLanguage: "Language"
    }
  },
  zh: {
    title: "文档转换器 - Markdown 转换工具",
    header: "文档转换器",
    description: "将各种格式的文档转换为 Markdown 格式，支持 PDF、图片、Office 文档等多种格式",
    language: "中文",
    login: {
      title: "请输入访问密码",
      placeholder: "请输入密码",
      button: "登录",
      error: "密码不正确，请重试",
      formatError: "请求格式错误",
      sessionExpired: "会话已过期，请重新登录"
    },
    upload: {
      title: "上传文件",
      description: "点击上传或拖拽文件到这里",
      button: "选择文件",
      startButton: "开始转换",
      processing: "转换中..."
    },
    fileList: {
      remove: "删除"
    },
    status: {
      converting: "正在转换文件...",
      success: "文件转换成功！",
      noFiles: "没有文件被成功转换",
      unauthorized: "未授权访问，请先登录"
    },
    results: {
      copy: "复制 Markdown",
      copied: "已复制",
      download: "下载 Markdown"
    },
    formats: {
      title: "支持的格式",
      pdf: "PDF 文档 (.pdf)",
      images: "图片 (.jpg, .jpeg, .png, .webp, .svg)",
      html: "HTML 文档 (.html)",
      xml: "XML 文档 (.xml)",
      office: "Office 文档 (.xlsx, .xlsm, .xlsb, .xls)",
      openDoc: "OpenDocument (.ods)",
      csv: "CSV 文件 (.csv)",
      apple: "Apple 文档 (.numbers)"
    },
    footer: {
      poweredBy: "基于 Cloudflare Workers AI 构建 | 使用 toMarkdown API",
      copyright: "© Viggo's ingenuity, designed by JK."
    },
    errors: {
      upload: "请上传至少一个文件",
      conversion: "转换失败: ",
      rateLimit: "请求频率过高，请稍后再试",
      copy: "复制失败，请手动复制"
    },
    languageSelector: {
      selectLanguage: "语言"
    }
  },
  jp: {
    title: "ドキュメントコンバーター - Markdown 変換ツール",
    header: "ドキュメントコンバーター",
    description: "さまざまな形式のドキュメントを Markdown 形式に効率的に変換、PDF、画像、Office文書などに対応",
    language: "日本語",
    login: {
      title: "アクセスパスワードを入力してください",
      placeholder: "パスワードを入力",
      button: "ログイン",
      error: "パスワードが正しくありません。再試行してください",
      formatError: "リクエスト形式エラー",
      sessionExpired: "セッションの有効期限が切れました。再度ログインしてください"
    },
    upload: {
      title: "ファイルをアップロード",
      description: "クリックしてアップロードまたはここにファイルをドラッグ",
      button: "ファイルを選択",
      startButton: "変換開始",
      processing: "変換中..."
    },
    fileList: {
      remove: "削除"
    },
    status: {
      converting: "ファイルを変換中...",
      success: "ファイルの変換に成功しました！",
      noFiles: "正常に変換されたファイルはありません",
      unauthorized: "未認証のアクセス、先にログインしてください"
    },
    results: {
      copy: "Markdownをコピー",
      copied: "コピー済み",
      download: "Markdownをダウンロード"
    },
    formats: {
      title: "サポートされる形式",
      pdf: "PDF文書 (.pdf)",
      images: "画像 (.jpg, .jpeg, .png, .webp, .svg)",
      html: "HTML文書 (.html)",
      xml: "XML文書 (.xml)",
      office: "Office文書 (.xlsx, .xlsm, .xlsb, .xls)",
      openDoc: "OpenDocument (.ods)",
      csv: "CSVファイル (.csv)",
      apple: "Apple文書 (.numbers)"
    },
    footer: {
      poweredBy: "Cloudflare Workers AI 搭載 | toMarkdown API 使用",
      copyright: "© Viggo's ingenuity, designed by JK."
    },
    errors: {
      upload: "少なくとも1つのファイルをアップロードしてください",
      conversion: "変換失敗: ",
      rateLimit: "リクエスト頻度が高すぎます。後でもう一度お試しください",
      copy: "コピーに失敗しました。手動でコピーしてください"
    },
    languageSelector: {
      selectLanguage: "言語"
    }
  }
};

// 速率限制配置
const RATE_LIMIT = {
  maxRequests: 10,         // 每个IP每小时最多请求数
  windowMs: 60 * 60 * 1000,  // 1小时时间窗口
  ipCache: new Map()       // 存储IP及其请求次数
};

// 会话存储
const SESSIONS = new Map();
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 会话有效期24小时

export default {
  async fetch(request, env) {
    // 获取客户端IP
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const now = Date.now();
    const url = new URL(request.url);
    
    // 处理登录请求
    if (url.pathname === '/verify-password' && request.method === 'POST') {
      try {
        const { password } = await request.json();
        const correctPassword = env.APP_PASSWORD || 'admin123'; // 默认密码，应该在Cloudflare设置环境变量
        
        if (password === correctPassword) {
          // 创建会话令牌
          const sessionToken = crypto.randomUUID();
          SESSIONS.set(sessionToken, {
            ip,
            expires: now + SESSION_DURATION
          });
          
          return new Response(JSON.stringify({ success: true, token: sessionToken }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          // 获取用户语言环境
          const lang = url.searchParams.get('lang') || 'zh';
          const texts = LANGUAGES[lang] || LANGUAGES.zh;
          
          return new Response(JSON.stringify({ success: false, error: texts.login.error }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (error) {
        // 获取用户语言环境
        const lang = url.searchParams.get('lang') || 'zh';
        const texts = LANGUAGES[lang] || LANGUAGES.zh;
        
        return new Response(JSON.stringify({ success: false, error: texts.login.formatError }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // 验证会话
    const validateSession = () => {
      const sessionToken = url.searchParams.get('token') || 
                          request.headers.get('X-Session-Token');
                          
      if (!sessionToken) return false;
      
      const session = SESSIONS.get(sessionToken);
      if (!session) return false;
      
      if (now > session.expires) {
        SESSIONS.delete(sessionToken);
        return false;
      }
      
      // 刷新会话
      session.expires = now + SESSION_DURATION;
      SESSIONS.set(sessionToken, session);
      
      return true;
    };
    
    // 首页 - 返回 HTML 界面
    if (url.pathname === '/' || url.pathname === '') {
      const lang = url.searchParams.get('lang') || 'zh';
      return new Response(generateHtmlContent(lang), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    // 实现速率限制和会话验证
    if (url.pathname === '/convert') {
      // 先验证会话
      if (!validateSession()) {
        // 获取用户语言环境
        const lang = url.searchParams.get('lang') || 'zh';
        const texts = LANGUAGES[lang] || LANGUAGES.zh;
        
        return new Response(JSON.stringify({ error: texts.status.unauthorized }), { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 然后检查速率限制
      let clientData = RATE_LIMIT.ipCache.get(ip) || { count: 0, resetTime: now + RATE_LIMIT.windowMs };
      
      // 重置过期的计数器
      if (now > clientData.resetTime) {
        clientData = { count: 0, resetTime: now + RATE_LIMIT.windowMs };
      }
      
      // 增加计数并检查限制
      clientData.count++;
      RATE_LIMIT.ipCache.set(ip, clientData);
      
      if (clientData.count > RATE_LIMIT.maxRequests) {
        // 获取用户语言环境
        const lang = url.searchParams.get('lang') || 'zh';
        const texts = LANGUAGES[lang] || LANGUAGES.zh;
        
        return new Response(JSON.stringify({ 
          error: texts.errors.rateLimit,
          limit: RATE_LIMIT.maxRequests,
          windowMs: RATE_LIMIT.windowMs,
          remainingTime: clientData.resetTime - now
        }), { 
          status: 429,
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((clientData.resetTime - now) / 1000) 
          }
        });
      }
    }
    
    // API 端点 - 处理文件转换
    if (url.pathname === '/convert') {
      try {
        // 获取用户语言环境
        const lang = url.searchParams.get('lang') || 'zh';
        const texts = LANGUAGES[lang] || LANGUAGES.zh;
        
        // 获取表单数据
        const formData = await request.formData();
        const files = formData.getAll('files');
        
        if (!files || files.length === 0) {
          return new Response(JSON.stringify({ error: texts.errors.upload }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // 准备转换请求
        const documents = files.map(file => ({
          name: file.name,
          blob: file
        }));

        // 调用 Workers AI 转换
        const results = await env.AI.toMarkdown(documents);
        
        return new Response(JSON.stringify(results), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        // 获取用户语言环境
        const lang = url.searchParams.get('lang') || 'zh';
        const texts = LANGUAGES[lang] || LANGUAGES.zh;
        
        console.error('转换错误:', error);
        return new Response(JSON.stringify({ error: `${texts.errors.conversion}${error.message}` }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // 其他所有路径返回 404
    return new Response('页面未找到', { status: 404 });
  }
};

// 根据语言生成HTML内容
function generateHtmlContent(lang) {
  const texts = LANGUAGES[lang] || LANGUAGES.zh;
  
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${texts.title}</title>
    <!-- 引入 Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            DEFAULT: '#f38020',
                            hover: '#f06000'
                        }
                    }
                }
            }
        }
    </script>
    <style>
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .animate-spin-custom {
            animation: spin 1s linear infinite;
        }
        .language-dropdown {
            position: relative;
            display: inline-block;
        }
        .language-dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            min-width: 160px;
            background-color: white;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
            z-index: 1;
            border-radius: 0.375rem;
            border: 1px solid #e5e7eb;
        }
        .language-dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            text-align: left;
        }
        .language-dropdown-content a:hover {
            background-color: #f9fafb;
        }
        .language-dropdown:hover .language-dropdown-content {
            display: block;
        }
        .language-dropdown-button {
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .language-dropdown-button:hover {
            border-color: #f38020;
        }
        .flag {
            margin-right: 0.5rem;
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800 font-sans leading-relaxed p-4">
    <div class="max-w-4xl mx-auto">
        <header class="text-center mb-10">
            <div class="flex justify-end mb-2">
                <div class="language-dropdown">
                    <button class="language-dropdown-button">
                        <span class="flag">${lang === 'en' ? '🇬🇧' : lang === 'zh' ? '🇨🇳' : '🇯🇵'}</span>
                        ${texts.language}
                        <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="language-dropdown-content">
                        <a href="?lang=en" class="flex items-center ${lang === 'en' ? 'text-primary font-medium' : ''}">
                            <span class="flag">🇬🇧</span> English
                        </a>
                        <a href="?lang=zh" class="flex items-center ${lang === 'zh' ? 'text-primary font-medium' : ''}">
                            <span class="flag">🇨🇳</span> 中文
                        </a>
                        <a href="?lang=jp" class="flex items-center ${lang === 'jp' ? 'text-primary font-medium' : ''}">
                            <span class="flag">🇯🇵</span> 日本語
                        </a>
                    </div>
                </div>
            </div>
            <h1 class="text-4xl text-primary mb-2 font-bold">${texts.header}</h1>
            <p class="text-gray-600 max-w-2xl mx-auto mb-5">${texts.description}</p>
        </header>
        
        <!-- 登录表单 -->
        <div id="loginForm" class="bg-white rounded-lg shadow-md p-6 mb-5">
            <h3 class="text-xl font-medium mb-4 text-center">${texts.login.title}</h3>
            <div class="mb-4">
                <input type="password" id="passwordInput" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="${texts.login.placeholder}">
                <p id="passwordError" class="text-red-500 mt-2 text-sm hidden">${texts.login.error}</p>
            </div>
            <button id="loginButton" class="w-full bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">${texts.login.button}</button>
        </div>
        
        <!-- 主应用内容 -->
        <div id="appContent" class="hidden">
            <div class="bg-white rounded-lg shadow-md p-6 mb-5">
                <div id="dropZone" class="border-2 border-dashed border-gray-300 rounded-md p-10 text-center cursor-pointer transition-all hover:border-primary hover:bg-primary/5 mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-16 h-16 fill-primary mx-auto mb-4">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                    </svg>
                    <h3 class="text-xl font-medium mb-2">${texts.upload.title}</h3>
                    <p class="text-gray-600 mb-4">${texts.upload.description}</p>
                    <button id="selectFiles" class="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">${texts.upload.button}</button>
                    <input type="file" id="fileInput" multiple class="hidden">
                </div>
                
                <div id="fileList" class="mb-5"></div>
                
                <div id="status" class="p-4 rounded-md mb-5 hidden"></div>
                
                <button id="convertButton" class="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>${texts.upload.startButton}</button>
            </div>
            
            <div id="resultContainer" class="bg-white rounded-lg shadow-md p-6 mb-5 hidden">
                <div class="flex border-b border-gray-300 mb-4">
                    <div class="tab px-5 py-2 cursor-pointer border-b-2 border-primary font-medium active" data-tab="markdown">Markdown</div>
                    <div class="tab px-5 py-2 cursor-pointer border-b-2 border-transparent" data-tab="json">JSON</div>
                </div>
                
                <div id="markdownResult" class="p-4 whitespace-pre-wrap max-h-[500px] overflow-y-auto bg-gray-50 rounded-md border border-gray-300 font-mono text-sm"></div>
                <div id="jsonResult" class="p-4 whitespace-pre-wrap max-h-[500px] overflow-y-auto bg-gray-50 rounded-md border border-gray-300 font-mono text-sm hidden"></div>
                
                <div class="flex justify-end gap-2 mt-4">
                    <button id="copyButton" class="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">${texts.results.copy}</button>
                    <button id="downloadButton" class="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">${texts.results.download}</button>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6 mb-5">
                <h3 class="text-lg font-medium mb-3">${texts.formats.title}</h3>
                <ul class="flex flex-wrap gap-2">
                    <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">${texts.formats.pdf}</li>
                    <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">${texts.formats.images}</li>
                    <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">${texts.formats.html}</li>
                    <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">${texts.formats.xml}</li>
                    <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">${texts.formats.office}</li>
                    <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">${texts.formats.openDoc}</li>
                    <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">${texts.formats.csv}</li>
                    <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">${texts.formats.apple}</li>
                </ul>
            </div>
        </div>
        
        <footer class="text-center text-gray-600 text-sm mt-10">
            <div class="flex justify-center items-center gap-3 mb-2">
                <a href="https://github.com/2019YKL/markdown-converter?tab=readme-ov-file" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
            </div>
            <p class="mb-2 text-gray-600">${texts.footer.poweredBy}</p>
            <p class="text-gray-500 text-xs">${texts.footer.copyright}</p>
        </footer>
    </div>
    
    <script>
        // 保存当前语言
        const currentLang = "${lang}";
        
        // 获取语言相关的文本
        const texts = ${JSON.stringify(texts)};
        
        // 获取DOM元素
        const loginForm = document.getElementById('loginForm');
        const passwordInput = document.getElementById('passwordInput');
        const passwordError = document.getElementById('passwordError');
        const loginButton = document.getElementById('loginButton');
        const appContent = document.getElementById('appContent');
        
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const selectFiles = document.getElementById('selectFiles');
        const fileList = document.getElementById('fileList');
        const convertButton = document.getElementById('convertButton');
        const status = document.getElementById('status');
        const resultContainer = document.getElementById('resultContainer');
        const markdownResult = document.getElementById('markdownResult');
        const jsonResult = document.getElementById('jsonResult');
        const copyButton = document.getElementById('copyButton');
        const downloadButton = document.getElementById('downloadButton');
        const tabs = document.querySelectorAll('.tab');
        
        // 存储会话令牌
        let sessionToken = localStorage.getItem('sessionToken');
        
        // 如果有会话令牌，尝试自动登录
        if (sessionToken) {
            loginForm.classList.add('hidden');
            appContent.classList.remove('hidden');
        }
        
        // 登录相关事件
        loginButton.addEventListener('click', async () => {
            const password = passwordInput.value.trim();
            
            if (!password) {
                passwordError.textContent = texts.login.error;
                passwordError.classList.remove('hidden');
                return;
            }
            
            try {
                loginButton.disabled = true;
                loginButton.textContent = '...';
                
                const response = await fetch(\`/verify-password?lang=\${currentLang}\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // 保存会话令牌
                    sessionToken = data.token;
                    localStorage.setItem('sessionToken', sessionToken);
                    
                    // 隐藏登录表单，显示应用内容
                    loginForm.classList.add('hidden');
                    appContent.classList.remove('hidden');
                } else {
                    passwordError.textContent = data.error || texts.login.error;
                    passwordError.classList.remove('hidden');
                }
            } catch (error) {
                passwordError.textContent = texts.login.error;
                passwordError.classList.remove('hidden');
                console.error('登录错误:', error);
            } finally {
                loginButton.disabled = false;
                loginButton.textContent = texts.login.button;
            }
        });
        
        // 按回车键登录
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                loginButton.click();
            }
        });
        
        // 存储选择的文件
        let selectedFiles = [];
        
        // 添加事件监听器
        selectFiles.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleFileSelect);
        convertButton.addEventListener('click', convertFiles);
        copyButton.addEventListener('click', copyMarkdown);
        downloadButton.addEventListener('click', downloadMarkdown);
        
        // 拖拽事件
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-primary', 'bg-primary/5');
        });
        
        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary', 'bg-primary/5');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary', 'bg-primary/5');
            
            if (e.dataTransfer.files.length > 0) {
                handleFiles(e.dataTransfer.files);
            }
        });
        
        // 标签切换
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                
                // 激活当前标签
                tabs.forEach(t => {
                    t.classList.remove('border-primary', 'font-medium');
                    t.classList.add('border-transparent');
                });
                tab.classList.remove('border-transparent');
                tab.classList.add('border-primary', 'font-medium');
                
                // 显示对应内容
                if (tabName === 'markdown') {
                    markdownResult.classList.remove('hidden');
                    jsonResult.classList.add('hidden');
                } else {
                    markdownResult.classList.add('hidden');
                    jsonResult.classList.remove('hidden');
                }
            });
        });
        
        // 处理文件选择
        function handleFileSelect(e) {
            handleFiles(e.target.files);
        }
        
        function handleFiles(files) {
            // 将 FileList 转换为数组
            const filesArray = Array.from(files);
            
            // 添加到已选文件列表
            selectedFiles = [...selectedFiles, ...filesArray];
            
            // 更新 UI
            updateFileList();
            
            // 启用转换按钮
            if (selectedFiles.length > 0) {
                convertButton.disabled = false;
            }
        }
        
        // 更新文件列表
        function updateFileList() {
            fileList.innerHTML = '';
            
            selectedFiles.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'flex justify-between items-center p-3 border-b border-gray-200';
                
                const fileInfo = document.createElement('div');
                fileInfo.innerHTML = \`
                    <div class="font-medium">\${file.name}</div>
                    <div class="text-gray-500 text-sm">\${formatFileSize(file.size)}</div>
                \`;
                
                const removeButton = document.createElement('button');
                removeButton.className = 'text-red-500 text-sm bg-transparent border-none cursor-pointer';
                removeButton.textContent = texts.fileList.remove;
                removeButton.addEventListener('click', () => {
                    selectedFiles.splice(index, 1);
                    updateFileList();
                    
                    if (selectedFiles.length === 0) {
                        convertButton.disabled = true;
                    }
                });
                
                fileItem.appendChild(fileInfo);
                fileItem.appendChild(removeButton);
                fileList.appendChild(fileItem);
            });
        }
        
        // 格式化文件大小
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 B';
            
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
        
        // 检查会话是否过期的辅助函数
        function handleSessionExpired() {
            localStorage.removeItem('sessionToken');
            sessionToken = null;
            loginForm.classList.remove('hidden');
            appContent.classList.add('hidden');
            passwordError.textContent = texts.login.sessionExpired;
            passwordError.classList.remove('hidden');
        }
        
        // 转换文件
        async function convertFiles() {
            if (selectedFiles.length === 0) return;
            
            // 显示加载状态
            showStatus(texts.status.converting, 'loading');
            convertButton.disabled = true;
            convertButton.innerHTML = '<svg class="animate-spin-custom inline-block w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> ' + texts.upload.processing;
            
            try {
                // 创建 FormData
                const formData = new FormData();
                
                // 添加所有文件
                selectedFiles.forEach(file => {
                    formData.append('files', file);
                });
                
                // 发送请求，包含认证令牌
                const response = await fetch(\`/convert?token=\${sessionToken}&lang=\${currentLang}\`, {
                    method: 'POST',
                    headers: {
                        'X-Session-Token': sessionToken
                    },
                    body: formData
                });
                
                // 处理会话过期
                if (response.status === 401) {
                    handleSessionExpired();
                    throw new Error(texts.login.sessionExpired);
                }
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || texts.errors.conversion);
                }
                
                // 解析响应
                const results = await response.json();
                
                if (results.length === 0) {
                    throw new Error(texts.status.noFiles);
                }
                
                // 显示结果
                showResults(results);
                
                // 显示成功消息
                showStatus(texts.status.success, 'success');
            } catch (error) {
                showStatus(\`${texts.errors.conversion}\${error.message}\`, 'error');
                console.error('转换错误:', error);
            } finally {
                // 恢复按钮状态
                convertButton.disabled = false;
                convertButton.innerHTML = texts.upload.startButton;
            }
        }
        
        // 显示状态消息
        function showStatus(message, type) {
            status.textContent = message;
            status.classList.remove('hidden', 'bg-green-50', 'text-green-700', 'bg-red-50', 'text-red-700');
            
            if (type === 'error') {
                status.classList.add('bg-red-50', 'text-red-700');
            } else if (type === 'success') {
                status.classList.add('bg-green-50', 'text-green-700');
            } else if (type === 'loading') {
                status.innerHTML = \`
                <svg class="animate-spin-custom inline-block w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                \${message}
                \`;
                status.classList.add('text-gray-700', 'bg-gray-50');
            }
        }
        
        // 显示结果
        function showResults(results) {
            // 准备 Markdown 内容
            let markdownContent = '';
            
            // 合并所有文档的 Markdown
            results.forEach(result => {
                markdownContent += \`## \${result.name}\\n\\n\${result.data}\\n\\n---\\n\\n\`;
            });
            
            // 显示 Markdown
            markdownResult.textContent = markdownContent;
            
            // 显示原始 JSON
            jsonResult.textContent = JSON.stringify(results, null, 2);
            
            // 显示结果容器
            resultContainer.classList.remove('hidden');
        }
        
        // 复制 Markdown
        function copyMarkdown() {
            const markdownText = markdownResult.textContent;
            
            navigator.clipboard.writeText(markdownText)
                .then(() => {
                    copyButton.textContent = texts.results.copied;
                    setTimeout(() => {
                        copyButton.textContent = texts.results.copy;
                    }, 2000);
                })
                .catch(err => {
                    console.error('复制失败:', err);
                    showStatus(texts.errors.copy, 'error');
                });
        }
        
        // 下载 Markdown
        function downloadMarkdown() {
            const markdownText = markdownResult.textContent;
            const blob = new Blob([markdownText], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'converted_documents.md';
            a.click();
            
            URL.revokeObjectURL(url);
        }
        
        // 语言下拉菜单
        document.addEventListener('DOMContentLoaded', function() {
            const dropdownButton = document.querySelector('.language-dropdown-button');
            const dropdownContent = document.querySelector('.language-dropdown-content');
            
            // 点击按钮切换下拉内容的显示状态
            dropdownButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });
            
            // 点击页面其他地方关闭下拉菜单
            document.addEventListener('click', function() {
                dropdownContent.style.display = 'none';
            });
            
            // 防止点击下拉内容时关闭
            dropdownContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    </script>
</body>
</html>`;
} 