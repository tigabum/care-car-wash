import { auth } from "../src/config/firebase-admin";

async function setAdminClaim(email: string) {
  try {
    const user = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`Successfully set admin claim for ${email}`);
  } catch (error) {
    console.error("Error setting admin claim:", error);
  }
}

// Usage: Replace with your admin email
setAdminClaim("your-admin@wowcarwash.com");
