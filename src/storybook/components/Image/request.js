import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
var crypto = require('crypto')

// export const createContext = async (props, graphql) => {
//   const data = await graphql(`get fluid image`)
//   return {fluid: data.image.fluid}
// }

export const preprocessProps = async props => {
  const name = crypto.createHash(`md5`).update(props.src).digest(`hex`)
  const folder = path.resolve(__dirname, '../../../../images', name+'.jpg')
  const shouldDownload = !(await fileExists(folder))
  if(shouldDownload) await downloadFile(props.src, folder)
  return props
}


async function downloadFile (url, path) {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", (err) => {
      reject(err);
    });
    fileStream.on("finish", function() {
      resolve();
    });
  });
}

async function fileExists (path) {
  return new Promise(resolve => {
    fs.access(path, fs.F_OK, (err) => {
      if (err) resolve(false)
      else resolve(true)
    })
  })
}