import React, { useEffect, useState } from "react";
import PlantCard from "@/components/PlantCard";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ItemGrid: React.FC = () => {
    const [plantData, setPlantData] = useState<any[]>([]);
    const [selectedPlant, setSelectedPlant] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const fetchPlantData = async () => {
            setIsLoading(true);
            const { data, error } = await supabase.from("plants").select("*");

            if (error) {
                console.error("Error fetching plant data:", error);
            } else {
                setPlantData(data);
            }
            setIsLoading(false);
        };

        fetchPlantData();
    }, []);

    const handleCardClick = (plant: any) => {
        setSelectedPlant(plant);
        setImageLoaded(false); // Reset image loaded state
        document.getElementById('plant_modal')?.showModal();
    };

    const renderContent = () => {
        if (isLoading) {
            return Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="card card-compact bg-base-100 w-96 shadow-xl">
                    <div className="skeleton h-48 w-full"></div>
                    <div className="card-body">
                        <div className="skeleton h-8 w-3/4 mb-2"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-5/6"></div>
                        <div className="card-actions justify-end mt-2">
                            <div className="skeleton h-6 w-16"></div>
                            <div className="skeleton h-6 w-16"></div>
                        </div>
                    </div>
                </div>
            ));
        }

        return plantData.map((plant, index) => (
            <PlantCard
                key={index}
                shelfNumber={plant.shelfNumber}
                plantMaterialName={plant.plantMaterialName}
                class={plant.class}
                order={plant.order}
                family={plant.family}
                commonNames={plant.commonNames}
                information={plant.note}
                timestamp={plant.created_at}
                toxic_bool={plant.is_toxic}
                toxic_note={plant.toxicNote}
                img_url={plant.image_url}
                onClick={() => handleCardClick(plant)}
            />
        ));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderContent()}
            </div>

            <dialog id="plant_modal" className="modal">
            {selectedPlant && (

                <div className="modal-box w-11/12 max-w-5xl w-full">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h2 className="card-title text-4xl text-bold mb-4 ">
                    
                        {selectedPlant.plantMaterialName}
                    </h2>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-shrink-0 w-full md:w-1/3">
                            <div className="flex justify-center items-center relative">
                                {!imageLoaded && (
                                    <div className="skeleton w-[300px] h-[300px] absolute"></div>
                                )}
                                <Image
                                    src={selectedPlant.image_url}
                                    alt={`${selectedPlant.plantMaterialName} image`}
                                    width={600}
                                    height={600}
                                    layout="intrinsic"
                                    objectFit="contain"
                                    className={`object-cover rounded ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoadingComplete={() => setImageLoaded(true)}
                                />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <p><strong>Class:</strong> {selectedPlant.class}</p>
                            <p><strong>Order:</strong> {selectedPlant.order}</p>
                            <p><strong>Family:</strong> {selectedPlant.family}</p>
                            <p><strong>Common Names:</strong> {selectedPlant.commonNames}</p>
                            <p><strong>Notes:</strong> {selectedPlant.information} <strong>{selectedPlant.toxic_note}</strong></p>
                            <p><strong>Located on:</strong> {selectedPlant.shelfNumber}</p>
                        </div>
                    </div>
                </div>
            )}
        </dialog>
       
        </div>
    );
};

export default ItemGrid;