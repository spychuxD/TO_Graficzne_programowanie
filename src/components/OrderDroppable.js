import React from "react";
import { useDroppable } from "@dnd-kit/core";

function OrderDroppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.dropId + "|order",
  });
  const style = {
    width: "100%",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
export default OrderDroppable;
