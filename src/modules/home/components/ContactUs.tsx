"use client";

import { Button, Form, Input, message as antMessage } from "antd";

export default function ContactUs() {
  const onFinish = async (values: {
    name: string;
    email: string;
    message: string;
    phone: string;
  }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/contact`, {
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
      console.error("Contact form error:", err);
      antMessage.error(err.message || "Failed to send message.");
    }
  };

  return (
    <section id="contact-us" className="w-full bg-[#F4F7FC] px-4 md:px-16 2xl:px-48 py-20">
      <h2 className="text-center text-3xl md:text-4xl font-semibold mb-10">
        Get in Touch
      </h2>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Your name" className="py-3 px-4 rounded-lg" />
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
          >
            <Input placeholder="Your phone number" className="py-3 px-4 rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: false, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Your email" className="py-3 px-4 rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Your message..."
              className="py-3 px-4 rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="bg-black text-white font-bold  rounded-lg hover:bg-gray-800"
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
