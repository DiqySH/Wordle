import { useMemo, useState } from "react";
import InputGroup from "./components/InputGroup";
import { useWord } from "./components/WordProvider";

const App = () => {
  const [currentInputIndex, setCurrentInputIndex] = useState<number>(0);
  const onComplete = () => {
    setCurrentInputIndex((prev) => prev + 1);
  };
  const rows = useMemo(() => Array.from({ length: 5 }), []);
  const { isLoading } = useWord();

  if (isLoading)
    return (
      <div className="w-full min-h-screen grid place-items-center">
        <span>Loading...</span>
      </div>
    );

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-2">
        {rows.map((_, idx) => (
          <InputGroup
            key={idx}
            isActive={idx === currentInputIndex}
            onComplete={onComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
