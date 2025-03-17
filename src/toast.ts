export function toast(message: string, color: 'success' | 'warning' | 'danger' | 'primary', duration = 2000) {
  const toast = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = duration;
  toast.position = "top";
  toast.color = color;


  document.body.appendChild(toast);

  setTimeout(() => {
      toast.present();
  }, 10);

  // Remove toast after it disappears to prevent memory leaks
  toast.addEventListener('didDismiss', () => {
      toast.remove();
  });

  return toast;
}
