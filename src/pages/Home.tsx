import React from "react";

function Home() {
  const [color, setColor] = React.useState("blue");
  React.useEffect(() => {
    const handle = setInterval(() => {
      setColor((color) => (color === "blue" ? "red" : "blue"));
    }, 500);

    return () => {
      clearTimeout(handle);
    };
  }, []);
  return (
    <p
      css={`
        color: ${color};
      `}
    >
      Homepage
    </p>
  );
}

export default Home;
