import { useEffect, useState } from 'react'

export function useSizeWidthScreen() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  return width
}


export function useSizeHeightScreen() {
  const [height, setHeight] = useState<number>(window.innerHeight);
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);
  return height
}