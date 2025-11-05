'use client';

interface DashboardHeaderProps {
  onNewPrice: () => void;
  onNewPhoto: () => void;
  onLogout: () => void;
  resolvedTheme?: string;
}

export const DashboardHeader = ({ 
  onNewPrice, 
  onNewPhoto, 
  onLogout, 
  resolvedTheme 
}: DashboardHeaderProps) => {
  const buttonClass = `px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
    resolvedTheme === "light"
      ? "bg-orange-500 text-white"
      : "bg-orange-400 text-gray-900"
  }`;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <h2 className={`text-center text-3xl font-bold mb-4 md:mb-0 ${
        resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
      }`}>
        Bienvenue Guillaume
      </h2>
      <div className={`h-1 w-24 mx-auto my-4 md:hidden ${
        resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
      }`}></div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={onNewPrice} className={buttonClass}>
          Nouvelle prestation
        </button>
        <button onClick={onNewPhoto} className={buttonClass}>
          Nouvelle photo
        </button>
        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 bg-red-500 text-white"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};
