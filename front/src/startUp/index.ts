// すべてのモジュールのインポート
const modules = import.meta.glob("./*.ts", { eager: true })

// 各モジュールのコードを実行
for (const path in modules) {
    const module = modules[path] as { default?: () => void }
    module.default?.()
}
