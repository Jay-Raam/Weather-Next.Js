import React, { Suspense, lazy } from "react";

// Lazy load the HistoricalData component
const ContactForm = lazy(() => import("@/components/ui/Contact"));
import Image000001 from "@/components/image/m9.png";
import "@/app/styles/styles.css";
import Image from "next/image";

export default async function Contact() {
  return (
    <>
      <Suspense fallback={<div className="loader"></div>}>
        <div className="flex flex-col justify-center items-center gap-4 mt-10">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <div className="text-image flex flex-col lg:flex-row justify-center items-center gap-5">
            <Image
              className="w-[300px] h-auto md:w-[500px]"
              width={3000}
              height={3000}
              quality={100}
              src={Image000001}
              alt="contact"
            />
            <ContactForm />
          </div>
        </div>
      </Suspense>
    </>
  );
}
