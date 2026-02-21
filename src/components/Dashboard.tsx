import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout } from './Layout';
import { ImpactSection } from './ImpactSection';
import { DietSection } from './DietSection';
import { ScoreSection } from './ScoreSection';
import { Pledge } from './Pledge';
import { TabButton } from './TabButton';
import { UserData, DEFAULT_USER_DATA } from '../types';
import { Leaf, Utensils, Award } from 'lucide-react';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  const [activeTab, setActiveTab] = useState('impact');
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem(`eco_data_${username}`);
    return saved ? JSON.parse(saved) : { ...DEFAULT_USER_DATA, username };
  });

  useEffect(() => {
    localStorage.setItem(`eco_data_${username}`, JSON.stringify(userData));
  }, [userData, username]);

  const handleImpactUpdate = (data: { travel: number; electricity: number; diet: 'veg' | 'non-veg' }) => {
    setUserData(prev => ({
      ...prev,
      dailyTravel: data.travel,
      monthlyElectricity: data.electricity,
      dietPreference: data.diet
    }));
  };

  const handleDietUpdate = (data: { mealType: string; foodCategory: string }) => {
    setUserData(prev => ({
      ...prev,
      mealType: data.mealType as any,
      foodCategory: data.foodCategory as any
    }));
  };

  const handlePledge = () => {
    setUserData(prev => ({
      ...prev,
      pledgeTaken: true,
      lastPledgeDate: new Date().toISOString()
    }));
  };

  // Calculate Score
  const calculateScore = () => {
    let score = 100;
    
    // Deduct for travel (max -20)
    score -= Math.min(20, userData.dailyTravel * 0.5);
    
    // Deduct for electricity (max -20)
    score -= Math.min(20, (userData.monthlyElectricity / 30) * 0.5);
    
    // Deduct for diet preference (max -10)
    if (userData.dietPreference === 'non-veg') score -= 10;
    
    // Deduct for specific meal choice (max -10)
    if (userData.foodCategory === 'non-veg') score -= 5;
    if (userData.foodCategory === 'processed') score -= 10;
    
    // Add for pledge (+5)
    if (userData.pledgeTaken) score += 5;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const score = calculateScore();

  return (
    <Layout username={username} onLogout={onLogout}>
      <div className="space-y-6">
        {/* Always Visible Pledge */}
        <Pledge onPledge={handlePledge} taken={userData.pledgeTaken} />

        {/* Tab Navigation */}
        <div className="flex rounded-2xl bg-white p-1 shadow-sm dark:bg-slate-800">
          <TabButton
            id="impact"
            label="My Impact"
            icon={Leaf}
            isActive={activeTab === 'impact'}
            onClick={setActiveTab}
          />
          <TabButton
            id="diet"
            label="My Diet"
            icon={Utensils}
            isActive={activeTab === 'diet'}
            onClick={setActiveTab}
          />
          <TabButton
            id="score"
            label="My Score"
            icon={Award}
            isActive={activeTab === 'score'}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'impact' && (
              <ImpactSection onUpdate={handleImpactUpdate} />
            )}
            {activeTab === 'diet' && (
              <DietSection onUpdate={handleDietUpdate} />
            )}
            {activeTab === 'score' && (
              <ScoreSection score={score} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
};
