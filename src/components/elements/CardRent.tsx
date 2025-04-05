import Link from "next/link";
import Image from "next/image";
import { Card } from "antd";
import { MdOutlineBathtub, MdOutlineLocationOn, MdOutlineDirectionsCar } from "react-icons/md";
import { LuBedDouble } from "react-icons/lu";
import { formatCurrency } from "@/utils/formatter";
import { Rent } from '@/common/types/response';

interface CardRentProps {
  data: Rent;
}

export default function CardRent({ data }: CardRentProps) {
  return (
    <Link href={`/properties/${data.id}`} passHref>
      <Card
        hoverable
        cover={
          <div className="relative w-full">
            <Image
              alt={data.title}
              src={data.images[0]}
              priority
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-[350px] xl:h-[450px] object-cover rounded-t-2xl"
            />
            <span className="absolute top-4 right-4 px-3 py-1 border border-black text-black text-sm font-semibold uppercase rounded-md bg-white">
              {data.tag}
            </span>
          </div>
        }
        className="rounded-2xl overflow-hidden bg-white drop-shadow-sm cursor-pointer hover:scale-[1.01] transition-all duration-300"
      >
        <div className="px-4 py-4">
          <h1 className="text-2xl lg:text-3xl text-[#4B73FF] font-medium">
            {formatCurrency(data.price)}
          </h1>
          <h2 className="text-lg lg:text-xl font-semibold">{data.title}</h2>
          <p className="flex items-center gap-x-2 text-sm text-gray-500">
            <MdOutlineLocationOn /> {data.location}
          </p>
          <div className="flex justify-between mt-2 text-sm">
            <span className="flex items-center gap-x-2">
              <LuBedDouble /> {data.rooms.bed} Bed
            </span>
            <span className="flex items-center gap-x-2">
              <MdOutlineBathtub /> {data.rooms.bath} Bath
            </span>
            <span className="flex items-center gap-x-2">
              <MdOutlineDirectionsCar /> {data.rooms.parking} Parking
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
