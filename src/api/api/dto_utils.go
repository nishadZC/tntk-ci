package api

import (
	"os"
	"strings"
)

func getDbHost() string{
  host := readValueFromSsmIfSsmPathProvided(os.Getenv("DB_HOST"))
  if strings.Contains(host, ":") {
	  return strings.Split(host, ":")[0]
  }
  return host
}

func getDbPort() string{
  return readValueFromSsmIfSsmPathProvided(os.Getenv("DB_PORT"))
}

func getDbUsername() string{
  return readValueFromSsmIfSsmPathProvided(os.Getenv("DB_USERNAME"))
}

func getDbPassword() string{
  return readValueFromSsmIfSsmPathProvided(os.Getenv("DB_PASSWORD"))
}

func getDbName() string{
  return readValueFromSsmIfSsmPathProvided(os.Getenv("DB_NAME"))
}