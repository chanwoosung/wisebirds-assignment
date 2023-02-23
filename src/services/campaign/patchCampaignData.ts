import axios from "axios";

export const patchCampaignState = async ({enabled,id}:{enabled: boolean, id: number}) =>
    await axios.patch(`/api/campaign/${id}`, {
      enabled,
    });