/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CORE_BASE_URL: string
  readonly VITE_APP_CORE_TARGET_ORIGIN: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
