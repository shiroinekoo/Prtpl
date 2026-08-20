import React, { useRef } from 'react';
import gsap from 'gsap';

export default function ProjectCard({ title, category, link, image }) {
  const cardRef = useRef(null);

  // Efek saat mouse bergerak di dalam kartu (3D Tilt)
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Hitung koordinat relatif kursor terhadap pusat kartu (-0.5 sampai 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Rotasi 3D dan translasi halus
    gsap.to(card, {
      rotateY: x * 20, // Kemiringan Sumbu Y
      rotateX: -y * 20, // Kemiringan Sumbu X
      scale3d: [1.05, 1.05, 1.05],
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  // Kembalikan posisi kartu saat mouse keluar
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale3d: [1, 1, 1],
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-2xl overflow-hidden cursor-pointer no-underline group"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[400px] bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-500/10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Gambar Latar Proyek */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Overlayer Teks / Informasi */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white"
          style={{ transform: 'translateZ(30px)' }} // Memberikan kedalaman 3D pada teks
        >
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
            {category}
          </span>
          <h3 className="text-2xl font-bold mt-1 group-hover:translate-x-1 transition-transform duration-300">
            {title}
          </h3>
        </div>
      </div>
    </a>
  );
}