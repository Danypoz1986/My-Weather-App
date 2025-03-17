export function toast(message: string, color: 'success' | 'warning' | 'danger' | 'primary', duration = 2000) {
  const toast = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = duration;
  toast.position = "top";
  toast.color = color;
  toast.style.display = 'block';

  document.body.appendChild(toast);  // ✅ Append to the body

  console.log("Toast Element:", toast);

  // ✅ Wait for a short delay before presenting
  setTimeout(() => {
    toast.present();  // ✅ Ensure it's displayed
  }, 10);

  // ✅ Remove toast after dismissal to prevent memory leaks
  toast.addEventListener('didDismiss', () => {
    toast.remove();
  });

  return toast;
}