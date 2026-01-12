// envを簡単・セキュアに使えるようにする
const storeName = import.meta.env.VITE_STORE_NAME

// 使用する環境変数がなければ注意じゃ！
if (!storeName) {
  console.warn("The environment variable is not set.")
}

export { storeName }
