import { Button } from "antd";
import Image from "next/image";

interface ContactProps {}

export default function Contact({}: ContactProps) {
  const logos = ["/bestech.png", "/aipl.png", "/birla.png", "/dlf.png" ,"/centralpark.png","/godrej.png", "/emaar.png","/m3m.png"];
  return (
    <section id="contact" className="w-full h-auto px-4 md:px-20 py-20">
      <div className="w-full hidden lg:flex justify-between mb-16">
      {logos.map((logo, index) => (
           <Image
           key={index}
           src={logo}
           alt={`logo-${index}`}
           priority
           width={120}
           height={80}
           className="w-[120px] xl:w-[200px] h-auto object-contain"
         />
        ))}
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-y-36 items-center justify-around">
        <div className="w-full lg:w-[460px] 2xl:w-[500px]">
          <h1 className="font-bold text-3xl lg:text-4xl 2xl:text-5xl mb-6">
            Navigating Your Real Estate Journey
          </h1>
          <p className="text-[12px] md:text-base lg:text-[14px] mb-8 lg:mb-16">
          At Tulip Prime Properties, we don’t just deal in properties—we build lasting relationships. With years of expertise in buying, selling, and renting properties, we are committed to making your real estate journey seamless and stress-free.
          </p>
          <Button
            type="primary"
            aria-label="Contact Us"
            className="h-auto bg-black rounded-xl py-4 px-12 text-white text-base font-medium"
          >
            Contact Us
          </Button>
        </div>
        <div className="relative">
          <Image
            src={"/images/image-2.jpg"}
            alt="image contact us"
            priority
            width="0"
            height="0"
            sizes="100vw"
            className="w-auto h-[480px] xl:h-[580px] object-cover rounded-3xl"
          />
          <div className="w-[180px] absolute z-[1] -top-14 left-24 bg-white rounded-xl px-8 py-4 drop-shadow block lg:hidden">
            <h1 className="text-4xl text-blue-600 font-black mb-2">22K+</h1>
            <p className="text-sm">Property ready to buy and sell</p>
          </div>
          <div className="w-[180px] absolute z-[1] bottom-16 xl:bottom-40 -left-24 bg-white rounded-xl px-8 py-4 drop-shadow hidden lg:block">
            <h1 className="text-4xl text-blue-600 font-black mb-2">22K+</h1>
            <p className="text-sm">Property ready to buy and sell</p>
          </div>
        </div>
      </div>
    </section>
  );
}
