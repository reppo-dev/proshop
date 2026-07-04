package controller

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/reppo/backend-ecommerce/database"
	"github.com/reppo/backend-ecommerce/models"
)

func AllCategory(c fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	var category []models.Category

	if err := database.DB.WithContext(ctx).Find(&category).Error;err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed find category"})
	}

	return c.JSON(category)
}

