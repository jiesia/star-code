// eslint-disable-next-line spaced-comment
/// <reference types='vite/client' />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, init-declarations
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>;
  export default component;
}
