"use client";

import React, { useEffect } from "react";
import CardRent from "@/components/elements/CardRent";
import { MENU_RENT } from "@/common/mocks/rent";



export default  function Properties() {

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        const data = await res.json();
        console.log("Fetched properties:", data);
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
