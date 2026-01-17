const os = require('node:os');

console.log('=== OS情報 ===');
console.log('OS:', os.platform());          // darwin, win32, linux など
console.log('OSタイプ:', os.type());        // Darwin, Windows_NT, Linux
console.log('リリース:', os.release());     // OSバージョン
console.log('アーキテクチャ:', os.arch());  // x64, arm64 など

console.log('\n=== ユーザー情報 ===');
console.log('ホスト名:', os.hostname());
console.log('ユーザー名:', os.userInfo().username);
console.log('ホームディレクトリ:', os.homedir());
console.log('一時ディレクトリ:', os.tmpdir());

console.log('\n=== メモリ情報 ===');
const totalMem = os.totalmem();
const freeMem = os.freemem();
console.log('総メモリ:', (totalMem / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('空きメモリ:', (freeMem / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('使用率:', ((1 - freeMem / totalMem) * 100).toFixed(1), '%');

console.log('\n=== CPU情報 ===');
const cpus = os.cpus();
console.log('CPU:', cpus[0].model);
console.log('コア数:', cpus.length);
console.log('速度:', cpus[0].speed, 'MHz');

console.log('\n=== ネットワーク ===');
const nets = os.networkInterfaces();
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
            console.log(`${name}: ${net.address}`);
        }
    }
}

console.log('\n=== 稼働時間 ===');
const uptime = os.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
console.log(`システム稼働時間: ${hours}時間 ${minutes}分`);
