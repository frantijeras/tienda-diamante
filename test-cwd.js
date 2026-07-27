const fs = require('fs');
const path = require('path');

console.log('cwd:', process.cwd());
console.log('__dirname:', __dirname);

const configFile = path.join(process.cwd(), 'config.production.json');
console.log('config path:', configFile);
console.log('exists:', fs.existsSync(configFile));

const configFile2 = path.join('/root/proyectos/tienda-diamante', 'config.production.json');
console.log('config path2:', configFile2);
console.log('exists2:', fs.existsSync(configFile2));
