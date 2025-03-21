// worker.js - Markdown 转换工具
export default {
  async fetch(request, env) {
    // 处理不同的请求路径
    const url = new URL(request.url);
    
    // 首页 - 返回 HTML 界面
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(HTML_CONTENT, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    // API 端点 - 处理文件转换
    if (url.pathname === '/convert') {
      try {
        // 获取表单数据
        const formData = await request.formData();
        const files = formData.getAll('files');
        
        if (!files || files.length === 0) {
          return new Response(JSON.stringify({ error: '请上传至少一个文件' }), { 
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
        console.error('转换错误:', error);
        return new Response(JSON.stringify({ error: `转换失败: ${error.message}` }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // 其他所有路径返回 404
    return new Response('页面未找到', { status: 404 });
  }
};

// HTML 界面内容
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文档转换器 - Markdown 转换工具</title>
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
    </style>
</head>
<body class="bg-gray-100 text-gray-800 font-sans leading-relaxed p-4">
    <div class="max-w-4xl mx-auto">
        <header class="text-center mb-10">
            <h1 class="text-4xl text-primary mb-2 font-bold">文档转换器</h1>
            <p class="text-gray-600 max-w-2xl mx-auto mb-5">将各种格式的文档转换为 Markdown 格式，支持 PDF、图片、Office 文档等多种格式</p>
        </header>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-5">
            <div id="dropZone" class="border-2 border-dashed border-gray-300 rounded-md p-10 text-center cursor-pointer transition-all hover:border-primary hover:bg-primary/5 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-16 h-16 fill-primary mx-auto mb-4">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                </svg>
                <h3 class="text-xl font-medium mb-2">上传文件</h3>
                <p class="text-gray-600 mb-4">点击上传或拖拽文件到这里</p>
                <button id="selectFiles" class="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">选择文件</button>
                <input type="file" id="fileInput" multiple class="hidden">
            </div>
            
            <div id="fileList" class="mb-5"></div>
            
            <div id="status" class="p-4 rounded-md mb-5 hidden"></div>
            
            <button id="convertButton" class="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>开始转换</button>
        </div>
        
        <div id="resultContainer" class="bg-white rounded-lg shadow-md p-6 mb-5 hidden">
            <div class="flex border-b border-gray-300 mb-4">
                <div class="tab px-5 py-2 cursor-pointer border-b-2 border-primary font-medium active" data-tab="markdown">Markdown</div>
                <div class="tab px-5 py-2 cursor-pointer border-b-2 border-transparent" data-tab="json">原始 JSON</div>
            </div>
            
            <div id="markdownResult" class="p-4 whitespace-pre-wrap max-h-[500px] overflow-y-auto bg-gray-50 rounded-md border border-gray-300 font-mono text-sm"></div>
            <div id="jsonResult" class="p-4 whitespace-pre-wrap max-h-[500px] overflow-y-auto bg-gray-50 rounded-md border border-gray-300 font-mono text-sm hidden"></div>
            
            <div class="flex justify-end gap-2 mt-4">
                <button id="copyButton" class="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">复制 Markdown</button>
                <button id="downloadButton" class="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">下载 Markdown</button>
            </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-5">
            <h3 class="text-lg font-medium mb-3">支持的格式</h3>
            <ul class="flex flex-wrap gap-2">
                <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">PDF 文档 (.pdf)</li>
                <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">图片 (.jpg, .jpeg, .png, .webp, .svg)</li>
                <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">HTML 文档 (.html)</li>
                <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">XML 文档 (.xml)</li>
                <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">Office 文档 (.xlsx, .xlsm, .xls)</li>
                <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">OpenDocument (.ods)</li>
                <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">CSV 文件 (.csv)</li>
                <li class="bg-gray-100 px-3 py-1 rounded-full text-sm">Apple 文档 (.numbers)</li>
            </ul>
        </div>
        
        <footer class="text-center text-gray-600 text-sm mt-10">
            <p>基于 Cloudflare Workers AI 构建 | 使用 toMarkdown API</p>
        </footer>
    </div>
    
    <script>
        // 获取DOM元素
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
                removeButton.textContent = '删除';
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
        
        // 转换文件
        async function convertFiles() {
            if (selectedFiles.length === 0) return;
            
            // 显示加载状态
            showStatus('正在转换文件...', 'loading');
            convertButton.disabled = true;
            convertButton.innerHTML = '<svg class="animate-spin-custom inline-block w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 转换中...';
            
            try {
                // 创建 FormData
                const formData = new FormData();
                
                // 添加所有文件
                selectedFiles.forEach(file => {
                    formData.append('files', file);
                });
                
                // 发送请求
                const response = await fetch('/convert', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || '转换失败');
                }
                
                // 解析响应
                const results = await response.json();
                
                if (results.length === 0) {
                    throw new Error('没有文件被成功转换');
                }
                
                // 显示结果
                showResults(results);
                
                // 显示成功消息
                showStatus('文件转换成功！', 'success');
            } catch (error) {
                showStatus(\`错误：\${error.message}\`, 'error');
                console.error('转换错误:', error);
            } finally {
                // 恢复按钮状态
                convertButton.disabled = false;
                convertButton.innerHTML = '开始转换';
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
                    copyButton.textContent = '已复制';
                    setTimeout(() => {
                        copyButton.textContent = '复制 Markdown';
                    }, 2000);
                })
                .catch(err => {
                    console.error('复制失败:', err);
                    showStatus('复制失败，请手动复制', 'error');
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
    </script>
</body>
</html>`; 