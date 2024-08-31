"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import PlantCard from "@/components/PlantCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import ItemGrid from "@/components/ItemGrid";
import  CTA from "@/components/CTA"

const App: React.FC = () => {
  

  return (
    <>
      <Header />
        <ItemGrid/>
        <CTA/>
      <Footer />
    </>
  );
};

export default App;
