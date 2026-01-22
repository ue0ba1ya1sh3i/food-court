import * as admin from "firebase-admin"
import { onCall, HttpsError } from "firebase-functions/v2/https"
import { logger } from "firebase-functions"
import { setGlobalOptions } from "firebase-functions/v2"

// オプション
setGlobalOptions({
  region: "asia-northeast2",
  maxInstances: 10
})

// 初期化
admin.initializeApp()
const firestore = admin.firestore()

export const setAdmin = onCall(async (request) => {
  logger.info('Function "setAdmin" called')
  const uid = request.auth?.uid

  // UIDがなかったら...てかそれやったらどうやって君来たん？
  if (!uid) {
    logger.warn("Not login access")
    throw new HttpsError("unauthenticated", "NOT_LOGIN")
  }

  // ドキュメントの取得
  const setAdminDoc = firestore.collection("admin").doc("setAdmin")
  const adminSetup = await setAdminDoc.get()

  // 既に設定されてたら...お前ハッカーやな！
  if (adminSetup.data()?.done === true) {
    // ?を使ってるが、ここに来る時点でuserは存在しているはずなので問題ない...はず！
    logger.warn("Admin role already set", { uid: adminSetup.data()?.uid })
    throw new HttpsError("failed-precondition", "ALREADY_SET");
  }

  // 管理者ロールの付与
  await admin.auth().setCustomUserClaims(uid, { role: "admin" })
  await setAdminDoc.set({ done: true, uid })

  // ログ出して終了
  logger.info("Admin role set", { uid })
  return { message: "SUCCESS" }
})
