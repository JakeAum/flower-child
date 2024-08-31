import React from "react";
import Image from "next/image";

interface PlantCardProps {
  shelfNumber: string;
  plantMaterialName: string;
  class: string;
  order: string;
  family: string;
  commonNames: string;
  information: string;
  timestamp: string;
  toxic_bool: boolean;
  toxic_note: string;
  img_url: string;
  onClick: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({
  shelfNumber,
  plantMaterialName,
  class: plantClass,
  order,
  family,
  commonNames,
  information,
  timestamp,
  toxic_bool,
  toxic_note,
  img_url,
  onClick,
}) => {
  return (
    <div
      className="card card-compact bg-base-100 w-96 shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <figure>
        <Image
          src={img_url}
          alt={`${plantMaterialName} image`}
          width={150}
          height={150}
          layout="intrinsic"
          objectFit="contain"
          className="object-cover rounded"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl text-bold mb-2">
          {plantMaterialName}
        </h2>
        <h3>{commonNames}</h3>
        <div className="card-actions justify-end">
          {!!shelfNumber && <div className="badge badge-ghost">{shelfNumber}</div>}
          {toxic_bool === true && <div className="badge badge-error">Toxic</div>}
          {toxic_bool === false && <div className="badge badge-success">Non-Toxic</div>}
          {toxic_bool === null && <div className="badge badge-warning">Unknown</div>}
        </div>
      </div>
    </div>
  );
};

export default PlantCard;