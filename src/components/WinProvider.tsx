import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type CompleteContextType = {
  isWin: boolean;
  setIsWin: Dispatch<SetStateAction<boolean>>;
  isComplete: boolean;
  setIsComplete: Dispatch<SetStateAction<boolean>>;
};

const initialCompleteState: CompleteContextType = {
  isWin: false,
  setIsWin: () => {},
  isComplete: false,
  setIsComplete: () => {},
};

const CompleteContext =
  createContext<CompleteContextType>(initialCompleteState);

export const CompleteProvider = ({ children }: { children: ReactNode }) => {
  const [isWin, setIsWin] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  return (
    <CompleteContext.Provider
      value={{ isWin, setIsWin, isComplete, setIsComplete }}
    >
      {children}
    </CompleteContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useComplete = () => {
  const ctx = useContext(CompleteContext);
  if (!ctx) throw Error("Error");
  return ctx;
};
