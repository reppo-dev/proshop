package main

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/reppo/backend-ecommerce/database"
	"github.com/reppo/backend-ecommerce/router"
)

func main() {

	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
    	AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
    	AllowHeaders: []string{"Content-Type", "Authorization"},
    	AllowCredentials: true,
	}))

	router.Router(app)

	app.Listen(":8000")

}