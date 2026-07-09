package controller

import (
	"context"
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/reppo/backend-ecommerce/database"
	"github.com/reppo/backend-ecommerce/models"
	"github.com/reppo/backend-ecommerce/utils"
	"gorm.io/gorm"
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

func CreateAddress(c fiber.Ctx) error {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    cookie := c.Cookies("jwt")
    if cookie == "" {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token"})
    }

    userId, err := utils.ParseJwt(cookie)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token"})
    }

    var input models.Address
    if err := c.Bind().Body(&input); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
    }

    err = database.DB.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
        var existingAddress models.Address

        result := tx.Where("user_id = ?", userId).First(&existingAddress)

        if result.Error != nil {
            if errors.Is(result.Error, gorm.ErrRecordNotFound) {
                newAddress := models.Address{
                    UserID:      userId,
                    UserAddress: input.UserAddress,
                    City:        input.City,
                    PostalCode:  input.PostalCode,
                    Country:     input.Country,
                }
                return tx.Create(&newAddress).Error
            }
            return result.Error
        }

        existingAddress.UserAddress = input.UserAddress
        existingAddress.City = input.City
        existingAddress.PostalCode = input.PostalCode
        existingAddress.Country = input.Country

        return tx.Save(&existingAddress).Error
    })

    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to save address: " + err.Error(),
        })
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message": "Address saved successfully",
    })
}