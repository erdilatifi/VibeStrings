"use client";

import { gql, useQuery } from "@apollo/client";
import { useState, useEffect, useRef, use } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LoadingList, ErrorState, EmptyState } from "@/components/States";
import { Brand, Model, SortBy } from "@/lib/types";
import { FaFilter, FaArrowLeft } from "react-icons/fa";
import Footer from "@/components/Footer";

const BRAND_MODELS = gql`
  query FindBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      description
      price
    }
  }
`;

const BRAND = gql`
  query FindUniqueBrand($id: ID!) {
    findUniqueBrand(id: $id) {
      id
      name
      origin
      image
      categories
    }
  }
`;

export default function BrandModelsPage({
  params,
}: {
  params: Promise<{ id?: string; "brand.id"?: string }>;
}) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string | undefined>();
  const [sortBy] = useState<SortBy>({ field: "name", order: "ASC" });
  const [displayCount, setDisplayCount] = useState(6);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const resolvedParams = use(params);
  const brandId = resolvedParams["brand.id"] ?? resolvedParams.id ?? "";

  const { data: brandData, loading: brandLoading } = useQuery<{ findUniqueBrand: Brand }>(
    BRAND,
    { variables: { id: brandId } }
  );

  const { data, loading, error } = useQuery<{ findBrandModels: Model[] }>(BRAND_MODELS, {
    variables: { id: brandId, sortBy },
    skip: !brandId,
    notifyOnNetworkStatusChange: true,
  });

  const list = data?.findBrandModels ?? [];
  const brand = brandData?.findUniqueBrand;

  const availableTypes = [...new Set(list.map((m) => m.type).filter((t): t is string => Boolean(t)))];

  const filteredList = list.filter((m) => {
    const matchesSearch = !q || m.name?.toLowerCase().includes(q.toLowerCase());
    const matchesType = !type || m.type?.toLowerCase() === type.toLowerCase();
    return matchesSearch && matchesType;
  });

  const visibleList = filteredList.slice(0, displayCount);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < filteredList.length) {
          setDisplayCount((prev) => prev + 6);
        }
      },
      { threshold: 1 }
    );
    observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [displayCount, filteredList.length]);

  useEffect(() => setDisplayCount(6), [q, type]);

  return (
    <main className="min-h-screen bg-white">
      <a
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 text-[#121212] font-semibold hover:text-blue-600 transition-colors"
      >
        <FaArrowLeft /> Back to Home
      </a>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen py-6 px-6 md:px-12 flex flex-col gap-6">
        <div className="self-start relative z-20 mt-5">
          <a href={"/"}>
            <img src="/logo.png" alt="logo" className="w-[100px] md:w-[130px]" />
          </a>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left relative z-20 mt-50 lg:mt-28 max-w-xl">
          <h1 className="font-bold text-4xl lg:text-[56px] leading-tight text-[#121212]">
            Play like a <span className="text-[#ff6428]">Rock star</span>
          </h1>
          <p className="text-[#666666] text-center">
            With a legacy dating back to the 1950s, Ibanez blends expert craftsmanship
            with cutting-edge innovation to deliver guitars that inspire creativity
            and elevate your performance. Trusted by top artists worldwide, Ibanez
            guitars are built to play fast, sound bold, and stand out on any stage.
          </p>
        </div>

        <div className="absolute top-0 right-0 flex justify-center">
          <div className="relative">
            <img src="/brand.png" alt="brand hero background" className="w-[300px] lg:w-[570px] object-contain" />
            <img
              src="/circleHero.png"
              alt="decorative circle"
              className="absolute right-[40%] bottom-[-30px] w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full"
            />
            {brand?.image && (
              <img
                src={brand.image}
                alt={brand.name || "Brand logo"}
                className="absolute inset-0 m-auto w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[180px] lg:h-[180px] object-contain"
              />
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 relative z-20">
        <div className="container mx-auto px-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#121212] mb-4">
              Check out the <span className="text-[#ff6428]">Selection</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-end items-center w-full">
            <Select value={type ?? "all"} onValueChange={(v) => setType(v === "all" ? undefined : v)}>
              <SelectTrigger className="w-full lg:w-48 h-12">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <span className="text-[#666666] flex items-center gap-2">
                    <FaFilter /> Filter by type
                  </span>
                </SelectItem>
                {availableTypes.map((typeName) => (
                  <SelectItem key={typeName} value={typeName}>
                    {typeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Search models..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full lg:w-[300px]"
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 relative z-20">
        <div className="container mx-auto px-6">
          {(brandLoading || loading) && <LoadingList />}
          {error && <ErrorState />}

          {visibleList.length ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">Showing {visibleList.length} of {filteredList.length} models</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1400px] mx-auto">
                {visibleList.map((model) => (
                  <a
                    key={model.id}
                    href={`/guitar/${brandId}-${model.id}`}
                    className="flex flex-col items-center text-center w-full sm:w-[80%] lg:w-[70%] mx-auto"
                  >
                    {model.image && (
                      <img
                        src={model.image}
                        alt={model.name || "Guitar model"}
                        className="w-full h-auto object-contain rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
                      />
                    )}
                    <h3 className="text-lg font-semibold mb-1">{model.name}</h3>
                    {model.price && <span className="font-semibold text-blue-600">${model.price}</span>}
                  </a>
                ))}
              </div>

              <div ref={loaderRef} className="h-10 mt-4"></div>
            </>
          ) : !loading ? (
            <div className="text-center py-16">
              <EmptyState />
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}
