import { useEffect, useState } from "react";

export const Header = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <header className="header">
      <h1>Expense Tracker</h1>

      <span>
        {online ? "Online" : "Offline"}
      </span>
    </header>
  );
};