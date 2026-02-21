import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Leaf, Heart } from 'lucide-react';

interface DietSectionProps {
  onUpdate: (data: { mealType: string; foodCategory: string }) => void;
}

export const DietSection: React.FC<DietSectionProps> = ({ onUpdate }) => {
  const [mealType, setMealType] = useState('lunch');
  const [foodCategory, setFoodCategory] = useState('veg');
  const [showResults, setShowResults] = useState(false);

  const getFeedback = () => {
    let health = { status: 'Good', color: 'text-emerald-500', emoji: '🥗' };
    let carbon = { status: 'Low', color: 'text-emerald-500', emoji: '🌱' };

    if (foodCategory === 'non-veg') {
      health = { status: 'Okay', color: 'text-amber-500', emoji: '🍖' };
      carbon = { status: 'High', color: 'text-rose-500', emoji: '🔥' };
    } else if (foodCategory === 'processed') {
      health = { status: 'Poor', color: 'text-rose-500', emoji: '🍔' };
      carbon = { status: 'Medium', color: 'text-amber-500', emoji: '🏭' };
    }

    return { health, carbon };
  };

  const feedback = getFeedback();

  const handleCheck = () => {
    setShowResults(true);
    onUpdate({ mealType, foodCategory });
  };

  return (
    <div className="space-y-6 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800"
      >
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
          <Utensils className="text-emerald-500" />
          My Diet Check
        </h2>

        <div className="space-y-6">
          {/* Meal Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
              Meal Type
            </label>
            <div className="flex gap-2">
              {['Breakfast', 'Lunch', 'Dinner'].map((type) => (
                <button
                  key={type}
                  onClick={() => setMealType(type.toLowerCase())}
                  className={`flex-1 rounded-xl border-2 py-2 text-sm font-medium transition-all ${
                    mealType === type.toLowerCase()
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                      : 'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Food Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
              Food Category
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                onClick={() => setFoodCategory('veg')}
                className={`rounded-xl border-2 p-3 text-sm font-medium transition-all ${
                  foodCategory === 'veg'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                Veg 🌿
              </button>
              <button
                onClick={() => setFoodCategory('non-veg')}
                className={`rounded-xl border-2 p-3 text-sm font-medium transition-all ${
                  foodCategory === 'non-veg'
                    ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'
                    : 'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                Non-Veg 🍗
              </button>
              <button
                onClick={() => setFoodCategory('processed')}
                className={`rounded-xl border-2 p-3 text-sm font-medium transition-all ${
                  foodCategory === 'processed'
                    ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                    : 'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                Junk/Processed 🍔
              </button>
            </div>
          </div>

          <button
            onClick={handleCheck}
            className="w-full rounded-xl bg-slate-800 py-3 font-semibold text-white transition-all hover:bg-slate-900 active:scale-95 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          >
            Check Meal Impact
          </button>
        </div>
      </motion.div>

      {showResults && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {/* Health Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
            <div className="mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Heart size={18} />
              <span className="text-sm font-medium">Health Score</span>
            </div>
            <div className={`text-2xl font-bold ${feedback.health.color}`}>
              {feedback.health.status} {feedback.health.emoji}
            </div>
          </div>

          {/* Carbon Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
            <div className="mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Leaf size={18} />
              <span className="text-sm font-medium">Carbon Impact</span>
            </div>
            <div className={`text-2xl font-bold ${feedback.carbon.color}`}>
              {feedback.carbon.status} {feedback.carbon.emoji}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
