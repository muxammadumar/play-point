import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/store/auth";

export function useIdle(timeout = 30 * 60 * 1000) {
  const authStore = useAuthStore();
  const isIdle = ref(false);
  let timer: number | undefined;
  let isLocked = false;

  const resetTimer = () => {
    if (isLocked) {
      return;
    }

    isIdle.value = false;
    if (timer) clearTimeout(timer);

    timer = window.setTimeout(() => {
      if (!isLocked) {
        isIdle.value = true;
        isLocked = true;
        authStore.lockSection();
      }
    }, timeout);
  };

  const activityEvents = [
    "mousemove",
    "keydown",
    "click",
    "scroll",
    "touchstart",
    "mousedown",
    "keypress",
  ];

  let lastMouseMove = 0;
  const mouseMoveThrottle = 1000;

  const handleMouseMove = () => {
    const now = Date.now();
    if (now - lastMouseMove > mouseMoveThrottle) {
      lastMouseMove = now;
      resetTimer();
    }
  };

  const handleVisibilityChange = () => {
    if (!document.hidden && !isLocked) {
      resetTimer();
    } else if (document.hidden) {
    }
  };

  const cleanup = () => {
    activityEvents.forEach((event) => {
      if (event === "mousemove") {
        window.removeEventListener(event, handleMouseMove);
      } else {
        window.removeEventListener(event, resetTimer);
      }
    });
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    if (timer) clearTimeout(timer);
  };

  const startTracking = () => {
    activityEvents.forEach((event) => {
      if (event === "mousemove") {
        window.addEventListener(event, handleMouseMove, { passive: true });
      } else {
        window.addEventListener(event, resetTimer, { passive: true });
      }
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resetTimer();
  };

  const unlock = () => {
    isLocked = false;
    isIdle.value = false;
    resetTimer();
  };

  onMounted(() => {
    startTracking();
  });

  onUnmounted(() => {
    cleanup();
  });

  return { isIdle, resetTimer, unlock };
}
