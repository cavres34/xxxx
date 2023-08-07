import { useState } from "react";

export default function useCarousel({
  load = 4,
  initial = 4,
  swipeOnLast = 2,
  total: t,
}) {
  const [loadedCarousels, setLoadedCarousels] = useState(initial);
  const [total, setTotal] = useState(t || 0);
  console.log(total);
  const handleCarouselSwipe = (currentIndex) => {
    // if (
    //   (currentIndex === loadedCarousels - 2 ||
    //     currentIndex === loadedCarousels - 1) &&
    //   loadedCarousels < total
    // )
    if (
      loadedCarousels - 1 - currentIndex < swipeOnLast &&
      loadedCarousels < total
    ) {
      console.log("handleCarouselSwipe");
      // Load more carousels on reaching the last or second last carousel in the loaded set
      const newLoadedCarousels = Math.min(loadedCarousels + load, total);
      setLoadedCarousels(newLoadedCarousels);
    }
  };

  return { loadedCarousels, setLoadedCarousels, handleCarouselSwipe, setTotal };
}
