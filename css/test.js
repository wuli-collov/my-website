const myIterator = {
  next() {
    // …
  },
  [Symbol.iterator]() {
    return this;
  },
};
