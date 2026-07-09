package router

import (
	"github.com/gofiber/fiber/v3"
	"github.com/reppo/backend-ecommerce/controller"
)

func Router(app *fiber.App) {
	app.Post("/register",controller.Register)
	app.Post("/login",controller.Login)

	app.Get("/products",controller.AllProduct)
	app.Get("/product/:id",controller.ProductIngo)

	app.Get("/getcart",controller.GetCart)
	app.Post("/addtocart",controller.AddToCart)
	app.Put("/updatecartitem/:id",controller.UpdateCartItem)
	app.Delete("/deletecartitem/:id",controller.DeleteCartitem)

	app.Put("/createaddress",controller.CreateAddress)

	app.Get("/useraddress",controller.UserAddress)
	app.Post("/logout",controller.Logout)
	app.Post("/createorder",controller.CreateOrder)
	app.Get("/allorder",controller.AllOrders)
	app.Get("/userorder",controller.AllUserOrder)
}
