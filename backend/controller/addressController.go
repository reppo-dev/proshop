package controller

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/reppo/backend-ecommerce/database"
	"github.com/reppo/backend-ecommerce/models"
	"github.com/reppo/backend-ecommerce/utils"
)

func UserAddress(c fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	cookie:= c.Cookies("jwt")

	if cookie =="" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	userId ,err := utils.ParseJwt(cookie)

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	var addres []models.Address

	if err := database.DB.WithContext(ctx).Where("user_id = ?",userId).Find(&addres).Error; err !=nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found address"})
	}

	return c.JSON(addres)
}