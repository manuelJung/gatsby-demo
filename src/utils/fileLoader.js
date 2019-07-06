import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const imageFolder = path.resolve(__dirname, '../../images')

export const downloadFile = async url => {
  const folder = getFilePath(url)
  const shouldDownload = !(await fileExists(folder))
  if(shouldDownload) await download(url, folder)
  return folder
}

export const getFilePath = url => {
  const postfix = 'jpg'//url.split('.').pop() || 'txt'
  const name = crypto.createHash(`md5`).update(url).digest(`hex`)
  const folder = path.resolve(imageFolder, `${name}.${postfix}`)
  return folder
}

async function download (url, path) {
  const res = await fetch(url)
  const fileStream = fs.createWriteStream(path)
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream)
    res.body.on("error", err => reject(err))
    fileStream.on("finish", () => resolve())
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