import { Modal, ModalHeader } from "reactstrap";
import { IUserModalProps } from "../type";

export function ErrorModal({ isOpen, toggle, user }: IUserModalProps) {
  console.log(process.env.REACT_APP_ETHER_CHAIN);
  console.log(process.env.REACT_APP_HELP_DESK);
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <span>에러가 발생했습니다.</span>
        </ModalHeader>
        <div className="flex flex-col gap-8">
          <span>
            <span>같은 현상이 반복되면 고객센터로 문의 바랍니다.</span>
          </span>
          <span>
            고객센터
            <br />
            <span>- email : {process.env.REACT_APP_HELP_DESK}</span>
          </span>
        </div>
      </Modal>
    </>
  );
}
