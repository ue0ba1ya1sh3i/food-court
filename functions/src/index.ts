import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import { setGlobalOptions } from "firebase-functions"

// アクセス制限
setGlobalOptions({ maxInstances: 10 })

// Firebase初期化
admin.initializeApp()
const firestore = admin.firestore()

export const setAdmin = functions.https.onCall(async (context) => {
  const uid = context.auth?.uid

  // UIDがなければエラー
  if (!uid) {
    throw new functions.https.HttpsError("unauthenticated", "Not login")
  }

  const setRoleDoc = firestore.collection("admin").doc("setAdmin")
  const isRoleSetup = await setRoleDoc.get()

  // 既にdoneがtrueならエラー
  if (isRoleSetup.data()?.done === true && isRoleSetup.data()?.uid) {
    throw new functions.https.HttpsError(
      "permission-denied",
      `Admin already set with ${isRoleSetup.data()?.uid}`
    )
  }

  // 設定
  await admin.auth().setCustomUserClaims(uid, { role: true })
  await setRoleDoc.set({ done: true, uid })

  return { message: "Admin set successfully" }
})
