import { useState } from "react";

export function useValidationInput() {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [helperText, setHelperText] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return {
    text,
    setText,
    error,
    setError,
    helperText,
    setHelperText,
    handleInput,
  };
}
