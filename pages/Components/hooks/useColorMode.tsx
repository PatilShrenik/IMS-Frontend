"use client";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
 
const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "dark");
 
  useEffect(() => {
    const darkClassName = "dark";
    const rsThemeDarkClassName = "rs-theme-dark";
    const bodyClass = window.document.body.classList;
 
    if (colorMode === "dark") {
      bodyClass.add(darkClassName);
      bodyClass.add(rsThemeDarkClassName);
    } else {
      bodyClass.remove(darkClassName);
      bodyClass.remove(rsThemeDarkClassName);
    }
  }, [colorMode]);
 
  return [colorMode, setColorMode];
};
 
export default useColorMode;