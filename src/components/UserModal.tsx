import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  IBaseResponse,
  IGetUserData,
  IUserModalForm,
  IUserModalProps,
} from "../type";

export function UserModal({ isOpen, toggle, user }: IUserModalProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IUserModalForm>({
    defaultValues: {
      inputId: user?.email ?? undefined,
      inputName: user?.name ?? undefined,
    },
  });
  const [PW, setPW] = useState("");
  const queryClient = useQueryClient();
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const closeModal = () => {
    toggle();
    reset();
  };
  const onSubmit = (data: IUserModalForm) => {
    user ? editUserData(data) : addUserData(data);
    closeModal();
  };
  const editUserData = (data: IUserModalForm) => {
    const userData = queryClient.getQueryData<IBaseResponse<IGetUserData>>([
      "getUserData",
      {
        page: Number(urlParams.get("page")) ?? 1,
        size: 25,
      },
    ]);
    if (userData === undefined) return;
    queryClient.setQueryData<IBaseResponse<IGetUserData>>(
      [
        "getUserData",
        {
          page: Number(urlParams.get("page")) ?? 1,
          size: 25,
        },
      ],
      () =>
        ({
          ...userData,
          content: userData.content.map((item) => {
            if (user?.id === item.id)
              return {
                ...item,
                name: data.inputName,
              };
            else return item;
          }),
        } as IBaseResponse<IGetUserData>)
    );
  };
  const addUserData = (data: IUserModalForm) => {
    const userData = queryClient.getQueryData<IBaseResponse<IGetUserData>>([
      "getUserData",
      {
        page: Number(urlParams.get("page")) ?? 1,
        size: 25,
      },
    ]);
    if (userData === undefined) return;
    userData.content.push({
      email: data.inputId,
      id: userData.content[userData.content.length - 1].id + 1,
      last_login_at: new Date().toISOString(),
      name: data.inputName,
    } as IGetUserData);
    queryClient.setQueryData<IBaseResponse<IGetUserData>>(
      [
        "getUserData",
        {
          page: Number(urlParams.get("page")) ?? 1,
          size: 25,
        },
      ],
      () =>
        ({
          ...userData,
        } as IBaseResponse<IGetUserData>)
    );
  };
  return (
    <>
      <Modal isOpen={isOpen} toggle={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={closeModal}>
            ????????? {user ? "??????" : "??????"}
          </ModalHeader>
          <ModalBody className="flex flex-col gap-2">
            <Controller
              name="inputId"
              defaultValue={user?.email ?? ""}
              control={control}
              rules={{
                required: "???????????? ??????????????????.",
                validate: {
                  minLength: (v) =>
                    v.length >= 9 || "????????? ????????? ????????? ???????????????.",
                  maxLength: (v) =>
                    v.length <= 50 || "????????? ????????? ????????? ???????????????.",
                  onlyNumbersAndLetters: (v) =>
                    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
                      v
                    ) || "????????? ????????? ????????? ???????????????.",
                },
              }}
              render={({
                field: { onChange, value },
                formState: { errors },
              }) => {
                return (
                  <>
                    <label>
                      <span className="min-w-[100px]">?????????</span>
                      {user ? (
                        <span>{user?.email}</span>
                      ) : (
                        <input
                          className="border rounded-md ml-1"
                          onChange={(e) => {
                            onChange(e);
                          }}
                          value={value}
                        />
                      )}
                    </label>
                    {errors?.inputId && (
                      <span className="text-red-600">
                        {errors.inputId.message}
                      </span>
                    )}
                  </>
                );
              }}
            />
            {user === undefined ? (
              <>
                <Controller
                  name="inputPW"
                  defaultValue={""}
                  control={control}
                  rules={{
                    required: "??????????????? ??????????????????.",
                    validate: {
                      minLength: (v) =>
                        v.length >= 8 ||
                        "8~15 ??? ??????, ??????, ??????????????? ???????????????",
                      maxLength: (v) =>
                        v.length <= 15 ||
                        "8~15 ??? ??????, ??????, ??????????????? ???????????????",
                      validate: (v) =>
                        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(
                          v
                        ) || "8~15 ??? ??????, ??????, ??????????????? ???????????????",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    formState: { errors },
                  }) => {
                    return (
                      <>
                        <label>
                          <span className="min-w-[100px]">????????????</span>
                          <input
                            className="border rounded-md ml-1"
                            onChange={(e) => {
                              onChange(e);
                              setPW(e.currentTarget.value);
                            }}
                            value={value}
                            placeholder="8~15 ??? ??????, ??????, ??????????????? ???????????????"
                            type={"password"}
                          />
                        </label>
                        {errors?.inputPW && (
                          <span className="text-red-600">
                            {errors.inputPW.message}
                          </span>
                        )}
                      </>
                    );
                  }}
                />
                <Controller
                  name="inputConfirmPW"
                  defaultValue={""}
                  control={control}
                  rules={{
                    required: "??????????????? ??????????????????.",
                    validate: {
                      confirmPassword: (v) =>
                        v === PW || " ??????????????? ???????????? ????????????.",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    formState: { errors },
                  }) => {
                    return (
                      <>
                        <label>
                          <span className="min-w-[100px]">???????????? ??????</span>
                          <input
                            className="border rounded-md ml-1"
                            onChange={(e) => {
                              onChange(e);
                            }}
                            value={value}
                            type={"password"}
                          />
                        </label>
                        {errors?.inputConfirmPW && (
                          <span className="text-red-600">
                            {errors.inputConfirmPW.message}
                          </span>
                        )}
                      </>
                    );
                  }}
                />
              </>
            ) : (
              <></>
            )}
            <Controller
              name="inputName"
              defaultValue={user?.name}
              control={control}
              rules={{
                required: "????????? ??????????????????.",
                validate: {
                  validate: (v) =>
                    /^[???-???|???-???|a-z|A-Z|]{1,16}$/.test(v) ||
                    "????????? ???????????? ???????????????. (??????, ????????????, ?????? ????????????)",
                },
              }}
              render={({
                field: { onChange, value },
                formState: { errors },
              }) => {
                console.log(value);
                return (
                  <>
                    <label>
                      <span className="min-w-[100px]">??????</span>
                      <input
                        className="border rounded-md ml-1"
                        onChange={(e) => {
                          onChange(e);
                        }}
                        defaultValue={user?.name}
                        value={value}
                      />
                    </label>
                    {errors?.inputName && (
                      <span className="text-red-600">
                        {errors.inputName.message}
                      </span>
                    )}
                  </>
                );
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button className="bg-bgSkyBlue" type="submit">
              {user ? "??????" : "??????"}
            </Button>
            <Button
              color="secondary"
              className="bg-gray-600"
              onClick={closeModal}
            >
              ??????
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
