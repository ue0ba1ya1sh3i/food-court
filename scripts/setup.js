import figlet from "figlet"
import chalk from "chalk"
import prompts from "prompts"
import ora from "ora"
import fs from "fs"
import { execSync } from "child_process"

const run = (cmd, silent = true) => {
  try {
    // 同期的にコマンド実行して成功したならtrue返す
    execSync(cmd, { stdio: silent ? "ignore" : "inherit" })
    return true
  } catch {
    return false
  }
}

const completeLog = (message) => {
  console.log(`${chalk.green("✔")} ${message}`)
}

// Firebase CLIのインストール確認
function firebaseCLI() {
  const firebaseSpinner = ora("Checking Firebase CLI...").start()
  if (run("firebase --version")) {
    firebaseSpinner.succeed("Firebase CLI already installed!")
  } else {
    firebaseSpinner.text = "Installing Firebase CLI..."
    run("npm install -g firebase-tools")
    firebaseSpinner.succeed("Firebase CLI installed!")
  }
}

// Firebaseログイン確認
function firebaseLogin() {
  const loginSpinner = ora("Checking Firebase login...").start()
  if (run("firebase projects:list")) {
    loginSpinner.succeed("Already logged in to Firebase!")
  } else {
    loginSpinner.text = "Logging in to Firebase..."
    run("firebase login")
    loginSpinner.succeed("Firebase login completed!")
  }
}

// Functionsの依存関係のインストール
function installFunctionNpm() {
  const npmSpinner = ora("Installing Firebase Functions dependencies...").start()
  run("cd functions && npm install")
  npmSpinner.succeed("Dependencies installed!")
}

// envの設定
async function setEnv() {
  if (!fs.existsSync(".env")) {
    console.log(chalk.blue("Please enter the following environment variables"))
    console.log(chalk.blue("Please setup Sentry project at https://sentry.io"))

    const env = await prompts([
      { type: "text", name: "name", message: "Store name" },
      { type: "text", name: "description", message: "Description" },
      { type: "text", name: "allowDomain", message: "Allow domain" },

      // Firebase
      { type: "text", name: "apiKey", message: "Firebase API Key" },
      { type: "text", name: "authDomain", message: "Firebase Auth Domain" },
      { type: "text", name: "projectId", message: "Firebase Project ID" },
      { type: "text", name: "storageBucket", message: "Firebase Storage Bucket" },
      { type: "text", name: "senderId", message: "Firebase Messaging Sender ID" },
      { type: "text", name: "appId", message: "Firebase App ID" },
      { type: "text", name: "measurementId", message: "Firebase Measurement ID" },

      // Sentry
      { type: "text", name: "sentryDsn", message: "Sentry DSN" },
      { type: "text", name: "sentryOrg", message: "Sentry Org" },
      { type: "text", name: "sentryProject", message: "Sentry Project" },
    ])

    // .envファイルの作成
    const envLines = [
      `VITE_STORE_NAME=${env.name}`,
      `VITE_ALLOW_DOMAIN=${env.allowDomain}`,
      `DESCRIPTION=${env.description}`,
      ``,
      `# Firebase`,
      `VITE_FIREBASE_API_KEY=${env.apiKey}`,
      `VITE_FIREBASE_AUTH_DOMAIN=${env.authDomain}`,
      `VITE_FIREBASE_PROJECT_ID=${env.projectId}`,
      `VITE_FIREBASE_STORAGE_BUCKET=${env.storageBucket}`,
      `VITE_FIREBASE_MESSAGING_SENDER_ID=${env.senderId}`,
      `VITE_FIREBASE_APP_ID=${env.appId}`,
      `VITE_FIREBASE_MEASUREMENT_ID=${env.measurementId}`,
      ``,
      `# Sentry`,
      `VITE_SENTRY_DSN=${env.sentryDsn}`,
      `SENTRY_ORG=${env.sentryOrg}`,
      `SENTRY_PROJECT=${env.sentryProject}`,
    ]

    fs.writeFileSync(".env", envLines.join("\n"))

    completeLog(".env created")
  } else {
    completeLog(".env already exists (skipped)")
  }
}

async function setSentryEnv() {
  if (!fs.existsSync(".env.sentry-build-plugin")) {
    console.log(chalk.blue("Next, Please enter Sentry Auth Token for .env.sentry-build-plugin"))
    const { token } = await prompts({
      type: "password",
      name: "token",
      message: "Sentry Auth Token",
    })

    fs.writeFileSync(".env.sentry-build-plugin", `SENTRY_AUTH_TOKEN=${token}\n`)
    completeLog(".env.sentry-build-plugin created")
  } else {
    completeLog(".env.sentry-build-plugin already exists (skipped)")
  }
}

// .firebasercの設定
async function setFirebaseRC() {
  if (!fs.existsSync(".firebaserc")) {
    console.log(chalk.blue("Next, Please enter Firebase Project ID for .firebaserc"))
    const { projectId } = await prompts({
      type: "text",
      name: "projectId",
      message: "Firebase Project ID for .firebaserc",
    })

    fs.writeFileSync(".firebaserc", JSON.stringify({
        projects: { default: projectId } 
      }, null, 2
    ))

    completeLog(".firebaserc created")
  } else {
    completeLog(".firebaserc already exists (skipped)")
  }
}

// 実行
async function main() {
  // ロゴ
  console.log(
    chalk.yellow(
      figlet.textSync("FOOD COURT", { font: "ANSI Shadow" })
    )
  )

  console.log(chalk.blue("Let's set up the food-court project with me!"))

  // 必要なものがそろってるか
  firebaseCLI()
  firebaseLogin()
  installFunctionNpm()

  // 非同期で行う設定
  await setEnv()
  await setSentryEnv()
  await setFirebaseRC()

  completeLog("Setup completed!")
  console.log(chalk.blue("Run 'npm run dev' to start the development server."))
}

main()
