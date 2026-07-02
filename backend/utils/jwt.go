package utils

import (
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var SECRET = "secert"

func GeneratJwt(userId uint) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		Issuer:    strconv.Itoa(int(userId)),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
	})


	return token.SignedString([]byte(SECRET))
}