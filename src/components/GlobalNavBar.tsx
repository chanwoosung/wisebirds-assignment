import { useRecoilState, useRecoilValue } from "recoil";
import { GNB_BUTTON_LIST } from "../constants/buttons";
import authAtom from "../recoil/authAtom";
import GNBIndexAtom from "../recoil/GNBIndexAtom";
import userAtom from "../recoil/userAtom";
import { Auth } from "../type";
import { DropDownAuth } from "./DropDownAuth";
import { GNBButton } from "./GNBButton";

export function GlobalNavBar() {
  const [GNBIndex, setGNBIndex] = useRecoilState(GNBIndexAtom);
  const auth = useRecoilValue(authAtom);
  const { email } = useRecoilValue(userAtom);
  return (
    <div className="flex w-screen bg-bgSkyBlue">
      <div className="flex ">
        {GNB_BUTTON_LIST.map((item, index) => {
          if (index === 2 && auth !== Auth.admin) {
            return <></>;
          } else {
            return (
              <GNBButton
                buttonText={item}
                key={`GNB_${index}`}
                active={GNBIndex === index ?? false}
                onClick={() => setGNBIndex(index)}
                buttonId={`button-${index}`}
                type={index === 0 ? "title" : "GNB"}
              />
            );
          }
        })}
      </div>
      <div className="flex ml-auto">
        <GNBButton
          buttonText={email}
          active={GNBIndex === 3 ?? false}
          onClick={() => setGNBIndex(3)}
          buttonId={"email"}
          type="user"
        />
        <DropDownAuth />
      </div>
    </div>
  );
}
