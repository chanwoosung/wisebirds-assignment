import { IGetCampaignDataRequestParams } from './../../type';

import axios from 'axios'
import { useQuery } from 'react-query'
import { IBaseResponse, IGetCampaignData } from '../../type'
import { campaignData } from '../../mocks/campaignData';
export const getCampaignData = async (
  params: IGetCampaignDataRequestParams,
) => {
  const url = '/api/campaigns'
  try {
    const {
    data,
    } = await axios.get<IBaseResponse<IGetCampaignData>>(url, {params})

    return data
  } catch (error) {
    return campaignData
  }

}

export const useGetCampaignData = (
    queryKey: string,
    params: IGetCampaignDataRequestParams,
) =>
  useQuery(
    [ queryKey, { ...params}],
    () => getCampaignData(params),
  )
