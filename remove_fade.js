const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.startsWith('blog-') && f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/ fade-up/g, '');
  content = content.replace(/class="fade-up"/g, 'class=""');
  fs.writeFileSync(file, content);
}
