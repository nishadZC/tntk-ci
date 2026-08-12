package api

import (
  "encoding/json"
  "fmt"
  "github.com/gin-gonic/gin"
  "io/ioutil"
  "net/http"
)

// PostAuthSignUp godoc
// @Summary Sign-up new user
// @Accept application/json
// @Produce json
// @Success 201 {string} {object} map[string]string
// @Router /auth/sign-up [post]
func PostAuthSignUp(ctx *gin.Context) {
  ctx.Header("Content-Type", "application/json")
  if ok, body := handleReadBody(ctx); ok {
    if ok, user := handleJsonUnmarshalUser(ctx, body); ok {
      if ok := handleValidateUser(ctx, *user); ok {
        if ok := handleCreateUser(ctx, *user); ok {
          handleSuccessfulSignUp(ctx, user.Name)
        }
      }
    }
  }
}

func handleValidateUser(ctx *gin.Context, user User) bool {
  if len(user.Password) < 8 {
    ctx.String(http.StatusBadRequest, `{"message": "Password must be at least 8 characters long"}`)
    return false
  }
  if len(user.Name) < 3 {
    ctx.String(http.StatusBadRequest, `{"message": "Username must be at least 3 characters long"}`)
    return false
  }
  return true
}


func handleReadBody(ctx *gin.Context) (ok bool, body []byte){
  body, err := ioutil.ReadAll(ctx.Request.Body)
  return ! handleFailedSignUpOnBodyReadError(ctx, err), body
}

func handleFailedSignUpOnBodyReadError(ctx *gin.Context, err error) (isErrorHit bool){
  if err != nil {
    ctx.String(http.StatusMethodNotAllowed, fmt.Sprintf("Error reading request body content: %v", err))
  }
  return err != nil
}


func handleJsonUnmarshalUser(ctx *gin.Context, body []byte) (ok bool, user *User){
  err := json.Unmarshal(body, &user)
  return ! handleFailedSignUpOnJsonUnmarshalError(ctx, err), user
}

func handleFailedSignUpOnJsonUnmarshalError(ctx *gin.Context, err error) (isErrorHit bool){
  if err != nil {
    ctx.String(http.StatusMethodNotAllowed, fmt.Sprintf("Error handling request body content: %v", err))
    return true
  }
  return false
}


func handleCreateUser(ctx *gin.Context, user User) (ok bool){
  err := CreateUser(user)
  return ! handleFailedSignUpOnUserCreationError(ctx, err)
}

func handleFailedSignUpOnUserCreationError(ctx *gin.Context, err error) (isErrorHit bool){
  if err != nil {
    ctx.String(http.StatusMethodNotAllowed, fmt.Sprintf("Error creating new user: %v", err))
  }
  return err != nil
}


func handleSuccessfulSignUp(ctx *gin.Context, username string) {
  ctx.String(http.StatusCreated, fmt.Sprintf(`{"user": "%s", "state": "created"}`, username))
}