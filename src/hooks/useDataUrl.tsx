import { useState } from "react";

type HookReturns = [string | null, (event: React.ChangeEvent<HTMLInputElement>) => void];

const useDataUrl = (): HookReturns => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDataUrl(reader.result as string);
      };
    } else {
      setDataUrl(null);
    }
  };

  return [dataUrl, handleFileChange];
};

export default useDataUrl;