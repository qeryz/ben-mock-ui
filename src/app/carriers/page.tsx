"use client";

import { CarrierGrid } from "@/components/features/carrier-grid";
import { Loading } from "@/components/ui/loading";
import { useCarrierStore } from "@/stores/use-carriers";
import { useEffect } from "react";

export default function CarriersPage() {
  const { carriers, loading, fetchCarriers } = useCarrierStore();

  useEffect(() => {
    if (carriers.length === 0) {
      fetchCarriers();
    }
  }, [carriers.length, fetchCarriers]);

  if (loading) {
    return <Loading message="Loading carriers..." />;
  }

  return <CarrierGrid />;
}
