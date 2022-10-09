import { useState, useEffect } from "react";

function useScreenWidth() {
  const [ screenWidth, setScreenWidth ] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth;
}

export default useScreenWidth;
