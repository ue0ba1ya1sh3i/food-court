// すべてのコードのインポート
const codes = import.meta.glob("./*.ts", { eager: true })

// 各コードの実行
for (const path in codes) {
    const code = codes[path] as { default?: () => void }
    code.default?.()
}
