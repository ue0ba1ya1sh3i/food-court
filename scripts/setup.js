import figlet from "figlet"
import chalk from "chalk"
import prompts from "prompts"
import ora from "ora"
import fs from "fs"
import { execSync } from "child_process"
import requireEnv from "../settings/reqireEnv.json" with { type: "json" }

const run = (cmd, error, silent = true) => {
  try {
    // 同期的にコマンド実行して成功したならtrue返す
    execSync(cmd, { stdio: silent ? "ignore" : "inherit" })
    return true
  } catch {
    if (!error) {
      return false
    } else {
      error.fail("An error has occurred")
      process.exit(1)
    }
  }
}

const completeLog = (message) => {
  console.log(`${chalk.green("✔")} ${message}`)
}

// Firebase CLIのインストール確認
function firebaseCLI() {
  const spinner = ora("Checking Firebase CLI...").start()
  if (run("firebase --version")) {
    spinner.succeed("Firebase CLI already installed!")
  } else {
    spinner.text = "Installing Firebase CLI..."
    spinner.render()
    run("npm install -g firebase-tools", spinner)
    spinner.succeed("Firebase CLI install completed!")
  }
}

// Firebaseログイン確認
function firebaseLogin() {
  const spinner = ora("Checking Firebase login...").start()
  if (run("firebase auth:print-access-token")) {
    spinner.succeed("Already logged in to Firebase!")
  } else {
    spinner.text = "Logging in to Firebase..."
    spinner.render()
    run("firebase login", spinner, false)
    spinner.succeed("Firebase login completed!")
  }
}

// Functionsの依存関係のインストール
function installFunctionNpm() {
  const spinner = ora("Installing Firebase Functions dependencies...").start()
  run("cd functions && npm install", spinner)
  spinner.succeed("Dependencies installed!")
}

// envの設定
async function setEnv() {
  if (!fs.existsSync(".env")) {
    console.log(chalk.blue("Please setup Sentry project at https://sentry.io"))
    console.log(chalk.blue("And please enter the following environment variables"))

    // promptsをJSONから生成
    const questions = requireEnv.map(e => ({
      type: "text",
      name: e.name,
      message: e.message,
    }))

    const answers = await prompts(questions)

    // .env を生成
    const envLines = requireEnv.map(e =>
      `${e.name}=${answers[e.name] ?? ""}`
    )

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
