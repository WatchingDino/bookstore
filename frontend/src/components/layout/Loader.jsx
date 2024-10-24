import React from "react";
import {CircularProgress} from "@nextui-org/react";

const Loader = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
    <CircularProgress
      aria-label="Loading..."
      size="lg"
      value={value}
      color="secondary" 
      showValueLabel={true}
    />
  </div>
  );
};

export default Loader;
