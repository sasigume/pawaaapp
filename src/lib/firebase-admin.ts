import * as admin from 'firebase-admin'
import {EXTREMELYBIGENV} from './AWSPLEASEALLOWMETOUSEBIGGERENVVARIABLE/whataterriblewaytohideenvlol'

if (admin.apps.length == 0 && process.env.PART_OF_GCP_CREDENTIAL) {

  const sorryawsiwannauseenvanyway = process.env.PART_OF_GCP_CREDENTIAL
  const credential = JSON.parse(
    Buffer.from(
      sorryawsiwannauseenvanyway + EXTREMELYBIGENV,
      'base64'
    ).toString()
  )
  admin.initializeApp({
    credential: admin.credential.cert(credential),
  })  
}