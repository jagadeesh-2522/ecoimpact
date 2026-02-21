import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Car, Zap, Utensils, Leaf } from 'lucide-react';

interface ImpactSectionProps {
  onUpdate: (data: { travel: number; electricity: number; diet: 'veg' | 'non-veg' }) => void;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ onUpdate }) => {
  const [travel, setTravel] = useState(10);
  const [electricity, setElectricity] = useState(150);
  const [diet, setDiet] = useState<'veg' | 'non-veg'>('veg');
  const [showResults, setShowResults] = useState(false);

  const calculateImpact = () => {
    // Simple mock calculation
    // Travel: ~0.2kg CO2 per km
    // Electricity: ~0.5kg CO2 per unit
    // Diet: Veg ~2.5kg/day, Non-veg ~5kg/day
    
    const travelImpact = travel * 0.2;
    const electricityImpact = (electricity / 30) * 0.5; // Daily avg
    const dietImpact = diet === 'veg' ? 2.5 : 5.0;
    
    return {
      total: travelImpact + electricityImpact + dietImpact,
      breakdown: {
        travel: travelImpact,
        electricity: electricityImpact,
        diet: dietImpact
      }
    };
  };

  const impact = calculateImpact();
  const maxImpact = 20; // Arbitrary max for progress bars

  useEffect(() => {
    if (showResults) {
      onUpdate({ travel, electricity, diet });
    }
  }, [travel, electricity, diet, showResults, onUpdate]);

  return (
    <div className="space-y-6 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800"
      >
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
          <Leaf className="text-emerald-500" />
          Your Daily Habits
        </h2>

        <div className="space-y-6">
          {/* Travel Input */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <Car size={16} /> Daily Travel (km)
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{travel} km</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={travel}
              onChange={(e) => setTravel(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-500 dark:bg-slate-700"
            />
          </div>

          {/* Electricity Input */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <Zap size={16} /> Monthly Electricity (units)
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{electricity} kWh</span>
            </label>
            <input
              type="number"
              value={electricity}
              onChange={(e) => setElectricity(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          {/* Diet Preference */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <Utensils size={16} /> Diet Preference
              </span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDiet('veg')}
                className={`rounded-xl border-2 p-3 text-sm font-medium transition-all ${
                  diet === 'veg'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                Veg 🌿
              </button>
              <button
                onClick={() => setDiet('non-veg')}
                className={`rounded-xl border-2 p-3 text-sm font-medium transition-all ${
                  diet === 'non-veg'
                    ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'
                    : 'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                Non-Veg 🍗
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="w-full rounded-xl bg-slate-800 py-3 font-semibold text-white transition-all hover:bg-slate-900 active:scale-95 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          >
            Check My Impact
          </button>
        </div>
      </motion.div>

      {showResults && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Impact Analysis</h3>
            <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
              impact.total < 8 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : impact.total < 15
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
            }`}>
              {impact.total < 8 ? 'Low Impact' : impact.total < 15 ? 'Moderate' : 'High Impact'}
            </span>
          </div>

          <div className="mb-6 text-center">
            <div className="text-4xl font-black text-slate-800 dark:text-white">
              {impact.total.toFixed(1)}
              <span className="text-base font-medium text-slate-500 dark:text-slate-400"> kg CO₂/day</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Progress Bars */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Travel</span>
                <span>{impact.breakdown.travel.toFixed(1)} kg</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(impact.breakdown.travel / maxImpact) * 100}%` }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Electricity</span>
                <span>{impact.breakdown.electricity.toFixed(1)} kg</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(impact.breakdown.electricity / maxImpact) * 100}%` }}
                  className="h-full bg-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Diet</span>
                <span>{impact.breakdown.diet.toFixed(1)} kg</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(impact.breakdown.diet / maxImpact) * 100}%` }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
