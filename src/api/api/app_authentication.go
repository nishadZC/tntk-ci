package api

type userAuthenticationData struct {
  Username     string
  Token        string
  IsAuthorized bool
  Message      string
}