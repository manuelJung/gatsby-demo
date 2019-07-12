import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

let dirCheck = false


export default async function toBase64 (url, size=16) {
  if(!url) {
    console.log('(toBase64) src is undefined')
    return
  }

  if(!dirCheck){
    let dir = path.resolve(__dirname, '../../.base64')
    await new Promise(resolve => {
      fs.stat(dir, err => {
        if(err) fs.mkdir(dir, () => resolve())
        else resolve()
      })
    })
    dirCheck = true
  }

  const cacheName = crypto.createHash(`md5`).update(url).digest(`hex`)
  const cachePath = path.resolve(__dirname, '../../.base64',cacheName)



  const cache = await new Promise(resolve => {
    fs.readFile(cachePath, (err, data) => {
      if(err) resolve(null) // not found
      else resolve(data)
    })
  })

  if(cache) return cache


  try {
    const img = await require('node-fetch')(url).then(res => res.buffer())
    const resizedImageBuf = await require('sharp')(img)
      .resize(undefined, size)
      .toBuffer()

    const data = `data:image/png;base64,${resizedImageBuf.toString('base64')}`

    await new Promise(resolve => fs.writeFile(cachePath, data, () => resolve()))
    
    return data
  }
  catch(e){
    console.log(`ERROR (toBase64): ${url}`)
    return null
  }
}