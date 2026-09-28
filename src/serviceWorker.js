// Preserve cleanup of any earlier CRA service worker for this app's base path.
export function unregister() {
  if (!("serviceWorker" in navigator)) return;
  const scope = new URL(import.meta.env.BASE_URL, window.location.href).href;
  navigator.serviceWorker
    .getRegistration(scope)
    .then(registration => {
      if (registration && registration.scope === scope)
        return registration.unregister();
    })
    .catch(error =>
      console.warn("Unable to clear the previous service worker", error)
    );
}
