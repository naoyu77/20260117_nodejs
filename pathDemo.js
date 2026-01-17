const path = require('node:path');

console.log('=== パスの結合 ===');
console.log('path.join:', path.join('/users', 'it', 'documents', 'file.txt'));
// => /users/it/documents/file.txt
console.log('path.join (..あり):', path.join('/users/it', '..', 'other', 'file.txt'));
// => /users/other/file.txt

console.log('\n=== パスの解析 ===');
const filePath = '/Users/it/projects/app/src/index.js';
console.log('元のパス:', filePath);
// => /Users/it/projects/app/src/index.js
console.log('dirname (ディレクトリ):', path.dirname(filePath));
// => /Users/it/projects/app/src
console.log('basename (ファイル名):', path.basename(filePath));
// => index.js
console.log('basename (拡張子なし):', path.basename(filePath, '.js'));
// => index
console.log('extname (拡張子):', path.extname(filePath));
// => .js

console.log('\n=== path.parse (詳細分解) ===');
const parsed = path.parse(filePath);
console.log(parsed);
// => { root: '/', dir: '/Users/it/projects/app/src', base: 'index.js', ext: '.js', name: 'index' }

console.log('\n=== path.format (組み立て) ===');
const newPath = path.format({
    dir: '/Users/it/documents',
    name: 'report',
    ext: '.pdf'
});
console.log('組み立て:', newPath);
// => /Users/it/documents/report.pdf

console.log('\n=== 絶対パス・相対パス ===');
console.log('isAbsolute(/Users/it):', path.isAbsolute('/Users/it'));
// => true
console.log('isAbsolute(./src):', path.isAbsolute('./src'));
// => false

console.log('\n=== 相対パスの計算 ===');
const from = '/Users/it/projects/app';
const to = '/Users/it/documents/file.txt';
console.log('from:', from);
console.log('to:', to);
console.log('relative:', path.relative(from, to));
// => ../../documents/file.txt

console.log('\n=== 絶対パスに変換 ===');
console.log('resolve(./src):', path.resolve('./src'));
// => /Users/it/20260117_nodejs/src (カレントディレクトリ + ./src)
console.log('resolve(/tmp, ./file.txt):', path.resolve('/tmp', './file.txt'));
// => /tmp/file.txt

console.log('\n=== パスの正規化 ===');
console.log('normalize:', path.normalize('/users//it/../it/./documents'));
// => /users/it/documents

console.log('\n=== 区切り文字 ===');
console.log('sep (区切り文字):', path.sep);
// => / (macOS/Linux) または \ (Windows)
console.log('delimiter (PATH区切り):', path.delimiter);
// => : (macOS/Linux) または ; (Windows)
