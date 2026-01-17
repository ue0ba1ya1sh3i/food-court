import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import express from "express"
import { setGlobalOptions } from "firebase-functions"

// アクセス制限
setGlobalOptions({ maxInstances: 10 })

// Firebase初期化
admin.initializeApp()
const firestore = admin.firestore()

// Express初期化
const app = express()
app.use(express.json())

app.post("/setAdmin", async (req, res) => {
  const { uid } = req.body

  // UIDがなければ400
  if (!uid) {
    return res.status(400).json({ error: "UID is required" })
  }

  const setRoleDoc = firestore.collection("admin").doc("setAdmin")
  const isRoleSetup = await setRoleDoc.get()

  // 既にdoneがtrueなら403
  if (isRoleSetup.data()?.done === true && isRoleSetup.data()?.uid) {
    return res.status(403).json({ error: `Admin already set with ${isRoleSetup.data()?.uid}` })
  }

  try {
    // ロールの設定
    await admin.auth().setCustomUserClaims(uid, { admin: true })
    await setRoleDoc.set({ done: true, uid })

    // 完了のお知らせ
    return res.status(200).json({ message: "Admin set successfully" })
  } catch (error: unknown) {
    // Error型のならそれのメッセージを、それ以外なら今はとりあえず未確認エラーってことで～
    const message = error instanceof Error ? error.message : "Unknown error"
    return res.status(500).json({ error: message })
  }
})

export const api = functions.https.onRequest(app)
