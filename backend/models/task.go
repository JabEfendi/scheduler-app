package models

import "time"

type TaskProject struct {
    ID          	uint   `gorm:"primaryKey" json:"id"`
    Name_Task       string `json:"title"`
    Description 	string `json:"description"`
    Status      	string `json:"status"`
	Task_In 		time.Time `json:"due_date"`
}

func (TaskProject) TableName() string {
    return "tasks_project"
}