import { Table } from "reactstrap";
import { useRecoilValue } from "recoil";
import { CAMPAIGN_TABLE_HEADER, USER_TABLE_HEADER } from "../constants/tables";
import GNBIndexAtom from "../recoil/GNBIndexAtom";
import { CampaignTable } from "./CampaignTable";
import { UserTable } from "./UserTable";

export function ContentTable() {
  const tab = useRecoilValue(GNBIndexAtom);
  return <>{tab === 1 ? <CampaignTable /> : <UserTable />}</>;
}
