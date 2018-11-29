export const resize = (holder, original) => {
  const ratioWidth = original.width / holder.width;
  const ratioHeight = original.height / holder.height;
  const ratio = Math.max(ratioWidth, ratioHeight);
  return {width: Math.floor(original.width / ratio), height: Math.floor(original.height / ratio)};
};
