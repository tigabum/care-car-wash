import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import path from "path";

const serviceAccount = require(path.join(
  __dirname,
  "../../../service-account-key.json"
));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

export const auth = admin.auth();
