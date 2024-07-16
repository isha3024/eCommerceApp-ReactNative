import { _userAdd } from "../../services"

export const userAdd = body => {
  return () => {
    return _userAdd(body)
    .then(response => {
      console.log(response)
      return response
    })
    .catch(error => {
      console.log(error)
      return error
    })
  }
}