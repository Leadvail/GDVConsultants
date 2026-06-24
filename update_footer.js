const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/info@gdvconsultants\.com/g, 'info@GDVConsultants.UK');
  
  content = content.replace(/<div class="footer-contact-item">\s*(?:<svg[\s\S]*?<\/svg>\s*)?<a href="tel:[^>]+>.*?<\/a>\s*<\/div>/g, '');

  fs.writeFileSync(file, content);
  console.log('Updated', file);
}
