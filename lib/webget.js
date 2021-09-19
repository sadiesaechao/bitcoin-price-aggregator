const https = require('https')

const webget = (url) => new Promise((resolve, reject) => {
  const req = https.get(url, {}, (resp) => {
    const fail = (err) => {
      reject(err)
      resp.resume()
    }

    if (resp.statusCode !== 200) {
      return fail(new Error(`unexpected response status code ${resp.statusCode}`))
    }

    const contentType = resp.headers['content-type']
    if (!/^application\/json/.test(contentType)) {
      return fail(new Error(`invalid content type: ${contentType} - expected application/json`))
    }

    let responseBody = Buffer.alloc(0)
    resp.on('data', (data) => {
      responseBody = Buffer.concat([responseBody, data])
    })
    resp.on('end', () => {
      try {
        resolve(JSON.parse(responseBody.toString()))
      } catch (err) {
        reject(err)
      }
    })
  })

  req.on('error', (err) => reject(err))
})

module.exports = webget
