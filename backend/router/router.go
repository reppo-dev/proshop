package router

import (
	"github.com/gofiber/fiber/v3"
	"github.com/reppo/backend-ecommerce/controller"
)

func Router(app *fiber.App) {
	app.Post("/register",controller.Register)
	app.Post("/login",controller.Login)
	app.Get("/products",controller.AllProduct)

	app.Get("/getcart",controller.GetCart)
	app.Post("/addtocart",controller.AddToCart)
	app.Put("/updatecartitem/:id",controller.UpdateCartItem)
	app.Delete("/deletecartitem",controller.DeleteCartitem)
}