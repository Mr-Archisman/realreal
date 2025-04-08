import { notFound } from "next/navigation";
import PropertyClientView from '@/modules/home/components/PropertyClientView';
import { Rent } from "@/common/types/response";

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`;
  const res = await fetch(`${baseUrl}/api/properties/${params.id}`, {
    cache: "no-store", // Or ISR if needed
  });

  if (!res.ok) return notFound();

  const property: Rent = await res.json();

  return <PropertyClientView property={property} />;
}
