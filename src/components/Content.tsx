import { useRecoilValue } from "recoil";
import { GNB_BUTTON_LIST } from "../constants/buttons";
import GNBIndexAtom from "../recoil/GNBIndexAtom";
import { ContentTable } from "./ContentTable";

export function Content() {
  const tab = useRecoilValue(GNBIndexAtom);
  return (
    <div className="min-h-screen w-screen">
      <div className="flex p-3">
        <span>{GNB_BUTTON_LIST[tab]} 관리</span>
      </div>
      <div>
        <ContentTable />
      </div>
    </div>
  );
}
