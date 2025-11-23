package controllers

import (
    "net/http"
    "schedulerapp/models"
    "gorm.io/gorm"

    "github.com/gin-gonic/gin"
)

func GetTasks(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        var tasks []models.TaskProject
        if err := db.Find(&tasks).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, tasks)
    }
}

func ToggleTaskStatus(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        id := c.Param("id")
        var task models.TaskProject

        if err := db.First(&task, id).Error; err != nil {
            c.JSON(404, gin.H{"error": "Task not found"})
            return
        }

        // Toggle status
        if task.Status == "done" {
            task.Status = "pending"
        } else {
            task.Status = "done"
        }

        db.Save(&task)

        c.JSON(200, task)
    }
}

