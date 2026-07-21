package controller

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/reppo/backend-ecommerce/database"
	"github.com/reppo/backend-ecommerce/models"
	"github.com/reppo/backend-ecommerce/utils"
	"golang.org/x/crypto/bcrypt"
)

func Register(c fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),time.Second * 30)
	defer cancel()

	var data models.ModelRegister

	if err := c.Bind().Body(&data); err != nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	if data.Password != data.ConfirmPassword {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Password not match"})
	}

	hashpassword,err := bcrypt.GenerateFromPassword([]byte(data.Password),14)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Invalid server hash password"})
	}



	user := models.User{
		Email: data.Email,
		Password: string(hashpassword),
	}

	if err:= database.DB.WithContext(ctx).Where("email = ?",data.Email).First(&user).Error;err ==nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"This user have account"})
	}

	if err := database.DB.WithContext(ctx).Create(&user).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed create user"})
	}

	token , err := utils.GeneratJwt(user.ID)

	
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	cookie := fiber.Cookie{
		Name: "jwt",
		Value: token,
		Expires: time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	
	return c.JSON(fiber.Map{"message":"Sign up successfully"})
}

func Login(c fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),time.Second * 30)
	defer cancel()

	var data models.Login

	if err := c.Bind().Body(&data); err != nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	var user models.User

	if err := database.DB.WithContext(ctx).Where("email = ?",data.Email).First(&user).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Invalid email or password"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password),[]byte(data.Password)); err!= nil{
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid email or password",})
	}

	token,err := utils.GeneratJwt(user.ID)

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	cookie := fiber.Cookie{
		Name: "jwt",
		Value: token,
		Expires: time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{"message":"Login successfully"})
}


func Logout(c fiber.Ctx) error {
	cookie:= fiber.Cookie{
		Name: "jwt",
		Value: "",
		Expires: time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{"message":"Logout successfully"})
}