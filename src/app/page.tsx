// import React from "react";
import WeatherPage from "@/components/WeatherForMonth";
import { fetchWeatherData } from "@/components/ui/fecthWeather";
import Image000001 from "@/components/image/m2.webp";
import Image000002 from "@/components/image/m3.jpeg";
import Image000003 from "@/components/image/m4.webp";
import Image000004 from "@/components/image/m5.jpeg";
import Image000005 from "@/components/image/m6.jpeg";
import Image000006 from "@/components/image/m7.jpeg";
import Image000007 from "@/components/image/m8.jpeg";
import Image from "next/image";

const london = "London";
const India = "India";
const Canada = "Canada";

export default async function Home() {
  const weather = await fetchWeatherData(london);
  const weatherIndia = await fetchWeatherData(India);
  const weatherCanada = await fetchWeatherData(Canada);

  return (
    <>
      <header className="flex justify-center items-center gap-4 flex-col h-[100vh]">
        <h1 className="text-xl md:text-5xl font-bold">
          Welcome to WeatherWise!
        </h1>
        <p>Your Ultimate Weather Companion</p>
      </header>

      <main className="weather">
        <section className="flex justify-center items-center gap-4 flex-col h-[100vh] max-w-[1200px] mx-auto my-0">
          <h1 className="text-xl md:text-5xl mb font-bold">Basic of Weather</h1>
          <p className="text-center">
            It encompasses a variety of phenomena, including temperature,
            humidity, precipitation, wind, and atmospheric pressure. These
            elements interact in complex ways to produce the diverse weather
            patterns we experience.
          </p>
          <p className="text-center">
            Weather is an ever-present, ever-changing aspect of our daily lives.
            From the crisp bite of a winter morning to the balmy embrace of a
            summer evening, our experiences are shaped significantly by the
            atmospheric conditions around us. Understanding weather patterns not
            only enriches our appreciation of the natural world but also helps
            us make informed decisions about our activities and preparations.
            And with the right tools, staying updated on current conditions has
            never been easier.
          </p>
        </section>

        <div className="image flex flex-col justify-center flex-wrap items-center max-w-[1300px] mx-auto my-0 mt-10 gap-5">
          <h1 className="text-xl md:text-5xl mb font-bold">
            Weather Collections
          </h1>
          <div className="image-collection flex justify-center flex-wrap items-center gap-5">
            <Image
              src={Image000001}
              alt="weatherlogo"
              width={300}
              height={200}
              quality={100}
              className="w-[300px] md:w-[400px] h-auto"
            />
            <Image
              src={Image000002}
              alt="weatherlogo"
              width={300}
              height={204}
              quality={100}
              className="w-[300px] md:w-[400px] h-auto"
            />
            <Image
              src={Image000003}
              alt="weatherlogo"
              width={300}
              height={200}
              quality={100}
              className="w-[300px] md:w-[400px] h-auto"
            />
            <Image
              src={Image000004}
              alt="weatherlogo"
              width={300}
              height={197}
              quality={100}
              className="w-[300px] md:w-[400px] h-auto"
            />
            <Image
              src={Image000007}
              alt="weatherlogo"
              width={300}
              height={450}
              quality={100}
              className="w-[300px] md:w-[400px] h-auto"
            />
            <Image
              src={Image000006}
              alt="weatherlogo"
              width={300}
              height={200}
              quality={100}
              className="w-[300px] md:w-[400px] h-auto"
            />
            <Image
              src={Image000005}
              alt="weatherlogo"
              width={300}
              height={200}
              quality={100}
              className="w-[300px] md:w-[400px] h-auto"
            />
          </div>
        </div>

        <section className="flex justify-center flex-col items-center gap-5 mt-10 h-auto md:h-[100vh]">
          <h1 className="text-xl md:text-5xl mb font-bold">Weather Report</h1>
          <div className="some-example flex justify-center items-center gap-5 flex-col md:flex-row">
            <WeatherPage weather={weather} />
            <WeatherPage weather={weatherIndia} />
            <WeatherPage weather={weatherCanada} />
          </div>
        </section>
      </main>
      <footer className="bg-[#facc15]">
        <div className="text-center py-4 text-black">
          <h1>
            <a
              href="https://jayasriraam.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jayasriraam
            </a>
          </h1>
          <p className="text-sm">&copy; 2024 All rights reserved.</p>
          <p>
            Powered by
            <a
              href="https://www.weatherapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Free Weather API"
            >
              WeatherAPI.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
