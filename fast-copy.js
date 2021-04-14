const fsPromises = require('fs/promises');
const SRC = `${process.argv[2].startsWith('../') || process.argv[2].startsWith('./')  ? '' : './'}${process.argv[2]}`
const DEST = `${process.argv[3].startsWith('../') || process.argv[3].startsWith('./')  ? '' : process.argv[3].startsWith('.') ? './' : ''}${process.argv[3]}`

//check if command line is good
if (process.argv.length < 3 || process.argv.length > 5) {
  console.error('Veuillez ne mettre la source à copier et sa destination')
}

// will verify all the components and copy past it wether its a file or a directory
const copyPast = async (elem, src, dest) => {
  try {
    const response = await fsPromises.stat(`${src}/${elem}`)
    if (response.isFile() === true) {
      fsPromises.copyFile(`${src}/${elem}`, `${dest}/${elem}`)
    } else {
     await fsPromises.mkdir(`${dest}/${elem}`)
     dirCopy(`${src}/${elem}`, `${dest}/${elem}`)
    }
  } catch (e) {
    throw e
  }
}


// main function 
const dirCopy = async (src, dest) => {
  try {
    const dir = await fsPromises.readdir(src);

    for (const elem of dir) {
      copyPast(elem, src, dest)
    }

  } catch (e) {
    console.error(e)
  }
}

dirCopy(SRC, DEST)