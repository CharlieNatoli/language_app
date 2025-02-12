import { SetStateAction, Dispatch, useEffect } from "react";

export const deselectFeedbackPanelEffect = (
  setSelectedId: Dispatch<SetStateAction<number>>
) => {
  // Remove feedback panel if clicks outside
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".speech-bubble")) {
        setSelectedId(-1);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};
