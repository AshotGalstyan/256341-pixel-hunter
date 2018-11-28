export const resize = (holder, original) => {
  const ratioWidth = original.width / holder.width;
  const ratioHeight = original.height / holder.height;
  const ratio = Math.max(ratioWidth, ratioHeight);
  return {width: parseInt(original.width / ratio, 10), height: parseInt(original.height / ratio, 10)};
};
