export const isValidJSONObject = (str: string): boolean => {
  try {
    const parsed = JSON.parse(str);
    return (
      typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    );
  } catch (err) {
    return false;
  }
};
