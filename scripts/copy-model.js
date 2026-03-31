const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'models', 'tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf');
const destDir = path.join(__dirname, '..', 'apps', 'mobile', 'android', 'app', 'src', 'main', 'assets');
const dest = path.join(destDir, 'model.gguf');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('Created assets directory');
}

if (!fs.existsSync(dest)) {
  console.log('Copying model.gguf to Android assets...');
  fs.copyFileSync(src, dest);
  console.log('Done! model.gguf copied successfully');
} else {
  console.log('model.gguf already exists in assets');
}