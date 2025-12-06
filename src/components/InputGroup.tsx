import { useEffect, useRef, useState } from "react";
import { InputSlot, inputVariants } from "./InputSlot";
import { useWord } from "./WordProvider";
import type { VariantProps } from "class-variance-authority";
import { useComplete } from "./WinProvider";

type SlotValue = string | null;

interface Props {
  length?: number;
  isActive: boolean;
  onComplete: () => void;
}

const InputGroup = ({ length = 5, isActive, onComplete }: Props) => {
  const [slots, setSlots] = useState<SlotValue[]>(Array(length).fill(null));
  const [styles, setStyles] = useState<
    VariantProps<typeof inputVariants>["variant"][]
  >(Array(length).fill("default"));
  const slotsRef = useRef(slots);
  const { word } = useWord();
  const { setIsComplete, setIsWin } = useComplete();

  const onValidate = () => {
    if (!word) return;
    const correctWordArray = word.split("").map((l) => l);
    const updatedStyles = [...styles];
    const guess = slotsRef.current;

    const freq: Record<string, number> = {};
    for (const ch of correctWordArray) {
      freq[ch] = (freq[ch] || 0) + 1;
    }

    for (let i = 0; i <= length - 1; i++) {
      if (guess[i] === correctWordArray[i]) {
        updatedStyles[i] = "correct";
        freq[guess[i]!] -= 1;
      }
    }

    for (let i = 0; i <= length - 1; i++) {
      if (updatedStyles[i] === "correct") continue;

      const ch = guess[i];
      if (!ch) continue;

      if (freq[ch] > 0) {
        updatedStyles[i] = "almost";
        freq[ch] -= 1;
      }
    }
    setStyles(updatedStyles);

    if (JSON.stringify(guess) === JSON.stringify(correctWordArray)) {
      setIsComplete(true);
      setIsWin(true);
    }
  };

  useEffect(() => {
    slotsRef.current = slots;
  }, [slots]);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const current = slotsRef.current;

      if (/^[a-z]$/.test(key)) {
        const idx = current.findIndex((s) => s === null);
        if (idx === -1) return;
        setSlots((prev) => {
          const copy = [...prev];
          copy[idx] = key;
          return copy;
        });
        return;
      }

      if (key === "backspace") {
        const lastFilled = [...current].reverse().findIndex((s) => s !== null);
        if (lastFilled === -1) return;

        const actualIndex = length - 1 - lastFilled;
        setSlots((prev) => {
          const copy = [...prev];
          copy[actualIndex] = null;
          return copy;
        });
        return;
      }

      if (key === "enter") {
        if (slotsRef.current.includes(null)) return;
        onComplete();
        onValidate();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, length, onComplete]);

  if (!word) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {slots.map((slot, idx) => (
        <InputSlot
          content={slot}
          key={idx}
          correctLetter={word[idx]}
          variant={styles[idx]}
        />
      ))}
    </div>
  );
};

export default InputGroup;
