export async function toast(message: string, color: 'success' | 'warning' | 'danger' | 'primary', duration = 2000) {
  const toast = document.createElement('ion-toast') as HTMLIonToastElement;
  toast.message = message;
  toast.duration = duration;
  toast.position = "top";
  toast.color = color;
  toast.buttons = [{ text: 'OK', role: 'cancel' }];
  toast.style.zIndex = '9999'; // Ensure it appears above everything else

  document.body.appendChild(toast);  // ✅ Append to the body

  console.log("Toast Element Created:", toast); // ✅ Debugging log

  // ✅ Wait for the toast to be fully initialized before presenting
  try {
    await toast.present();  // ✅ Ensure `present()` is awaited
    console.log("Toast presented successfully.");
  } catch (error) {
    console.error("Toast failed to present:", error);
  }

  // ✅ Remove toast after dismissal to prevent memory leaks
  toast.addEventListener('didDismiss', () => {
    console.log("Toast dismissed.");
    toast.remove();
  });

  return toast;
}
