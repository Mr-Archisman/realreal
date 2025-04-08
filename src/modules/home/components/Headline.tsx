"use client"
import { MENU_ITEMS_HEADLINE } from "@/common/constant/menu";

import { Button, Form, Input, message as antMessage  } from "antd";
import { useRouter } from "next/navigation";
interface HeadlineProps {}

export default function Headline({}: HeadlineProps) {
  const onFinish = async (values: { name: string; phone: string; message: string ; email: string}) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      antMessage.success("Message sent successfully!");
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      antMessage.error(err.message || "Failed to send message.");
    }
  };
  const router = useRouter();

  const handleClick = () => {
    router.push("/#contact-us");
  };

  return (
    <section
      id="home"
      className="w-full h-auto bg-[#F4F7FC] px-4 lg:px-20 pt-8 pb-20"
    >
      <div className="h-[720px] rounded-2xl flex flex-col gap-y-4 md:gap-y-8 items-center relative image-headline">
        <h1 className="font-semibold text-2xl md:text-4xl lg:text-5xl xl:text-6xl flex flex-col items-center text-center mt-28">
          We Help You Fulfill<br /> Your Dreams 
        </h1>
        <p className="text-center text-[11px] md:text-base w-[260px] md:w-[360px] lg:w-[520px]">
         Seamless Buying, Selling & Renting—Let’s Turn Your Real Estate Goals into Reality!
        </p>
        <Button
        type='default'
        onClick={handleClick}
          aria-label="Get-Started"
          className="h-auto px-6 py-2 border border-black rounded-lg font-bold mt-10"
        >
          <p className="text-base lg:text-lg">Get Started</p>
        </Button>
        <div className="hidden lg:block absolute w-full -bottom-10 px-14 2xl:px-28">
      <div className="flex justify-between bg-white rounded-xl px-12 py-6">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="w-full flex justify-around gap-x-6"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
          className="w-full"
        >
          <Input className="rounded-xl py-3 px-4" placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern: /^\+?[0-9]{10,15}$/,
              message: "Please enter a valid phone number",
            },
          ]}
          className="w-full"
        >
          <Input className="rounded-xl py-3 px-4" placeholder="Enter your phone" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter your message" }]}
          className="w-full"
        >
          <Input.TextArea
            className="rounded-xl py-3 px-4"
            rows={1}
            placeholder="Write your message..."
          />
        </Form.Item>

        {/* <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
          className="w-full"
        >
          <Input className="rounded-xl py-3 px-4" placeholder="Enter your email (optional)" />
        </Form.Item> */}

        <Form.Item className="w-auto py-8">
          <Button
            type="default"
            htmlType="submit"
            aria-label="Contact Us"
            className="h-auto px-6 py-2 border border-black rounded-lg font-bold text-black hover:bg-white hover:border-blue-500"
          >
            Contact Us
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
      </div>
    </section>
  );
}
