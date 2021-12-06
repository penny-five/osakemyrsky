import classNames from "classnames";

import Avatar from "@/atoms/avatar";

export interface AvatarStackProps {
  pictures: string[];
}

const AvatarStack = ({ pictures }: AvatarStackProps) => {
  return (
    <div className="flex items-center">
      {pictures.slice(0, 4).map(picture => (
        <div key={picture} className="w-[15px]">
          <div className="flex justify-center items-center w-[36px] h-[36px] bg-white rounded-full">
            <Avatar size="sm" url={picture} />
          </div>
        </div>
      ))}
      {pictures.length > 4 && (
        <div
          className={classNames({
            "flex flex-shrink-0 justify-center items-center w-[36px] h-[36px] bg-white rounded-full": true,
            "font-bold text-sm text-gray-500": true
          })}
        >
          +{pictures.length - 4}
        </div>
      )}
    </div>
  );
};

export default AvatarStack;
