/* global google */
import { useEffect } from "react";

export default function GoogleLoginButton({ onSuccess, onError, clientId }) {
  useEffect(() => {
    let cancelled = false;

    function render() {
      if (!window.google || !clientId) return;
      try {
        google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => onSuccess(response.credential),
        });
        const btn = document.getElementById("google-btn");
        if (btn) {
          google.accounts.id.renderButton(btn, { theme: "outline", size: "large", width: 240 });
        }
      } catch (e) {
        onError && onError(e);
      }
    }

    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (!cancelled) render();
      };
      script.onerror = (e) => onError && onError(e);
      document.head.appendChild(script);
      return () => {
        cancelled = true;
        document.head.removeChild(script);
      };
    } else {
      render();
    }
  }, [clientId, onSuccess, onError]);

  return <div id="google-btn" className="inline-block" />;
}
