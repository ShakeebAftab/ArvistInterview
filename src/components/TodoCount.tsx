import { FC } from "react";

interface Props {
  title: string;
  count: number;
}

const TodoCount: FC<Props> = ({ title, count }) => {
  return (
    <div className="flex flex-col text-center border-2 p-4 rounded-2xl drop-shadow-sm bg-white">
      <p className="text-lg">{title}</p>
      <p>{count}</p>
    </div>
  );
};

export default TodoCount;
