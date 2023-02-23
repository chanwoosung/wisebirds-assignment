import { atom } from "recoil"
import { Auth } from "../../type"

export const authAtom = atom({
  key: "authAtom",
  default: {
    level: Auth.guest
  }
})