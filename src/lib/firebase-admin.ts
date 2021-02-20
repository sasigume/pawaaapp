import * as admin from 'firebase-admin'

if (admin.apps.length == 0 && process.env.GCP_CREDENTIAL) {
  const credential = JSON.parse(
    Buffer.from(
      process.env.GCP_CREDENTIAL,
      'base64'
    ).toString()
  )
  admin.initializeApp({
    credential: admin.credential.cert(credential),
  })

  
}