"use client";

import React, { useEffect } from "react";
import CardRent from "@/components/elements/CardRent";
import { MENU_RENT } from "@/common/mocks/rent";

const API_URL = "https://e16e-2401-4900-8387-6ea3-40f0-55e5-4768-855c.ngrok-free.app/properties";

// async function getProperties() {
//   const res = await fetch(API_URL, {
//     // Optional: If ngrok sometimes has caching issues
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch properties");
//   }

//   return res.json();
// }


export default  function Properties() {

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          "https://0b01-2401-4900-8387-6ea3-40f0-55e5-4768-855c.ngrok-free.app/properties",
          {
            headers: {
              Accept: "application/json",
            },
            cache: "no-store", // optional: disable Next.js caching
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched Properties:", data); // ✅ Log the data
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="w-full min-h-screen px-4 md:px-16 2xl:px-48 py-24">
      <h1 className="text-4xl font-semibold text-center mb-10">
        Browse All Properties
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10">
        {MENU_RENT.map((item, index) => (
          <CardRent key={index} data={item} />
        ))}
      </div>
    </section>
  );
}
