import fs from 'fs';
import path from 'path';

const fileToPatch = path.join(process.cwd(), 'node_modules', '@expo', 'cli', 'build', 'src', 'start', 'server', 'metro', 'externals.js');

if (fs.existsSync(fileToPatch)) {
  let content = fs.readFileSync(fileToPatch, 'utf8');
  if (!content.includes('!x.includes(":")')) {
    content = content.replace(
      '!.test(x) && ![',
      '!.test(x) && !x.includes(":") && !['
    );
    fs.writeFileSync(fileToPatch, content, 'utf8');
    console.log('[CareFlow] Successfully patched @expo/cli Windows path colon bug.');
  }
}
