package api

import "github.com/gin-gonic/gin"

func ValidateUserAuthenticationByPassword(ctx *gin.Context) (authorizationData *userAuthenticationData){
  username, password, ok := ctx.Request.BasicAuth()
  if ok {
      return handleUserBasicAuthenticationOnSuccessfulPasswordMatch(username, password)
  }

  return handleUserBasicAuthenticationOnFailure(username)
}

func handleUserBasicAuthenticationOnSuccessfulPasswordMatch(username, password string) (authorizationData *userAuthenticationData){
  user := GetUserByName(username)
  if user != nil && user.ID != 0 {
    if user.IsPasswordMatch(password) {
      token := getUuid()
      err := UpdateUserToken(user.Name, token)
      if err == nil {
        return newUserAuthorizationByPasswordDataOnUserAuthorized(user.Name, token, "Authorized")
      }
      return newUserAuthorizationByPasswordDataOnUserNotAuthorized(username, "Failed to update token")
    }
    return newUserAuthorizationByPasswordDataOnUserNotAuthorized(username, "Invalid password")
  }

  return newUserAuthorizationByPasswordDataOnUserNotAuthorized(username, "Invalid user")
}

func handleUserBasicAuthenticationOnFailure(username string) (authorizationData *userAuthenticationData){
  return newUserAuthorizationByPasswordDataOnUserNotAuthorized(username, "Invalid credentials format")
}


func newUserAuthorizationByPasswordDataOnUserAuthorized(username, token, message string) *userAuthenticationData {
  return &userAuthenticationData{
    Username:     username,
    Token:        token,
    IsAuthorized: true,
    Message:      message,
  }
}

func newUserAuthorizationByPasswordDataOnUserNotAuthorized(username, message string) *userAuthenticationData {
  return &userAuthenticationData{
    Username:     username,
    Token:        getUuid(),
    IsAuthorized: false,
    Message:      message,
  }
}