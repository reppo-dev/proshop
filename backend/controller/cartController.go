package controller

import (
	"context"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/reppo/backend-ecommerce/database"
	"github.com/reppo/backend-ecommerce/models"
	"github.com/reppo/backend-ecommerce/utils"
	"gorm.io/gorm"
)

func GetCart(c fiber.Ctx) error {

	ctx,cancel := context.WithTimeout(context.Background(),5*time.Second)

	defer cancel()

	cookie := c.Cookies("jwt")
	if cookie =="" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	userId,err := utils.ParseJwt(cookie)

	if err!=nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	var cart models.Cart

	result := database.DB.WithContext(ctx).Where("user_id = ?",userId).Preload("Items.Product").First(&cart)

	if result.Error == gorm.ErrRecordNotFound {
		cart := models.Cart{UserID: userId}
		if err := database.DB.Create(&cart).Error;err!=nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed to create cart"})
		}

		return c.JSON(fiber.Map{
		"cart":cart,
		"items":[]models.CartItem{},
		"total":0,
	})
	}


	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed to fetch cart"})
	}


	var total float64
	for _,item := range cart.Items {
		total += item.Price * float64(item.Quantity)
	}

	return  c.JSON(fiber.Map{"cart":cart,"items":cart.Items,"total":total,"count":len(cart.Items)})
}


func AddToCart(c fiber.Ctx) error {
	ctx,cancel:= context.WithTimeout(context.Background(),5*time.Second)

	defer cancel()

	cookie := c.Cookies("jwt")
	if cookie == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Missing authentication token"})
	}

	userID,err := utils.ParseJwt(cookie)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	var req struct{
		ProductID uint `json:"product_id"`
		Quantity int `json:"quantity"`
	}

	if err := c.Bind().Body(&req);err!=nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	if req.ProductID == 0{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Product ID is required"})
	}
	
	if req.Quantity <= 0 {
		req.Quantity = 1
	}

	var cart models.Cart

	result := database.DB.WithContext(ctx).Where("user_id = ?",userID).First(&cart)

	if result.Error == gorm.ErrRecordNotFound {
		cart := models.Cart{UserID: userID}
		if err := database.DB.Create(&cart).Error; err!= nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed to create cart"})
		}

	} else if result.Error !=nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Database error"})
	}

	var product models.Product
	if err := database.DB.First(&product,req.ProductID).Error;err!=nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Product not found"})
	}

	var existingItem models.CartItem
	 err = database.DB.Where("cart_id = ? AND product_id = ?", cart.ID, req.ProductID).First(&existingItem).Error

	 if err == nil {
		existingItem.Quantity += req.Quantity
		if err := database.DB.Save(&existingItem).Error;err!=nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error":"Failed to update cart",
			})
		}
	 } else if err == gorm.ErrRecordNotFound {
		newItem := models.CartItem{
			CartID: cart.ID,
			ProductID: req.ProductID,
			Quantity: req.Quantity,
			Price: float64(product.Price),
		}

		if err:= database.DB.Create(&newItem).Error;err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed add to cart"})
		}
	 } else {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Database error"})
	 }

	 return  c.JSON(fiber.Map{
		"message":"Product added to cart successfully",
	 })

	}

	func UpdateCartItem(c fiber.Ctx) error {
		ctx,cancel := context.WithTimeout(context.Background(),5 * time.Second)

		defer cancel()

		var item struct{
			Quantity int `json:"quantity"`
		}

		id,err := strconv.Atoi(c.Params("id"))

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request id"})
		}

		if err := c.Bind().Body(&item);err != nil{
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
		}

		var cartItem models.CartItem

		if err := database.DB.WithContext(ctx).First(&cartItem,id).Error;err!=nil{
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Failed find cart item"})
		}

		cartItem.Quantity = item.Quantity
		if cartItem.Quantity <= 0 {
			cartItem.Quantity = 1
		}

		if err:= database.DB.WithContext(ctx).Save(&cartItem).Error;err!=nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed update cart item"})
		}

		return c.JSON(fiber.Map{"message":"success update cart item"})
}


func DeleteCartitem(c fiber.Ctx) error {
	cookie:= c.Cookies("jwt")

	if cookie == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	userId,err := utils.ParseJwt(cookie)

    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Invalid or expired token",
        })
    }

	var cart models.Cart

	if err := database.DB.Where("user_id = ?",userId).First(&cart).Error;err!=nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Failed found cart"})
	}

	itemId , err:= strconv.ParseUint(c.Params("id"),10,32)

	    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid item ID",
        })
    }

	result := database.DB.Where("id = ? AND cart_id = ?",itemId,cart.ID).Delete(&models.CartItem{})

	if result.RowsAffected == 0{
		return c.Status(404).JSON(fiber.Map{"erroe":"Item not found in your chat"})
	}

	return  c.JSON(fiber.Map{"message":"Item deleted"})

}
