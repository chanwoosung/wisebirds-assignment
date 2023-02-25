import { IGetRequestParams } from '../../type';

import axios from 'axios'
import { useQuery } from 'react-query'
import { IBaseResponse, IGetUserData } from '../../type'
import { userData } from '../../mocks/userData';
export const getUserData = async (
  params: IGetRequestParams,
) => {
  const url = '/api/users'
  try {
    const {
    data,
    } = await axios.get<IBaseResponse<IGetUserData>>(url, {params})

    return data
  } catch (error) {
    throw error
  } finally {
    return userData
  }

}

export const useGetUserData = (
    queryKey: string,
    params: IGetRequestParams,
) =>
  useQuery(
    [ queryKey, { ...params}],
    () => getUserData(params),
    {
      onError(err) {
      },
      onSettled(data) {
      }
    }
  )
