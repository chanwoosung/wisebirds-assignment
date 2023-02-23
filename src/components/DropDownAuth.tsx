import { useState } from "react";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useRecoilState } from "recoil";
import { AUTH_LIST } from "../constants/auths";
import authAtom from "../recoil/authAtom";

export function DropDownAuth() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <div className="flex justify-center items-center p-3">
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          className="bg-white !text-bgSkyBlue min-w-[100px]"
          caret
        >
          {AUTH_LIST[auth]}
        </DropdownToggle>
        <DropdownMenu>
          {AUTH_LIST.map((auth, index) => {
            return (
              <DropdownItem key={index} onClick={() => setAuth(index)}>
                {auth}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
}
