const sharp = require('sharp');
const path = require('node:path');

const outputPath = path.join(__dirname, 'icon.png');

// 粒子の波パターンを生成（細かく、風に揺れる感じ）
let particles = '';
const width = 256;
const height = 256;

// 細かい粒子を風に揺れるように配置
for (let y = 3; y < height - 3; y += 2.5) {
    for (let x = 3; x < width - 3; x += 2.5) {
        // 風の流れ（右から左へ、波打ちながら）
        const windFlow = Math.sin(y * 0.08 + x * 0.02) * 12;
        const turbulence = Math.sin(x * 0.15) * Math.cos(y * 0.12) * 8;
        const gust = Math.sin((x + y) * 0.06) * 6;

        // 粒子の揺れオフセット
        const offsetX = windFlow + turbulence * 0.5;
        const offsetY = gust + Math.sin(x * 0.1) * 4;

        const finalX = x + offsetX;
        const finalY = y + offsetY;

        // 範囲外チェック
        if (finalX < 0 || finalX > 256 || finalY < 0 || finalY > 256) continue;

        // 中心からの距離
        const dx = finalX - 128;
        const dy = finalY - 128;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 風の強さに基づく明るさの変化
        const windIntensity = (windFlow + 15) / 30;
        const baseBrightness = 80 + windIntensity * 120;

        // 中心に近いほど明るく、かつ揺らぎを加える
        const centerFade = 1 - (dist / 160);
        const flicker = 0.8 + Math.sin(x * 0.3 + y * 0.2) * 0.2;
        const finalBrightness = Math.floor(baseBrightness * Math.max(0.2, centerFade) * flicker);

        // サイズも風に応じて変化（さらに小さめ）
        const size = 0.3 + windIntensity * 0.9 + Math.random() * 0.2;

        // 透明度も変化させる
        const opacity = 0.4 + windIntensity * 0.5;

        const color = `rgb(${finalBrightness},${finalBrightness},${finalBrightness})`;

        particles += `<circle cx="${finalX.toFixed(1)}" cy="${finalY.toFixed(1)}" r="${size.toFixed(2)}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
    }
}

// 風の軌跡を追加（流れるライン）
let windLines = '';
for (let i = 0; i < 15; i++) {
    const startY = 30 + i * 15 + Math.sin(i) * 10;
    const startX = 10 + Math.sin(i * 0.5) * 20;

    // カーブするパス
    const cp1x = 80 + Math.sin(i) * 30;
    const cp1y = startY + Math.cos(i * 0.8) * 20;
    const cp2x = 180 + Math.cos(i) * 25;
    const cp2y = startY + Math.sin(i * 1.2) * 15;
    const endX = 250;
    const endY = startY + Math.sin(i * 0.7) * 25;

    const opacity = 0.1 + Math.sin(i * 0.5) * 0.05;
    const strokeWidth = 0.3 + Math.random() * 0.4;

    windLines += `<path d="M${startX},${startY} C${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}" fill="none" stroke="#888" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
}

const svg = `
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景 -->
  <rect width="256" height="256" fill="#030303"/>

  <!-- 風の軌跡 -->
  ${windLines}

  <!-- 粒子群 -->
  ${particles}

  <!-- 中央の淡いグロー -->
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="40%">
      <stop offset="0%" style="stop-color:#ffffff; stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#000000; stop-opacity:0"/>
    </radialGradient>
  </defs>
  <circle cx="128" cy="128" r="100" fill="url(#glow)"/>
</svg>
`;

sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath)
    .then(() => {
        console.log('風に揺れる粒子アイコンを作成しました:', outputPath);
    })
    .catch((err) => {
        console.error('エラー:', err);
    });
