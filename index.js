const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'test.txt');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    lines.forEach((line, index) => {
        console.log(`${index + 1}: ${line}`);
    });
} catch (err) {
    console.error(err);
}