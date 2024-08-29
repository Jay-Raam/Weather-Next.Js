import React, { Suspense, lazy } from "react";

// Lazy load the HistoricalData component
const HistoricalData = lazy(() => import("@/components/HistoryData"));
import "@/app/styles/styles.css";

export default async function Search() {
  return (
    <section>
      <Suspense fallback={<div className="loader"></div>}>
        <HistoricalData />
      </Suspense>
    </section>
  );
}
