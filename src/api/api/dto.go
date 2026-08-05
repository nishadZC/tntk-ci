package api

import (
  "fmt"
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
  "log"
)

var gormDb *gorm.DB

func getGormDb() *gorm.DB{
  if gormDb == nil {
    gormDb, err = gorm.Open(postgres.Open(getDatabaseConnectionInfo()), &gorm.Config{})
    if err != nil {
      log.Panicf("failed to connect to database: { %s }", getDatabaseConnectionInfo())
    }
    err := gormDb.AutoMigrate(&User{})
    if err != nil {
      log.Printf("Error automatically creating User table: %v", err)
    }
  }

  return gormDb
}

func getDatabaseConnectionInfo() string {
  return fmt.Sprintf("host=%s port=%s user=%s "+
    "password=%s dbname=%s sslmode=require",
    getDbHost(), getDbPort(), getDbUsername(), getDbPassword(), getDbName())
}