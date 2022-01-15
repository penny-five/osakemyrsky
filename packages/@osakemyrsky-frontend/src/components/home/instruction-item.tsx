export interface InstructionItemProps {
  index: number;
  title: string | React.ReactNode;
  body: string | React.ReactNode;
  illustration: React.ReactNode;
}

export const InstructionItem = ({ index, title, body, illustration }: InstructionItemProps) => {
  return (
    <li className="flex gap-16 py-6 px-12 mb-8 last-of-type:mb-0 bg-gray-200 rounded-md shadow-md">
      <div className="shrink-0 min-w-[275px]">{illustration}</div>
      <div className="flex flex-col my-12">
        {typeof title === "string" ? (
          <h4 className="font-extrabold text-2xl mb-6">
            {index + 1}. {title}
          </h4>
        ) : (
          title
        )}
        {typeof body === "string" ? <p className="text-lg font-medium">{body}</p> : body}
      </div>
    </li>
  );
};
