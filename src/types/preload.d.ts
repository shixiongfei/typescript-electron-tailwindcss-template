import { api } from "../renderer/preload";

declare global {
  interface Window {
    api: typeof api;
  }
}
