import { Fragment, useState } from "react";
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
import { useErrorModal } from "../hooks/useErrorModal";
import { useGetUserData } from "../services/user/getUserData";
import { IGetUserData } from "../type";
import { formatDateTime } from "../util/formatDateTime";
import { ErrorModal } from "./ErrorModal";
import { UserModal } from "./UserModal";

export function UserTable() {
  const { search } = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<undefined | IGetUserData>(
    undefined
  );
  const [isOpenErrorModal, setIsOpenErrorModal] = useErrorModal();
  const urlParams = new URLSearchParams(search);
  const {
    data: userData,
    status,
    isError,
  } = useGetUserData("getUserData", {
    page: urlParams.get("page") ? Number(urlParams.get("page")) : 1,
    size: 25,
  });

  const handleOpenModal = (user?: IGetUserData) => {
    setIsOpenModal(true);
    setSelectedUser(user);
  };
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  console.log(status, isError);
  return (
    <>
      <Button className="bg-bgSelectBlue" onClick={() => handleOpenModal()}>
        생성
      </Button>
      <UserModal
        isOpen={isOpenModal}
        toggle={toggleModal}
        user={selectedUser}
      />
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
                    <td>
                      <Button
                        className="bg-slate-500"
                        onClick={() => handleOpenModal(user)}
                      >
                        수정
                      </Button>
                    </td>
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
