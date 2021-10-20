const https = require('https')

const webget = (url, format = 'json') => new Promise((resolve, reject) => {
  const req = https.get(url, {}, (resp) => {
    const fail = (err) => {
      err.response = resp
      reject(err)
      resp.resume()
    }

    if (resp.statusCode !== 200) {
      return fail(new Error(`unexpected response status code ${resp.statusCode}`))
    }

    const contentType = resp.headers['content-type']
    if (format === 'json' && !/^application\/json/.test(contentType)) {
      return fail(new Error(`invalid content type: ${contentType} - expected application/json`))
    }

    let responseBody = Buffer.alloc(0)
    resp.on('data', (data) => {
      responseBody = Buffer.concat([responseBody, data])
    })
    resp.on('end', () => {
      if (format === 'binary') {
        return resolve(responseBody)
      }

      try {
        const body = responseBody.toString()
        resolve(format === 'json' ? JSON.parse(body) : body)
      } catch (err) {
        reject(err)
      }
    })
  })

  req.on('error', (err) => reject(err))
})

module.exports = webget
