package main

import (
    "fmt"
    "log"
    "schedulerapp/routes"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "github.com/gin-gonic/gin"
)

func main() {
    dsn := "host=localhost user=postgres password=Mahatahu dbname=SchedulerApp port=5432 sslmode=disable"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database: ", err)
    }
    fmt.Println("Database connected!")

    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "pong"})
    })
    routes.TaskRoutes(r, db)


    r.Run("0.0.0.0:8080")
}
