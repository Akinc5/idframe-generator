import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface PhotoUploaderProps {
  photo: string | null;
  onPhotoUpload: (url: string | null) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photo, onPhotoUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => { onPhotoUpload(e.target?.result as string); };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-1 w-8 bg-[#F97316] rounded-full transform rotate-1"></div>
        <h3 className="font-black text-[#1a1a1a] text-lg tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          1. Photo
        </h3>
        <div className="h-1 flex-1 bg-[#F97316]/30 rounded-full"></div>
      </div>

      {/* Polaroid-style photo frame */}
      <div className="relative w-full flex justify-center">
        <div 
          className={`relative w-40 h-40 bg-white shadow-[4px_6px_20px_rgba(0,0,0,0.15)] transform -rotate-2 border-4 border-white cursor-pointer transition-all duration-300 ${isDragging ? 'scale-105 shadow-[4px_6px_30px_rgba(249,115,22,0.3)]' : 'hover:rotate-0 hover:scale-105'}`}
          onClick={() => !photo && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          
          {photo ? (
            <>
              <img src={photo} alt="Uploaded" className="w-full h-full object-cover" />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onPhotoUpload(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute -top-3 -right-3 bg-[#F43F5E] text-white p-1 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-white"
              >
                <X size={12} />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#FFF8EE]">
              <Upload size={22} className="text-[#D2B48C]" />
              <span className="text-[10px] font-bold text-[#D2B48C] uppercase tracking-widest text-center leading-tight px-2">Drag & Drop<br/>your photo</span>
            </div>
          )}
          {/* Tape strip on polaroid */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#FFD580]/80 rounded-sm transform rotate-1 shadow-sm"></div>
        </div>
      </div>
    </div>
  );
};
