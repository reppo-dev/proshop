package models

import "gorm.io/gorm"

type Address struct {
	gorm.Model
	UserID uint `json:"user_id"`
	UserAddress string `json:"user_address"`
	City string `json:"city"`
	PostalCode string `json:"postal_code"`
	Country string `json:"country"`
}