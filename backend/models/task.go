package models

import "time"

type TaskProject struct {
    ID          	uint   `gorm:"primaryKey" json:"id"`
    Title       string `json:"title"`
    Description 	string `json:"description"`
    Status      	string `json:"status"`
	DueDate 		time.Time `json:"due_date"`
	DlTime 		time.Time `json:"dl_time"`
    Project    	string `json:"project"`
}

func (TaskProject) TableName() string {
    return "tasks_project"
}