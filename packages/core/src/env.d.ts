/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CORE_BASE_URL: string
  readonly VITE_APP_CORE_TARGET_ORIGIN: string
  readonly VITE_APP_APP_TARGET_ORIGIN: string
  /** @deprecated move value to config */
  readonly VITE_APP_RESOLVE_TIMEOUT: number
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
