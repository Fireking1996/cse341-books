
import fs from 'node:fs';
import swaggerSpec from './swagger.js';

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));

console.log('Swagger specification generated: swagger.json');
