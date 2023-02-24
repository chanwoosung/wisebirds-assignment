import { IGetRequestParams } from './../../type';

import axios from 'axios'
import { useQuery } from 'react-query'
import { IBaseResponse, IGetCampaignData } from '../../type'
import { campaignData } from '../../mocks/campaignData';
export const getCampaignData = async (
  params: IGetRequestParams,
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
    params: IGetRequestParams,
) =>
  useQuery(
    [ queryKey, { ...params}],
    () => getCampaignData(params),
  )
