import React from "react";
import Image from "next/image";

interface PlantCardProps {
  shelfNumber: string;
  plantMaterialName: string;
  //   image1: string;
  //   image2: string;
  class: string;
  order: string;
  family: string;
  commonNames: string;
  information: string;
  timestamp: string;
  toxic_bool: boolean;
  toxic_note: string;
  img_url: string;
}

const PlantCard: React.FC<PlantCardProps> = ({
  shelfNumber,
  plantMaterialName,
  //   image1,
  //   image2,
  class: plantClass,
  order,
  family,
  commonNames,
  information,
  timestamp,
  toxic_bool,
  toxic_note,
  img_url,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title text-3xl text-bold mb-2">
          {plantMaterialName}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* Column 1: Image */}
          <div className="flex justify-center">
            <Image
              src={img_url}
              alt={`${plantMaterialName} 1`}
              width={150}
              height={150}
              layout="intrinsic"
            objectFit="contain"
              className="object-cover rounded"
            />
          </div>

          {/* Column 2: Text Information */}
          <div className="flex flex-col justify-center ">
            <p>
              <strong>Class:</strong> {plantClass}
            </p>
            <p>
              <strong>Order:</strong> {order}
            </p>
            <p>
              <strong>Family:</strong> {family}
            </p>
            <p>
              <strong>Common Names:</strong> {commonNames}
            </p>
            <p>
              <strong>Notes: </strong> 
              {information} <strong>{toxic_note}</strong>
            </p>
          </div>

          {/* Column 3: Daisy UI Stat Element */}
          <div className="flex justify-center items-center">
            <div className="stats lg:stats-vertical shadow">
              <div className="stat">
                <div className="stat-title">Located on Shelf:</div>
                <div className="stat-value">{shelfNumber.slice(8)}</div>
                <div className="stat-desc">{timestamp.slice(0, 10)}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Toxcicity</div>
                <div
                  className={
                    toxic_bool === true
                      ? "text-error"
                      : toxic_bool === false
                      ? "text-success"
                      : "text-warning"
                  }
                >
                  <strong className="text-xl">
                    {toxic_bool === true
                    ? "Yes"
                    : toxic_bool === false
                    ? "No"
                    : "Unknown"}
                    </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
