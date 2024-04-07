import("./bootstrap.tsx").then(({ init }) => {
  const rootElement = document.getElementById("root") as HTMLElement;

  if (rootElement) {
    init(rootElement);
  }
});
