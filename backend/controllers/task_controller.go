package controllers

import (
    "net/http"
    "strconv"
    "schedulerapp/models"
    "gorm.io/gorm"
    "github.com/gin-gonic/gin"
    // "fmt"
    "time"
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
        idParam := c.Param("id")
        idUint, err := strconv.ParseUint(idParam, 10, 32)
        if err != nil {
            c.JSON(400, gin.H{"error": "Invalid task ID"})
            return
        }

        var task models.TaskProject
        if err := db.First(&task, uint(idUint)).Error; err != nil {
            c.JSON(404, gin.H{"error": "Task not found"})
            return
        }

        if task.Status == "done" {
            task.Status = "pending"
            task.DueDate = time.Time{}
        } else {
            task.Status = "done"
            task.DueDate = time.Now()
        }

        if err := db.Save(&task).Error; err != nil {
            c.JSON(500, gin.H{"error": "Failed to update task status"})
            return
        }

        // fmt.Printf("Task ID %d status changed from %s to %s\n", task.ID, oldStatus, task.Status)
        c.JSON(200, task)
    }
}

func AddTask(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        var task models.TaskProject

        if err := c.ShouldBindJSON(&task); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": "Invalid JSON: " + err.Error(),
            })
            return
        }

        if task.Title == "" {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Title wajib diisi"})
            return
        }

        if task.Status == "" {
            task.Status = "pending"
        }

        if err := db.Create(&task).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": "Gagal menambahkan task",
            })
            return
        }


        c.JSON(http.StatusOK, gin.H{
            "message": "Task berhasil ditambahkan",
            "task":    task,
        })
    }
}

func UpdateTask(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        idUint, err := strconv.ParseUint(idParam, 10, 32)
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
            return
        }

        var task models.TaskProject
        if err := db.First(&task, uint(idUint)).Error; err != nil {
            c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
            return
        }

        // pakai struct input supaya bisa partial update
        var input struct {
            Title       *string   `json:"title"`
            Description *string   `json:"description"`
            Status      *string   `json:"status"`
            DueDate     *time.Time `json:"due_date"`
            DlTime      *time.Time `json:"dl_time"`
            Project     *string   `json:"project"`
        }

        if err := c.ShouldBindJSON(&input); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        if input.Title != nil {
            task.Title = *input.Title
        }
        if input.Description != nil {
            task.Description = *input.Description
        }
        if input.Status != nil {
            task.Status = *input.Status
        }
        if input.DueDate != nil {
            task.DueDate = *input.DueDate
        }
        if input.DlTime != nil {
            task.DlTime = *input.DlTime
        }
        if input.Project != nil {
            task.Project = *input.Project
        }

        if err := db.Save(&task).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
            return
        }

        c.JSON(http.StatusOK, task)
    }
}

func DeleteTask(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        idUint, err := strconv.ParseUint(idParam, 10, 32)
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
            return
        }

        if err := db.Delete(&models.TaskProject{}, uint(idUint)).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete task"})
            return
        }

        c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
    }
}

