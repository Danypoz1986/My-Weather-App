export {};

declare global {
  interface Window {
    toast: (message: string, color: 'success' | 'warning' | 'danger' | 'primary', duration?: number) => void;
  }
}
