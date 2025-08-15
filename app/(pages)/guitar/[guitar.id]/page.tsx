"use client";

import { gql, useQuery } from "@apollo/client";
import { LoadingList, ErrorState, EmptyState } from "@/components/States";
import { use, useState } from "react";
import { Model, Musician } from "@/lib/types";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "@/components/Footer";

const MODEL = gql`
  query FindUniqueModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export default function GuitarPage({
  params,
}: {
  params: Promise<{ id?: string; "guitar.id"?: string }>;
}) {
  const [activeTab, setActiveTab] = useState<"specs" | "musicians">("specs");
  const [currentSlide, setCurrentSlide] = useState(0);

  const resolvedParams = use(params);
  const compoundId = resolvedParams["guitar.id"] ?? resolvedParams.id ?? "";
  const [brandId, modelId] = compoundId.includes("-")
    ? compoundId.split("-")
    : ["", ""];

  const { data, loading, error } = useQuery<{ findUniqueModel: Model }>(MODEL, {
    variables: { brandId, modelId },
    skip: !brandId || !modelId,
  });

  if (!brandId || !modelId) return <div className="text-center p-8">Brand or Model not found.</div>;
  if (loading) return <LoadingList count={1} />;
  if (error) return <ErrorState />;

  const model = data?.findUniqueModel;
  if (!model) return <EmptyState />;

  const musicians = model.musicians || [];

  const specsArray = model.specs
    ? Object.entries(model.specs).map(([k, v]) => ({
        key: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
        value: v || "N/A",
      }))
    : [];

  // Split musicians into slides of 2 per slide
  const slides: Musician[][] = [];
  for (let i = 0; i < musicians.length; i += 2) {
    slides.push(musicians.slice(i, i + 2));
  }

  return (
    <main className="space-y-5 relative">
      <a
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 text-[#121212] font-semibold hover:text-blue-600 transition-colors"
      >
        <FaArrowLeft /> Back to Home
      </a>

      <section className="relative w-full min-h-screen py-6 px-6 md:px-12 flex flex-col gap-6">
        <div className="self-start relative z-20 mt-5">
          <a href="/">
            <img src="/logo.png" alt="logo" className="w-[100px] md:w-[130px]" />
          </a>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left relative z-20 mt-60 lg:mt-28 max-w-xl">
          <h1 className="font-bold text-4xl lg:text-[56px] leading-tight text-[#121212] text-center">
            {model.name}
          </h1>
        </div>

        <div className="absolute top-0 right-0 flex justify-center">
          <div className="relative">
            <img
              src="/brand.png"
              alt="brand hero background"
              className="w-[300px] lg:w-[570px] object-contain"
            />
            <img
              src="/circleHero.png"
              alt="decorative circle"
              className="absolute right-[40%] bottom-[-30px] w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full"
            />
            {model?.image && (
              <img
                src={model.image}
                alt={model.name || "Guitar image"}
                className="absolute inset-0 m-auto w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[320px] lg:h-[320px] object-contain rotate-[-45deg] bg-transparent"
              />
            )}
          </div>
        </div>
      </section>

      <div className="w-full mt-6 px-4 md:px-12">
        <div className="flex border-b border-gray-200">
          <div
            className={`flex-1 text-center py-2 font-medium cursor-pointer ${
              activeTab === "specs"
                ? "border-b-4 border-orange-500 text-orange-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("specs")}
          >
            Specifications
          </div>
          <div
            className={`flex-1 text-center py-2 font-medium cursor-pointer ${
              activeTab === "musicians"
                ? "border-b-4 border-orange-500 text-orange-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("musicians")}
          >
            Who Plays It
          </div>
        </div>

        <div className="mt-4 py-15">
          {activeTab === "specs" && (
            <div className="space-y-6">
              {model.description && (
                <p className="text-center text-gray-600 px-4 md:px-0">{model.description}</p>
              )}
              <ul className="flex flex-col gap-2 px-4 md:px-0 items-start">
                {specsArray.map((spec) => (
                  <li key={spec.key} className="flex items-start gap-2">
                    <span className="inline-block w-2 h-2 mt-2 bg-black rounded-full flex-shrink-0"></span>
                    <span>
                      {spec.key}: {spec.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "musicians" && (
            <div className="flex flex-col items-center gap-4">
              {musicians.length === 0 ? (
                <div className="text-gray-500">No musicians found.</div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-4 flex-wrap justify-center">
                    {slides[currentSlide].map((m: Musician, i: number) => (
                      <div
                        key={`${m.name}-${i}`}
                        className="flex flex-col items-center gap-2 w-[180px] sm:w-[220px] lg:w-[300px] p-4 border border-[#EBECEF] bg-[#FFEFE8] rounded-lg"
                      >
                        {m.musicianImage && (
                          <img
                            src={m.musicianImage}
                            alt={m.name || "Musician"}
                            className="w-full h-40 sm:h-48 lg:h-60 object-cover rounded-md"
                          />
                        )}
                        <div className="font-medium text-center text-[#666666] mt-2">
                          {m.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dots */}
                  <div className="flex gap-2 mt-2">
                    {slides.map((_, idx) => (
                      <span
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                          currentSlide === idx ? "bg-orange-500" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
