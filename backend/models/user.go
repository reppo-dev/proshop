package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"-"`
	IsAdmin bool `json:"is_admin"`
}

type ModelRegister struct {
    Name            string `json:"name"`
    Email           string `json:"email"`
    Password        string `json:"password"`
    ConfirmPassword string `json:"confirm_password"`
}


type Login struct {
	Email           string `json:"email"`
    Password        string `json:"password"`
}