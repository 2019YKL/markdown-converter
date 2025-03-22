# Markdown ドキュメントコンバーター

[🇬🇧 English](README.md) | [🇨🇳 中文](README_CN.md) | 🇯🇵 日本語

Cloudflare Workers AI を利用した、様々な形式のドキュメントを効率的に Markdown に変換できるツールです。

![CleanShot 2025-03-21 at 22 50 26@2x](https://github.com/user-attachments/assets/4e01dbb2-9f22-46e5-8cf7-b180c91b3c1b)

⬇️ ワンクリックデプロイ

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOUR_USERNAME/markdown-converter)

👉 **[デモサイト: markdown.jkaihub.com](https://markdown.jkaihub.com)**

頻繁に使用する場合は、自己ホスティングをお試しください ⬆️

## 機能

- 🚀 **マルチフォーマット対応**: PDF、画像、Office文書、HTMLなど多様な形式を変換
- 💡 **インテリジェント変換**: Cloudflare Workers AIによるスマートな認識と処理
- 🖼️ **画像認識**: 画像の内容をインテリジェントに分析し、適切なMarkdown記述を生成
- 📊 **美しいインターフェース**: クリーンで直感的なUI、ドラッグ＆ドロップに対応
- 💾 **ワンクリックダウンロード**: 変換結果を簡単にダウンロードまたはコピー
- 🔎 **JSONビューア**: デバッグや高度な用途のための生のJSONデータ表示
- 🔒 **レート制限**: 安定したサービスを確保するための不正使用防止機能
- 🔐 **パスワード保護**: パスワード認証によるアクセス制御メカニズム

## サポートするドキュメント形式

| 形式タイプ | ファイル拡張子 |
|-------------|----------------|
| PDF文書 | .pdf |
| 画像ファイル | .jpeg, .jpg, .png, .webp, .svg |
| HTML文書 | .html |
| XML文書 | .xml |
| Office文書 | .xlsx, .xlsm, .xlsb, .xls |
| OpenDocument | .ods |
| CSVファイル | .csv |
| Appleドキュメント | .numbers |

## デプロイ方法

### クイックデプロイガイド

1. **Cloudflareコンソールにログイン**
   - [Cloudflare Dashboard](https://dash.cloudflare.com/) にアクセスしてアカウントにログイン

2. **新しいWorkerを作成**
   - 左サイドバーで「Workers & Pages」をクリック
   - 「Create Application」をクリック
   - 「Create Worker」を選択
   - Workerの名前を入力（例: "markdown-converter"）
   - 「Create Worker」ボタンをクリック

3. **コードをコピー**
   - Worker エディタでデフォルトのコードを削除
   - `src/index.js` のコードをエディタにコピー＆ペースト

4. **AI バインディングと環境変数を設定**
   - 「Settings」タブをクリックし、「Variables」をクリック
   - 「AI Bindings」セクションで「Add binding」をクリック
     - 名前に "AI" と入力（大文字でなければなりません）
   - 「Environment Variables」セクションで「Add variable」をクリック
     - 名前に "APP_PASSWORD" と入力
     - 値に希望するパスワードを入力（例: `your_secure_password`）
   - 「Save and Deploy」をクリック

5. **アプリケーションをテスト**
   - デプロイ後、`https://[worker-name].[your-account].workers.dev` にアクセス
   - パスワードを入力してログイン
   - ドキュメント変換機能の使用を開始

### 方法1: ワンクリックデプロイ（推奨）

上記の「Deploy to Cloudflare Workers」ボタンをクリックして、プロンプトに従って操作するだけです：

1. ボタンをクリックすると、Cloudflareのデプロイページにリダイレクトされます
2. Cloudflareアカウントにログイン（まだログインしていない場合）
3. デプロイ設定を確認（デフォルト設定を維持）
4. 「Deploy」ボタンをクリック
5. デプロイが完了するまで待ちます。システムは自動的にAIバインディングを設定します
6. デプロイ後、生成されたリンクをクリックしてアプリケーションにアクセス
7. **重要**: デプロイ後、パスワード保護を有効にするためにAPP_PASSWORD環境変数を設定することを忘れないでください
![CleanShot 2025-03-21 at 23 03 06@2x](https://github.com/user-attachments/assets/cb6d2ffb-6c1b-4573-9555-22656cb4f569)

> 注意: ワンクリックデプロイでは、CloudflareがGitHubリポジトリにアクセスする許可が必要です。

### 方法2: Wrangler CLIの使用

コマンドラインを好む場合:

1. **Wrangler CLIをインストール**:
```bash
npm install -g wrangler
```

2. **Cloudflareにログイン**:
```bash
wrangler login
```

3. **プロジェクトディレクトリを作成**:
```bash
mkdir markdown-converter
cd markdown-converter
```

4. **wrangler.toml 設定ファイルを作成**:
```toml
name = "markdown-converter"
main = "src/index.js"
compatibility_date = "2023-10-30"

[ai]
binding = "AI"

[vars]
APP_PASSWORD = "your_secure_password"  # アクセスパスワードを設定
```

5. **srcディレクトリを作成し、index.jsファイルを追加**:
```bash
mkdir src
# index.jsコードをこのファイルにコピー
```

6. **Workerをデプロイ**:
```bash
wrangler deploy
```

## 使用方法

1. アプリケーションのURLにアクセス
2. アクセスパスワードを入力してログイン
3. 「ファイルを選択」ボタンをクリックするか、アップロードエリアにファイルをドラッグ＆ドロップ
4. サポートされているドキュメントファイルを1つ以上選択
5. 「変換開始」ボタンをクリック
6. 変換が完了するまで待ち、生成されたMarkdownコンテンツを表示
7. Markdownテキストをコピーするか、.mdファイルとしてダウンロード

## パスワード保護機能

サービスの不正使用を防止しコストを制御するため、アプリケーションにはパスワード保護が含まれています：

- 変換機能を使用するには正しいパスワードを入力する必要があります
- パスワードはCloudflare環境変数 `APP_PASSWORD` で設定されます
- ログイン成功後、24時間有効なセッショントークンが作成されます
- セッションの有効期限が切れると、再度ログインする必要があります

パスワードを変更するには：
1. Cloudflare Dashboardで、Workersセクションに移動
2. Workerアプリケーションを選択
3. 「Settings」タブをクリックし、「Variables」をクリック
4. 「Environment Variables」セクションで `APP_PASSWORD` の値を変更
5. 「Save and Deploy」をクリック

## レート制限のカスタマイズ（不正利用防止）

アプリケーションには不正使用を防止するためのIP基準のレート制限が組み込まれています。デフォルトでは、各IPは1時間あたり10リクエストに制限されています。必要に応じてこの制限を調整できます：

```javascript
// index.jsファイルの先頭で以下の設定を検索して変更
const RATE_LIMIT = {
  maxRequests: 10,         // IPごとの1時間あたりの最大リクエスト数（この値を変更）
  windowMs: 60 * 60 * 1000,  // 時間枠（1時間、変更可能）
  ipCache: new Map()       // IPとそのリクエスト数を保存
};
```

アプリケーションがより高いリクエスト頻度を必要とする場合、またはレート制限を完全に無効にしたい場合は、これらの設定を適宜調整できます。プライベートデプロイメントの場合は、`maxRequests` をより高い値に設定することをお勧めします。

## 開発者向け情報

ローカルで開発またはこのプロジェクトを変更したい場合：

1. リポジトリをクローン：
```bash
git clone https://github.com/YOUR_USERNAME/markdown-converter.git
cd markdown-converter
```

2. Wrangler CLIをインストール：
```bash
npm install -g wrangler
```

3. ローカル開発：
```bash
wrangler dev
```

4. 変更をデプロイ：
```bash
wrangler deploy
```

## 重要な注意事項

- ファイルサイズ制限：Cloudflare Workersの制限に従い、アップロードするファイルが100MBを超えないようにしてください
- 変換品質：ファイルの種類によって品質が異なる場合があります
- レート制限：デフォルトでは各IPアドレスは1時間あたり10リクエストに制限されています。コードを変更することで調整可能です
- パスワード保護：セキュリティ向上のために複雑なパスワードを使用し、定期的に変更してください

## 無料使用制限

- デフォルトでは、Cloudflare Workers AIは1日あたり100,000回の無料呼び出しを提供します
- 画像変換は2つのAIモデルを使用するため、より多くのクォータを消費する可能性があります
- 無料クォータを超えると、Cloudflareの価格設定（1000リクエストあたり$0.0005）に従って課金されます
- パスワード保護機能を使用すると、使用量を効果的に制御し、クォータの急速な消費を防ぐことができます

## ライセンス

MIT 