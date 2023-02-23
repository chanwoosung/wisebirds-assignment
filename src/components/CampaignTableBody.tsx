import axios, { AxiosResponse } from "axios";
import { Fragment } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { useRecoilValue } from "recoil";
import authAtom from "../recoil/authAtom";
import { useGetCampaignData } from "../services/campaign/getCampaignData";
import { patchCampaignState } from "../services/campaign/patchCampaignData";
import { Auth, IBaseResponse, IGetCampaignData } from "../type";

export function CampaignTableBody() {
  const queryClient = useQueryClient();
  const { data: campaignData, status } = useGetCampaignData("getCampaignData", {
    page: 1,
    size: 1,
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
            page: 1,
            size: 1,
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
                <td>{campaign.campaign_objective}</td>
                <td>{campaign.impressions}</td>
                <td>{campaign.clicks}</td>
                <td>{campaign.ctr}</td>
                <td>{campaign.video_views}</td>
                <td>{campaign.vtr}</td>
              </tr>
            </Fragment>
          );
        })
      ) : (
        <Spinner />
      )}
    </>
  );
}
