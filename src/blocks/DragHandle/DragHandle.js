import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
//import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeDragOverlayData } from "../../redux/slices/DraggableSettings";

function DragHandle(props) {
  const dispatch = useDispatch();
  const disableDraggable = useSelector(
    (state) => state.draggableSettings.disableDraggable
  );
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.id,
    disabled: disableDraggable,
  });

  useEffect(() => {
    const { children, ...serializableProps } = props;
    dispatch(changeDragOverlayData(serializableProps));
  }, [dispatch, isDragging]);

  // const style = transform
  //   ? {
  //       transform: CSS.Translate.toString(transform),
  //     }
  //   : undefined;
  const dynamicStyle =
    isDragging === true && props.isOverlay === false ? { display: "none" } : {};

  return (
    <div
      className={props.className}
      ref={setNodeRef}
      style={{
        width: "min-content",
        //zIndex: 10000,
        ...props.additionalStyle,
        ...dynamicStyle,
        flexGrow: 0,
      }}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}

export default DragHandle;
