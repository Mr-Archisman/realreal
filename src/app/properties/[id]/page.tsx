import { notFound } from "next/navigation";
import Image from "next/image";
import { Button, Card, Carousel, Tag } from "antd";
import {
  MdOutlineBathtub,
  MdOutlineLocationOn,
  MdOutlineDirectionsCar,
} from "react-icons/md";
import { LuBedDouble } from "react-icons/lu";
import { GiResize } from "react-icons/gi";
import { formatCurrency } from "@/utils/formatter";
import { MENU_RENT } from "@/common/mocks/rent";

interface PropertyPageProps {
  params: { id: string };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = MENU_RENT.find((p) => p.id.toString() === params.id);

  if (!property) {
    return notFound();
  }

  return (
    <div className="min-h-screen px-4 md:px-16 2xl:px-48 py-24 bg-gray-50">
      <Card className="p-6 rounded-lg shadow-md bg-white">
        {/* Title & Location */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-[#4B73FF]">{property.title}</h1>
          <p className="text-lg text-gray-500 flex items-center gap-x-2 mt-2">
            <MdOutlineLocationOn className="text-xl" /> {property.location}
          </p>
          <div className='mt-4'>
              <Tag color={getTagColor(property.tag)} className="capitalize">
                {property.tag}
              </Tag>
            </div>
        </div>

        {/* Image Carousel */}
        <Carousel
          autoplay
          autoplaySpeed={1000}
          arrows
          dots
          className="rounded-lg overflow-hidden"
        >
          {property.images.map((img, index) => (
            <div key={index}>
              <Image
                src={img}
                alt={`${property.title} image ${index + 1}`}
                priority
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[450px] object-cover rounded-lg"
              />
            </div>
          ))}
        </Carousel>

        {/* Main Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-lg">
          <div className="space-y-3">
            <div className="flex items-center gap-x-2">
              <LuBedDouble className="text-xl text-blue-500" />
              <span>{property.rooms.bed} Bedrooms</span>
            </div>
            <div className="flex items-center gap-x-2">
              <MdOutlineBathtub className="text-xl text-blue-500" />
              <span>{property.rooms.bath} Bathrooms</span>
            </div>
            <div className="flex items-center gap-x-2">
              <MdOutlineDirectionsCar className="text-xl text-blue-500" />
              <span>{property.rooms.parking} Parking Spots</span>
            </div>
            {property.area && (
              <div className="flex items-center gap-x-2">
                <GiResize className="text-xl text-blue-500" />
                <span>{property.area} sq ft</span>
              </div>
            )}
          </div>

          {/* Tags & Meta Info */}
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-600">Type:</span>{" "}
              {property.property_type || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Status:</span>{" "}
              {property.status || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Latitude:</span>{" "}
              {property.latitude ?? "N/A"}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Longitude:</span>{" "}
              {property.longitude ?? "N/A"}
            </div>
            {/* <div>
              <Tag color={getTagColor(property.tag)} className="capitalize">
                {property.tag}
              </Tag>
            </div> */}
          </div>
        </div>

        {/* Description */}
        {property.description && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Property Description</h3>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
          <h2 className="text-3xl font-bold text-green-600">
            {formatCurrency(property.price)}
          </h2>
          <Button type="default" size="large">
            Contact Agent
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Helper: Tag color logic
function getTagColor(tag: "buy" | "sell" | "rent") {
  switch (tag) {
    case "buy":
      return "green";
    case "sell":
      return "red";
    case "rent":
      return "blue";
    default:
      return "gray";
  }
}
