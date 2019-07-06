

export default async function toBase64 (url, size=16) {
  try {
    const img = await require('node-fetch')(url).then(res => res.buffer())
    const resizedImageBuf = await require('sharp')(img)
      .resize(undefined, size)
      .toBuffer()
    
    return `data:image/png;base64,${resizedImageBuf.toString('base64')}`
  }
  catch(e){
    console.log(`ERROR (toBase64): could not convert url (${url})`, e)
    return null
  }
}