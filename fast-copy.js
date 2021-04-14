const fsPromises = require('fs/promises');
/*if (process.argv.length !== 4) {
  console.error('Veuillez ne mettre la source à copier et sa destination')
}*/




const dirCopy = async (src) => {
  try {
  const dir = await fsPromises.readdir(`${src.startsWith('../') ? '' : './'}${src}`);
  
  for (const elem of dir) {
    fsPromises.copyFile(`./${src}/${elem}`, `./${elem}`)
  }
} catch (e) {
  console.error(e)
}}

dirCopy(process.argv[2])
