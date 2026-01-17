# Node.js 学習メモ

## 学んだこと

### ファイルの読み込み

```javascript
const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'test.txt');
const data = fs.readFileSync(filePath, 'utf8');
```

- `fs.readFileSync()` - ファイルを同期的に読み込む
- `'utf8'` - 日本語を正しく表示するためのエンコーディング指定

### パス操作

- `__dirname` - 現在のファイルがあるディレクトリの絶対パス
- `path.join()` - パスを安全に結合する

### 1行ずつ処理

```javascript
const lines = data.split('\n');
lines.forEach((line, index) => {
    console.log(`${index + 1}: ${line}`);
});
```

- `split('\n')` - 改行で文字列を分割して配列にする
- `forEach()` - 配列の各要素に対して関数を実行

### アロー関数

```javascript
// 従来の書き方
function(line, index) { ... }

// アロー関数（ES6）
(line, index) => { ... }
```

- `function` の代わりに `=>` を使うモダンな記法
