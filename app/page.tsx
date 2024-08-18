"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import PlantCard from "@/components/PlantCard";
import Header from "@/components/Header";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const App: React.FC = () => {
  const [plantData, setPlantData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlantData = async () => {
      const { data, error } = await supabase.from("plants").select("*");

      if (error) {
        console.error("Error fetching plant data:", error);
      } else {
        setPlantData(data); // Set the entire array of data
      }
    };

    fetchPlantData();
  }, []);

  if (plantData.length === 0) {
    return (
      <div className="h-screen flex-col justify-center align-items p-8">
        <div role="alert" className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Waiting for data to load from database :P</span>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header></Header>
    <div className="container mx-auto mt-4 p-4">
      {plantData.map((plant, index) => (
        <PlantCard
          key={index} // Use a unique key for each element
          shelfNumber={plant.shelfNumber}
          plantMaterialName={plant.plantMaterialName}
          // image1={plant.image1}
          // image2={plant.image2}
          class={plant.class}
          order={plant.order}
          family={plant.family}
          commonNames={plant.commonNames}
          information={plant.note}
          timestamp={plant.created_at}
          toxic_bool={plant.is_toxic}
          toxic_note={plant.toxicNote}
          img_url = {plant.image_url}
        />
      ))}
    </div>
    </>
  );
};

export default App;
