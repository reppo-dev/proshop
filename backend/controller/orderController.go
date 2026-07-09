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


func CreateOrder(c fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5 * time.Second)
	defer cancel()

	cookie:= c.Cookies("jwt")
	if cookie == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	userId,err := utils.ParseJwt(cookie)

	if err!=nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	var order models.Order
	err = database.DB.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		var cart models.Cart
		if err := tx.Where("user_id = ?",userId).Preload("Items.Product").First(&cart).Error; err != nil{
			return errors.New("Cart not found")
		}

		if len(cart.Items) == 0 {
			return errors.New("Cart is empty")
		}

		var totalAmount float64
		for _, item := range cart.Items{
			totalAmount += item.Price * float64(item.Quantity)
		}

		var address models.Address

		if err:= tx.Where("user_id = ?",userId).First(&address).Error;err!=nil{
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found address"})
		}

		order = models.Order{
			UserID: userId,
			Status: models.StatusPending,
			TotalAmount: totalAmount,
			OrderAddress: models.OrderAddress(address),
		}

		if err := tx.Create(&order).Error;err !=nil {
			return errors.New("Failed to create order")
		}

		for _,cartItem := range cart.Items{
			orderItem := models.OrderItem{
				OrderID: order.ID,
				ProductID: cartItem.ProductID,
				Quantity: cartItem.Quantity,
				Price: cartItem.Price,
			}

			if err:= tx.Create(&orderItem).Error;err!=nil {
				return errors.New("Failed to create order items")
			}
		}

		if err:= tx.Where("cart_id = ?",cart.ID).Delete(&models.CartItem{}).Error; err!=nil{
			return errors.New("Failed clear cart")
		}

		return nil

	})

	if err != nil {
  		return c.Status(fiber.StatusBadRequest).JSON(
     	   fiber.Map{"error": err.Error()},
    	)
	}

	var createdOrder models.Order
	database.DB.WithContext(ctx).Preload("Items.Product").First(&createdOrder,order.ID)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message":"Order created successfully","order":createdOrder})

}