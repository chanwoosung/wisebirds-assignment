import { IGetUserData, IBaseResponse } from '../type';
export const userData:IBaseResponse<IGetUserData> = {
    "content":[
      {
         "id":1,
         "email":"user1@wisebirds.ai",
         "name":"사용자1",
         "last_login_at":"2022-11-14T07:37:24.914Z"
      },
      {
         "id":2,
         "email":"user2@wisebirds.ai",
         "name":"사용자2",
         "last_login_at":"2022-11-14T07:37:24.914Z"
      },
      {
         "id":3,
         "email":"user3@wisebirds.ai",
         "name":"사용자3",
         "last_login_at":"2022-11-14T07:37:24.914Z"
      },
    ],
    "size": 25,
    "total_elements": 2,
    "total_pages": 1, 
}