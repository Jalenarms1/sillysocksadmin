import { useState } from "react";

type HookReturns = [string | null, (event: React.ChangeEvent<HTMLInputElement>, reset?: any) => void, () => void];

const useDataUrl = (): HookReturns => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, reset?: any) => {
    const file = event?.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDataUrl(reader.result as string);
    };
    } else if(reset) {
      setDataUrl(null);
    }
  };

  const resetImage = () => {
    setDataUrl(null);

  }

  return [dataUrl, handleFileChange, resetImage];
};

export default useDataUrl;