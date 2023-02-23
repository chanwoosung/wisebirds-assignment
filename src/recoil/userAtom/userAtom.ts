import { atom } from "recoil"

export const userAtom = atom({
  key: "userAtom",
  default: {
    name: "홍길동",
    email: "abc@abc.com",
    company: "와이즈버즈",
  }
})