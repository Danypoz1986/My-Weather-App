import { getPlatforms } from '@ionic/react';

export function toast(
  message: string,
  color: 'success' | 'warning' | 'danger' | 'primary',
  duration = 2000
) {
  const toast = document.createElement('ion-toast');

  toast.message = message;
  toast.duration = duration;
  toast.position = "top";
  toast.color = color;

  // ✅ Dynamically set the mode based on platform
  const platforms = getPlatforms();
  if (platforms.includes("ios")) {
    toast.setAttribute("mode", "ios"); // iOS-style
  } else {
    toast.setAttribute("mode", "md"); // Android-style (Material Design)
  }

  toast.setAttribute("animated", "true"); // Enable animation
  toast.setAttribute("buttons", JSON.stringify([{ text: "OK", role: "cancel" }])); // Close button
  toast.setAttribute("style", "z-index: 9999;"); // Ensure it's visible above other elements

  document.body.appendChild(toast); // Append to body

  console.log("Toast Element:", toast); // Debugging

  setTimeout(async () => {
    console.log("Presenting toast...");
    try {
      await (toast as HTMLIonToastElement).present(); // ✅ Ensure `present()` is awaited
    } catch (error) {
      console.error("Toast failed to present:", error);
    }
  }, 100);

  toast.addEventListener("didDismiss", () => {
    console.log("Toast dismissed");
    toast.remove();
  });

  return toast;
}
