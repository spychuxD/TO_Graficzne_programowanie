import React from "react";
import { useDroppable } from "@dnd-kit/core";

function MainDroppable(props) {
  const { isOver, setNodeRef, resizeObserverConfig } = useDroppable({
    id: props.dropId,
    disabled: props.disabled,
  });
  const style = {
    width: "100%",
    transition: "0.1s",
    borderStyle: isOver && !props.hide ? "solid" : undefined,
    height: props.children.length < 1 ? 100 : undefined,
    borderRadius: 20,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
export default MainDroppable;
