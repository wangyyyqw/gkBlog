import useFocusMode from "@/hooks/useFocusMode";
import useGlobal from "@/hooks/useGlobal";
import useShortcut from "@/hooks/useShortcut";
import useTheme from "@/hooks/useTheme";

function Shortcuts() {
  const { theme, setTheme } = useTheme();
  const { isQuickAccessOpen, setQuickAccessOpen } = useGlobal();
  const { focusMode, setFocusMode } = useFocusMode();

  // Update shortcuts to require Shift for uppercase letters
  useShortcut("KeyD", (event) => {
    if (event.shiftKey) {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  });

  useShortcut("KeyQ", (event) => {
    if (event.shiftKey) {
      setQuickAccessOpen(!isQuickAccessOpen);
    }
  });

  useShortcut("KeyF", (event) => {
    if (event.shiftKey) {
      setFocusMode(!focusMode);
    }
  });



  return null;
}

export default Shortcuts;
