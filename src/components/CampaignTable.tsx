import { Fragment } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
  Table,
} from "reactstrap";
import { useRecoilValue } from "recoil";
import { CAMPAIGN_OBJECTIVE } from "../constants/objective";
import { CAMPAIGN_TABLE_HEADER } from "../constants/tables";
import authAtom from "../recoil/authAtom";
import { useGetCampaignData } from "../services/campaign/getCampaignData";
import { patchCampaignState } from "../services/campaign/patchCampaignData";
import { Auth, IBaseResponse, IGetCampaignData } from "../type";

export function CampaignTable() {
  const queryClient = useQueryClient();
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const { data: campaignData, status } = useGetCampaignData("getCampaignData", {
    page: Number(urlParams.get("page")) ?? 1,
    size: 25,
  });
  const { mutate } = useMutation(patchCampaignState, {
    onSettled(data, error, variables, context) {
      const newCampaignData = campaignData?.content.map((campaign) =>
        campaign.id === variables.id
          ? {
              ...campaign,
              id: variables.id,
              enabled: variables.enabled,
            }
          : campaign
      );
      queryClient.setQueryData<IBaseResponse<IGetCampaignData>>(
        [
          "getCampaignData",
          {
            page: Number(urlParams.get("page")) ?? 1,
            size: 25,
          },
        ],
        () =>
          ({
            ...campaignData,
            content: newCampaignData,
          } as IBaseResponse<IGetCampaignData>)
      );
    },
  });
  const auth = useRecoilValue(authAtom);
  return (
    <>
      <Table>
        <thead>
          <tr>
            {CAMPAIGN_TABLE_HEADER.map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {status === "success" ? (
            campaignData.content.map((campaign, index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <th scope="row" className="flex justify-center">
                      <Form>
                        <FormGroup switch>
                          <Input
                            type="switch"
                            checked={campaign.enabled}
                            disabled={auth === Auth.viewer}
                            onChange={({ currentTarget }) => {
                              mutate({
                                enabled: currentTarget.checked,
                                id: campaign.id,
                              });
                            }}
                          />
                        </FormGroup>
                      </Form>
                    </th>
                    <td>{campaign.name}</td>
                    <td>
                      {CAMPAIGN_OBJECTIVE[campaign.campaign_objective] ?? ""}
                    </td>
                    <td>{campaign.impressions.toLocaleString("ko-KR")}</td>
                    <td>{campaign.clicks.toLocaleString("ko-KR")}</td>
                    <td>{Math.round(campaign.ctr * 100) + "%"}</td>
                    <td>{campaign.video_views}</td>
                    <td>{Math.round(campaign.vtr * 100) + "%"}</td>
                  </tr>
                </Fragment>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </Table>
      <Pagination className="flex justify-center">
        <PaginationItem>
          <PaginationLink first href="?page=1" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`?page=${Number(urlParams.get("page")) - 1}`}
            previous
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=2">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=4">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`?page=${Number(urlParams.get("page")) + 1}`}
            next
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`?page=${campaignData?.total_pages}`} last />
        </PaginationItem>
      </Pagination>
    </>
  );
}
