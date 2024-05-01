import React from "react";
import { useDroppable } from "@dnd-kit/core";

function MainDroppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.dropId,
    disabled: props.disabled,
  });
  const style = {
    width: "100%",
    transition: "0.1s",
    borderStyle: isOver && !props.hide ? "solid" : undefined,
    height: props.placeholder ? 20 : undefined,
    borderRadius: 20,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
export default MainDroppable;
