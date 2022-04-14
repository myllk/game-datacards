import clone from 'just-clone';

export const getBackgroundColor = (snapshot: DroppableStateSnapshot): string => {
  if (snapshot.isDraggingOver) {
    return '#f8f8f8';
  }
  if (snapshot.draggingFromThisWith) {
    return '#e6f6ff';
  }
  return 'white';
};

export const getMinHeight = (snapshot: DroppableStateSnapshot): string => {
  if (snapshot.isDraggingOver) {
    return '36px';
  }
  return '0px';
};

export const reorder = (list, startIndex, endIndex) => {
  const result = clone(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

 export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = clone(source);
  const destClone = clone(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};