import https from 'https';
import fs from 'fs';
https.get('https://raw.githubusercontent.com/trishapd/SVGcollection/refs/heads/main/voice_calendar_system_map_v2.svg', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => fs.writeFileSync('./system_map.svg', data));
});
