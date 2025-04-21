"use client";

import { Button } from "@/components/ui/button";


const PrintButton = () => {
  return (
    <Button
      className="block mx-auto print:hidden"
      onClick={() => {
        window.print();
      }}
    >
      Print
    </Button>
  );
};

export default PrintButton;
