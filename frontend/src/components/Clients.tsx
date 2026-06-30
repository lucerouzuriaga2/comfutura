import React from "react";

export default function Clients() {
  const partners = [
    { name: "Claro", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdoeH2r6UGXKF5heCBvK_QiIwKxAwZ75cm7Q&s" },
    { name: "Olo", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXtiOR7wV0n5KHzS5tDNNVr5isuC78-yXlIg&s" },
    { name: "Huawei", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/3840px-Huawei_Standard_logo.svg.png" },
    { name: "Entel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Entel_logo_pe.png" },
    { name: "Sodexo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sodexo_logo.svg/3840px-Sodexo_logo.svg.png" }
  ];

  return (
    <section className="w-full bg-white py-16 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Confían en nosotros</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-2 font-sans">
            Nuestros principales clientes y aliados estratégicos
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-70 hover:opacity-100 transition-all duration-500">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="flex justify-center transition-transform hover:scale-110 cursor-pointer"
              title={partner.name}
            >
              <img
                alt={partner.name}
                className="h-10 md:h-14 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                src={partner.logo}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
