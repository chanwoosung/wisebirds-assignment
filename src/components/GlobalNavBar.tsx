import {
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { AUTH_LIST } from "../constants/auths";
import { GNB_BUTTON_LIST } from "../constants/buttons";
import GNBIndexAtom from "../recoil/GNBIndexAtom";
import userAtom from "../recoil/userAtom";
import { DropDownAuth } from "./DropDownAuth";
import { GNBButton } from "./GNBButton";

export function GlobalNavBar() {
  const [GNBIndex, setGNBIndex] = useRecoilState(GNBIndexAtom);
  const { email } = useRecoilValue(userAtom);
  return (
    <div className="flex w-screen bg-bgSkyBlue">
      <div className="flex ">
        {GNB_BUTTON_LIST.map((item, index) => {
          return (
            <GNBButton
              buttonText={item}
              key={index}
              active={GNBIndex === index ?? false}
              onClick={() => setGNBIndex(index)}
            />
          );
        })}
      </div>
      <div className="flex ml-auto">
        <GNBButton
          buttonText={email}
          active={GNBIndex === 3 ?? false}
          onClick={() => setGNBIndex(3)}
        />
        <DropDownAuth />
      </div>
    </div>
  );
}
