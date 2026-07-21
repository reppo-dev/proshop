package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/reppo/backend-ecommerce/database"
	"github.com/reppo/backend-ecommerce/router"
)

func main() {

	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"https://proshop-pied.vercel.app", "http://localhost:5173"},
    	AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
    	AllowHeaders: []string{"Content-Type", "Authorization"},
    	AllowCredentials: true,
	}))

	router.Router(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Fatal(app.Listen("0.0.0.0:" + port))

}