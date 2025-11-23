package routes

import (
    "schedulerapp/controllers"
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
)

func TaskRoutes(r *gin.Engine, db *gorm.DB) {
    r.GET("/tasks", controllers.GetTasks(db))
    r.PATCH("/tasks/:id/toggle", controllers.ToggleTaskStatus(db))
}
