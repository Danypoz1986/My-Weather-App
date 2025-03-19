require("dotenv").config();

const admin = require("firebase-admin");
const fs = require("fs");

// Load Firebase service account key
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function deleteAllUsers() {
  try {
    let totalDeleted = 0;

    async function deleteBatch() {
      const listUsersResult = await admin.auth().listUsers(1000); // Fetch up to 1000 users

      if (listUsersResult.users.length === 0) {
        console.log(`✅ All users deleted! Total: ${totalDeleted}`);
        return;
      }

      const userIds = listUsersResult.users.map(user => user.uid);
      await admin.auth().deleteUsers(userIds);
      totalDeleted += userIds.length;

      console.log(`🔥 Deleted ${userIds.length} users. Total so far: ${totalDeleted}`);

      // Recursive call to delete next batch
      deleteBatch();
    }

    deleteBatch();
  } catch (error) {
    console.error("❌ Error deleting users:", error);
  }
}

// Run the script
deleteAllUsers();
