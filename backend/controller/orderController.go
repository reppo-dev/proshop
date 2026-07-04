package controller

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/reppo/backend-ecommerce/database"
	"github.com/reppo/backend-ecommerce/models"
	"github.com/reppo/backend-ecommerce/utils"
)

func AllOrders(c fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)
	
	defer cancel()

	var order []models.Order

	if err := database.DB.WithContext(ctx).Find(&order).Error; err!=nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found orders"})
	}

	return c.JSON(order)
}


func AllUserOrder(c fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	cookie := c.Cookies("jwt")
	if cookie =="" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Missing token"})
	}

	userId,err := utils.ParseJwt(cookie)

	if err!=nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	var order []models.Order

	result := database.DB.WithContext(ctx).Where("user_id = ?",userId).Preload("Items.Product").Order("created_at desc").Find(&order)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed to fetch order"})
	}

	return c.JSON(fiber.Map{
		"orders":order,
		"count":len(order),
	})
}