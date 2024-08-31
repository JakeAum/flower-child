"use client"

import React, { useState } from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from 'next/image';

export default function Upload() {
  const [formData, setFormData] = useState({
    shelfNumber: '',
    plantMaterialName: '',
    class: '',
    order: '',
    family: '',
    commonNames: '',
    information: '',
    toxic_bool: false,
    toxic_note: '',
    specimen_image: null,
    plant_image: null
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    if (files && files[0]) {
      setFormData(prevData => ({
        ...prevData,
        [id]: URL.createObjectURL(files[0])
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your backend
  };

  return (
    <>
    <Header/>
    <div className="flex flex-col h-screen">
      <div className="flex-1 bg-base-200 flex p-4 overflow-hidden">
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl self-start">
          <div className="card-body h-[calc(100vh-2rem-64px)] overflow-y-auto">
            <h2 className="card-title text-4xl font-bold text-center mb-6">
                Upload a New Specimen
            </h2>
            <form onSubmit={handleSubmit}>

              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Plant Material Name</span>
                </label>
                <input type="text" id="plantMaterialName" value={formData.plantMaterialName} onChange={handleInputChange} placeholder="Enter plant material name" className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Shelf Number</span>
                </label>
                <input type="text" id="shelfNumber" value={formData.shelfNumber} onChange={handleInputChange} placeholder="Enter shelf number" className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Class</span>
                </label>
                <input type="text" id="class" value={formData.class} onChange={handleInputChange} placeholder="Enter Class" className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Order</span>
                </label>
                <input type="text" id="order" value={formData.order} onChange={handleInputChange} placeholder="Enter order" className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Family</span>
                </label>
                <input type="text" id="family" value={formData.family} onChange={handleInputChange} placeholder="Enter family" className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Common Names</span>
                </label>
                <input type="text" id="commonNames" value={formData.commonNames} onChange={handleInputChange} placeholder="Enter common names" className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Information</span>
                </label>
                <textarea id="information" value={formData.information} onChange={handleInputChange} className="textarea textarea-bordered h-24" placeholder="Enter additional information"></textarea>
              </div>
              <div className="form-control mb-4">
                <label className="label cursor-pointer">
                  <span className="label-text">Is this known to be Toxic?</span>
                  <input type="checkbox" id="toxic_bool" checked={formData.toxic_bool} onChange={handleInputChange} className="toggle toggle-primary" />
                </label>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Toxic Note</span>
                </label>
                <textarea id="toxic_note" value={formData.toxic_note} onChange={handleInputChange} className="textarea textarea-bordered h-24" placeholder="Enter toxic note"></textarea>
              </div>
              <div className="divider"></div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Upload an Image of the Specimen</span>
                </label>
                <input type="file" id="specimen_image" onChange={handleFileChange} className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Upload an Image of the Plant</span>
                </label>
                <input type="file" id="plant_image" onChange={handleFileChange} className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
  {/* What the final modal will look like */}
  <div className="modal-box w-11/12 max-w-5xl w-full">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

    <h2 className="card-title text-4xl font-bold mb-6 text-center">
      {formData.plantMaterialName}
    </h2>

    <div className="flex flex-col items-center gap-6">
      <div className="w-64 h-64 relative">
        {!imageLoaded && (
          <div className="skeleton w-full h-full absolute"></div>
        )}
        {formData.plant_image && (
          <Image
            src={formData.plant_image}
            alt={`${formData.plantMaterialName} image`}
            layout="fill"
            objectFit="cover"
            className={`rounded ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        )}
      </div>
      <div className="w-full text-left">
        <p className="text-lg"><strong>Class:</strong> {formData.class}</p>
        <p className="text-lg"><strong>Order:</strong> {formData.order}</p>
        <p className="text-lg"><strong>Family:</strong> {formData.family}</p>
        <p className="text-lg"><strong>Common Names:</strong> {formData.commonNames}</p>
        <p className="text-lg"><strong>Notes:</strong> {formData.information} {formData.toxic_note}</p>
        <p className="text-lg"><strong>Located:</strong> {formData.shelfNumber}</p>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
    <Footer/>
    </>
  );
}