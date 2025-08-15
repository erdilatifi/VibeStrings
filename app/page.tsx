"use client";

import { gql, useQuery } from "@apollo/client";
import { LoadingList, ErrorState, EmptyState } from "@/components/States";
import { Brand } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const BRANDS = gql`
  query FindAllBrands {
    findAllBrands {
      id
      name
      image
      origin
    }
  }
`;

export default function LandingPage() {
  const { data, loading, error } = useQuery<{ findAllBrands: Brand[] }>(BRANDS);

  if (loading) return <LoadingList />;
  if (error) return <ErrorState />;

  const brands = data?.findAllBrands ?? [];
  if (!brands.length) return <EmptyState />;

  return (
    <main className="min-h-screen w-full bg-white">
      <section className="relative w-full min-h-screen py-6 px-6 md:px-12 flex flex-col gap-6">
        <div className="self-start relative z-20">
          <a href="/">
            <img src="/logo.png" alt="logo" className="w-[100px] md:w-[130px]" />
          </a>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left relative z-20 mt-76 lg:mt-28 max-w-xl">
          <h1 className="font-bold text-4xl lg:text-[56px] leading-tight">
            Browse top quality <br />
            <span className="text-[#ff6428]">Guitars</span> online
          </h1>
          <p className="text-[#666666] text-sm md:text-base max-w-md">
            Explore 50k+ latest collections of branded guitars online with VibeStrings.
          </p>
        </div>

        <div className="absolute top-0 right-0 flex justify-center">
          <div className="relative">
            <img src="/heroImg.png" alt="hero image" className="w-[300px] lg:w-[570px]" />
            <img
              src="/circleHero.png"
              alt="decorative circle"
              className="absolute right-[40%] bottom-[-30px] w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full"
            />
          </div>
        </div>
      </section>

      <section className="py-16 max-w-[1400px] mx-auto flex flex-col items-center justify-center text-center">
        <div className="px-6 md:px-10 w-full">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#121212] mb-4">
              Featuring the <span className="text-[#ff6428]">Best Brands</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Select your preferred brand and explore our exquisite collection.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10 place-items-center">
              {brands.map((brand) => (
                <a
                  key={brand.id}
                  href={`/brand/${brand.id}`}
                  className="group relative p-4 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center mb-4">
                    {brand.image ? (
                      <img
                        src={brand.image}
                        alt={brand.name || "Brand logo"}
                        className="max-w-[100px] md:max-w-[150px] object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold text-gray-400">
                          {brand.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full min-h-[50vh] bg-[#121212] flex flex-col gap-7 py-10 px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Why try <span className="text-[#ff6428]">VibeStrings?</span>
          </h2>
        </div>
        <div className="max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto">
          {[
            { img: "/c1.png", title: "Smooth Browsing" },
            { img: "/c2.png", title: "Easy Delivery" },
            { img: "/c3.png", title: "Swift Payments" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-4 items-center text-center">
              <div className="w-[50px] h-[50px] rounded-xl bg-[#262626] flex items-center justify-center p-2">
                <img src={item.img} alt="" />
              </div>
              <h2 className="text-white">{item.title}</h2>
              <p className="text-sm text-[#999999]">
                Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full min-h-[70vh] flex items-center justify-center px-6 py-10">
        <div className="flex flex-col md:flex-row justify-evenly w-full max-w-[1400px] items-center gap-10">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl text-[#121212] mb-4 leading-snug">
              Browse and buy your <br />
              <span className="text-[#ff6428]">favorite guitars</span> with <br /> VibeStrings.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="flex gap-4 h-[54px] w-full sm:w-auto">
                <img src="/google.png" alt="" />
                <span className="text-left text-white text-base">
                  <span className="block text-xs">GET IT ON</span>
                  Google Play
                </span>
              </Button>
              <Button className="flex gap-4 h-[54px] w-full sm:w-auto">
                <img src="/apple.png" alt="" />
                <span className="text-left text-white text-base">
                  <span className="block text-xs">Download on the</span>
                  App Store
                </span>
              </Button>
            </div>
          </div>
          <img src="/guitar-web.png" alt="guitar website image" className="max-w-[300px] md:max-w-[500px]" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
