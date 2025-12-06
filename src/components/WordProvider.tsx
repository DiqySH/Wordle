import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";
import { api } from "../lib/axios";

type WordContextType = {
  word: string | null;
  isLoading: boolean;
  setWordLength: Dispatch<React.SetStateAction<number>>;
};

const initialWordContextState: WordContextType = {
  word: null,
  isLoading: true,
  setWordLength: () => {},
};

const WordContext = createContext<WordContextType>(initialWordContextState);

export const WordProvider = ({ children }: { children: ReactNode }) => {
  const [word, setWord] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const didFetch = useRef<boolean>(false);
  const [wordLength, setWordLength] = useState<number>(5);

  useEffect(() => {
    if (didFetch.current) return;
    setIsLoading(true);
    didFetch.current = true;

    const getWord = async () => {
      try {
        const res = await api.get<string[]>(`?words=1&length=${wordLength}`);
        setWord(res.data[0]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        throw new Error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getWord();
  }, [wordLength]);

  return (
    <WordContext.Provider value={{ word, isLoading, setWordLength }}>
      {children}
    </WordContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWord = () => {
  const ctx = useContext(WordContext);
  if (!ctx) throw Error("Error");
  return ctx;
};
