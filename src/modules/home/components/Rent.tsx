"use client";

import React, { useEffect, useState } from "react";
import CardRent from "@/components/elements/CardRent";
import Link from "next/link";
import { Button } from "antd";
import { Rent as RentType } from "@/common/types/response";

interface RentProps {}

export default function Rent({}: RentProps) {
  const [properties, setProperties] = useState<RentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();
        setProperties(data.slice(0, 6)); // 👈 Only show the first 6
      } catch (error: any) {
        console.error("Error fetching properties:", error);
        setError("Failed to load popular properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section
      id="rent"
      className="w-full min-h-screen bg-[#F4F7FC] px-4 md:px-16 2xl:px-48 py-24 flex flex-col items-center gap-y-16"
    >
      <div className="w-full flex flex-col items-center">
        <h1 className="font-medium text-3xl md:text-4xl xl:text-5xl text-center mb-10">
          Our Popular Properties
        </h1>
        <p className="text-[12px] md:text-[14px] xl:text-lg text-center lg:w-[760px] text-neutral-600">
          Our properties and services are backed by years of expertise, ensuring
          you find the best options for buying, selling, or renting. With a
          focus on transparency and integrity, we make every transaction
          seamless and successful.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10">
          {properties.map((item, index) => (
            <CardRent key={item.id || index} data={item} />
          ))}
        </div>
      )}

      <Link href="/properties" passHref>
        <Button
          type="primary"
          aria-label="explore property"
          className="h-auto px-8 py-3 font-medium text-base rounded-2xl bg-black text-white"
        >
          Explore All Property
        </Button>
      </Link>
    </section>
  );
}
