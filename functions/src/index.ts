import { setGlobalOptions } from "firebase-functions"

// アクセス制限
setGlobalOptions({ maxInstances: 10 })
