export const useCutString = () => {
  const cutString = (string: string, max: number) => {
    return string.length > max ? string.substring(0, max) + "..." : string;
  };

  return {
    cutString,
  };
};
