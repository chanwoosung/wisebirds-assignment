import { Fragment } from "react";
import { useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import {
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import { USER_TABLE_HEADER } from "../constants/tables";
import { useGetUserData } from "../services/user/getUserData";
import { IGetUserData } from "../type";
import { formatDateTime } from "../util/formatDateTime";

export function UserTable() {
  const queryClient = useQueryClient();
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const { data: userData, status } = useGetUserData("getUserData", {
    page: Number(urlParams.get("page")) ?? 1,
    size: 25,
  });
  // const { mutate } = useMutation(patchCampaignState, {
  //   onSettled(data, error, variables, context) {
  //     const newCampaignData = userData?.content.map((user) =>
  //       user.id === variables.id
  //         ? {
  //             ...user,
  //             id: variables.id,
  //             enabled: variables.enabled,
  //           }
  //         : user
  //     );
  //     queryClient.setQueryData<IBaseResponse<IGetCampaignData>>(
  //       [
  //         "getCampaignData",
  //         {
  //           page: Number(urlParams.get("page")) ?? 1,
  //           size: 25,
  //         },
  //       ],
  //       () =>
  //         ({
  //           ...userData,
  //           content: newCampaignData,
  //         } as IBaseResponse<IGetUserData>)
  //     );
  //   },
  // });
  const handleOpenModal = (user?: IGetUserData) => {};
  return (
    <>
      <Button className="bg-bgSelectBlue" onClick={() => handleOpenModal()}>
        생성
      </Button>
      <Table>
        <thead>
          <tr>
            {USER_TABLE_HEADER.map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {status === "success" ? (
            userData.content.map((user, index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <th scope="row">{user.email}</th>
                    <td>{user.name}</td>
                    <td>{formatDateTime(user.last_login_at)}</td>
                    <td>수정</td>
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
          <PaginationLink href={`?page=${userData?.total_pages}`} last />
        </PaginationItem>
      </Pagination>
    </>
  );
}
