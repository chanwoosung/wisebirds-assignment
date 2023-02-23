import { IGNBButtonProps } from "../type";

export function GNBButton({
  buttonText,
  active = false,
  onClick,
}: IGNBButtonProps) {
  return (
    <div
      className={
        active
          ? "flex justify-center items-center p-3 text-white bg-bgSelectBlue cursor-pointer"
          : "flex justify-center items-center p-3 text-white cursor-pointer"
      }
      onClick={onClick}
    >
      {buttonText}
    </div>
  );
}
