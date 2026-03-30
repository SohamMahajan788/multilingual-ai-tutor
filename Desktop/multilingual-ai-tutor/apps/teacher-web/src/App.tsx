import React, { useEffect, useState } from "react";

/**
 * Teacher dashboard shell with loading and error states for initial data fetch.
 */
export default function App(): React.ReactElement {
  const [phase, setPhase] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await new Promise<void>((resolve) => setTimeout(resolve, 300));
        if (!cancelled) {
          setPhase("ready");
        }
      } catch (e) {
        if (!cancelled) {
          setErrorMessage(e instanceof Error ? e.message : "unknown");
          setPhase("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (phase === "loading") {
    return (
      <main style={shell}>
        <p>Loading teacher console…</p>
      </main>
    );
  }

  if (phase === "error") {
    return (
      <main style={shell}>
        <h1>Could not load</h1>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </main>
    );
  }

  return (
    <main style={shell}>
      <h1>VidyaBot Teacher</h1>
      <p>Manage classes, assignments, and offline content bundles.</p>
    </main>
  );
}

const shell: React.CSSProperties = {
  fontFamily: "system-ui, sans-serif",
  padding: "2rem",
  maxWidth: 720,
  margin: "0 auto",
  lineHeight: 1.5,
};
