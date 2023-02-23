import { Table } from "reactstrap";
import { useRecoilValue } from "recoil";
import { CAMPAIGN_TABLE_HEADER, USER_TABLE_HEADER } from "../constants/tables";
import GNBIndexAtom from "../recoil/GNBIndexAtom";
import { CampaignTableBody } from "./CampaignTableBody";

export function ContentTable() {
  const tab = useRecoilValue(GNBIndexAtom);
  return (
    <>
      <Table>
        <thead>
          <tr>
            {tab === 1
              ? CAMPAIGN_TABLE_HEADER.map((item, index) => {
                  return <th key={index}>{item}</th>;
                })
              : USER_TABLE_HEADER.map((item, index) => {
                  return <th key={index}>{item}</th>;
                })}
          </tr>
        </thead>
        <tbody>
          {tab === 1 ? (
            <CampaignTableBody />
          ) : (
            USER_TABLE_HEADER.map((item, index) => {
              return <th key={index}>{item}</th>;
            })
          )}
        </tbody>
      </Table>
    </>
  );
}
