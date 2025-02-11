import { create } from "zustand";

type State = {
  isAnimating: boolean;
  hitNumber: number;
  autoHit: boolean;
  sound: any;
};

type Actions = {
  setIsAnimating: (isAnimating: boolean) => void;
  increaseHitNumber: () => void;
  setAutoHit: (autoHit: boolean) => void;
  setSound: (sound: any) => void;
};

const useStatus = create<State & Actions>((set) => ({
  isAnimating: false,
  hitNumber: 0,
  autoHit: false,
  sound: null,
  setSound: (sound) => set(() => ({ sound: sound })),
  setAutoHit: (autoHit) => set(() => ({ autoHit: autoHit })),
  setIsAnimating: (isAnimating) => set(() => ({ isAnimating: isAnimating })),
  increaseHitNumber: () => set((state) => ({ hitNumber: state.hitNumber + 1 })),
}));

export default useStatus;
