/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CORE_BASE_URL: string
  readonly VITE_APP_CORE_TARGET_ORIGIN: string
  readonly VITE_APP_APP_TARGET_ORIGIN: string
  readonly VITE_APP_CORE_PORT: string
  readonly VITE_APP_APP_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace NodeJS {
  type ProcessEnv = ImportMetaEnv;
}
