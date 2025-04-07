"use client";

import React, { useEffect, useState } from "react";
import CardRent from "@/components/elements/CardRent";
import { Rent } from '@/common/types/response';

export default function Properties() {
  const [properties, setProperties] = useState<Rent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();

        // Assuming API gives 'url' as a stringified array, map it correctly
        
        setProperties(data);
      } catch (error: any) {
        console.error("Error fetching properties:", error);
        setError("Something went wrong while loading properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);
  console.log(properties)
  return (
    <section className="w-full min-h-screen px-4 md:px-16 2xl:px-48 py-24">
      <h1 className="text-4xl font-semibold text-center mb-10">
        Browse All Properties
      </h1>

      {loading && (
        <div className="text-center text-gray-500 text-lg">Loading properties...</div>
      )}

      {error && (
        <div className="text-center text-red-500 text-lg">{error}</div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div className="text-center text-gray-400 text-lg">No properties available at the moment.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10">
        {properties.map((item, index) => (
          <CardRent key={item.id || index} data={item} />
        ))}
      </div>
    </section>
  );
}
