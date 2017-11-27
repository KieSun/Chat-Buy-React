import {
  REGISTER
} from './type'

export function regiser({user, pwd, type}) {
  console.log(user)
  return {type: REGISTER, payload: user}
}