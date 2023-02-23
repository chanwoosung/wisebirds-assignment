import { Table } from "reactstrap";
import { useRecoilValue } from "recoil";
import { CAMPAIGN_TABLE_HEADER, USER_TABLE_HEADER } from "../constants/tables";
import GNBIndexAtom from "../recoil/GNBIndexAtom";

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
        <tbody></tbody>
      </Table>
    </>
  );
}
