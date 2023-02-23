import { useState } from "react";
import { Tooltip } from "reactstrap";
import { useRecoilValue } from "recoil";
import userAtom from "../recoil/userAtom";
import { IGNBButtonProps } from "../type";

export function GNBButton({
  buttonText,
  active = false,
  onClick,
  type = "GNB",
  buttonId,
}: IGNBButtonProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const user = useRecoilValue(userAtom);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <div
      className={
        type === "title"
          ? "flex justify-center items-center p-3 text-white cursor-pointer"
          : active
          ? "flex justify-center items-center p-3 text-white bg-bgSelectBlue cursor-pointer"
          : "flex justify-center items-center p-3 text-white cursor-pointer"
      }
      onClick={onClick}
      id={buttonId}
    >
      {type === "user" ? (
        <Tooltip
          placement={"bottom-end"}
          isOpen={tooltipOpen}
          target={buttonId}
          toggle={toggle}
          className="bg-slate-500"
        >
          <p className="font-bold">{user.name}</p>
          <p>{user.email}</p>
          <p>{user.company}</p>
        </Tooltip>
      ) : (
        <></>
      )}
      {buttonText}
    </div>
  );
}
