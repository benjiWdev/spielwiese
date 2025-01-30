const convertClassesToString = (classes: (string | undefined)[]): string => {
  const classNames = classes.filter((className) => className); // remove all undefined
  return classNames.join(" ");
};

export { convertClassesToString };
