package controller

import (
	"context"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/reppo/backend-ecommerce/database"
	"github.com/reppo/backend-ecommerce/models"
)

func AllProduct(c fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),time.Second * 5)
	defer cancel()

	var products []models.Product

	if err := database.DB.WithContext(ctx).Find(&products).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found products"})
	}

	return c.JSON(products)
}


func ProductIngo(c fiber.Ctx) error {

	ctx,cancel := context.WithTimeout(context.Background(),5 *time.Second)
	defer cancel()

	id,err := strconv.Atoi(c.Params("id"))

	if err!=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid product id"})
	}

	var product models.Product

	if err:= database.DB.WithContext(ctx).First(&product,id).Error;err!=nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found product"})
	}

	return c.JSON(product)

}