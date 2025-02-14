import { useState } from "react";

const useInput = (initialValue: string = "") => {
  const [value, setValue] = useState<string>(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, handler, reset };
};

export default useInput;
