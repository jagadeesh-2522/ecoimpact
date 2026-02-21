export interface UserData {
  username: string;
  dailyTravel: number;
  monthlyElectricity: number;
  dietPreference: 'veg' | 'non-veg';
  mealType: 'breakfast' | 'lunch' | 'dinner';
  foodCategory: 'veg' | 'non-veg' | 'processed';
  pledgeTaken: boolean;
  lastPledgeDate: string | null;
}

export const DEFAULT_USER_DATA: UserData = {
  username: '',
  dailyTravel: 0,
  monthlyElectricity: 0,
  dietPreference: 'veg',
  mealType: 'lunch',
  foodCategory: 'veg',
  pledgeTaken: false,
  lastPledgeDate: null,
};
