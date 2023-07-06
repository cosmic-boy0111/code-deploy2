import React, { Component, useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PrepareQuizContext } from "./PrepareQuiz";

// a little function to help us with reordering the result


const DragDrop = (props) => {

  const {ReorderData} = useContext(PrepareQuizContext)

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    console.log(list);
    const [removed] = result.splice(startIndex, 1);
    console.log(removed);
    result.splice(endIndex, 0, removed);
    console.log(result);
  
    return result;
  };


    const [items, setItems] = useState(props.children);

    useEffect(() => {
      setItems(props.children)
    }, [props.children])
    
  

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    console.log(result);

    const data = reorder(items,result.source.index,result.destination.index);
    setItems(data);
    ReorderData(result.source.index,result.destination.index);

  }

    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction={props.direction}>
            {provided => (
              <div
                className="Draggable_Wrap"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={item.props.id}
                    draggableId={item.props.id}
                    index={index}
                  >
                    {provided => (
                      <div
                        // className="Draggable_Item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
}

export default DragDrop;
