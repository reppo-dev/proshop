package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/reppo/backend-ecommerce/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	err := godotenv.Load()

	if err != nil {
		log.Fatalln("We can't load env file ,error:",err)
	}

	dns := os.Getenv("dns")

	db, err := gorm.Open(postgres.Open(dns),&gorm.Config{})

	if err != nil {
		log.Fatalln("Somthing wrong , you can't connected in database , error:",err)
	}

	DB = db

	db.AutoMigrate(&models.User{},&models.Product{},&models.Cart{},&models.CartItem{},&models.Category{},&models.Address{})
}