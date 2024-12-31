import { auth } from "./config/firebase-admin";

async function makeAdmin(uid: string) {
  try {
    await auth.setCustomUserClaims(uid, { admin: true });
    console.log("Successfully set as admin!");

    // Verify the claim was set
    const user = await auth.getUser(uid);
    console.log("User claims:", user.customClaims);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Replace with your UID from Firebase Console
makeAdmin("e3JDQNAk9XUloEVSJoVwsjOfwxT2");
