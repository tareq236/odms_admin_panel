import { ReactNode } from "react";

const Field = ({
  name,
  value,
}: {
  name: string;
  value: string | number | ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-0.5">
      <h4 className="text-sm text-r-2">{name}</h4>
      {typeof value !== "string" || typeof value !== "number" ? (
        <p className="text-sm font-semibold">{value}</p>
      ) : (
        value
      )}
    </div>
  );
};

const CustomSection = ({ ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className="flex items-center gap-x-5 gap-y-3 flex-wrap border-b pb-3"
      {...props}
    />
  );
};

type Approval = 0 | 1;

const approval = (value: Approval | boolean) => {
  return value === 1 || value === true ? "Yes" : "No";
};

export { CustomSection, Field, type Approval, approval };
