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


func ParseJwt(cookie string) (uint,error) {
	token,err := jwt.ParseWithClaims(cookie,&jwt.RegisteredClaims{},func(t *jwt.Token) (any, error) {
		return  []byte(SECRET),nil
	})
	if err!= nil {
		return 0,err
	}

	claim , ok := token.Claims.(*jwt.RegisteredClaims)

	if !ok || !token.Valid {
		return 0,jwt.ErrTokenInvalidClaims
	}

	userId,err := strconv.ParseUint(claim.Issuer,10,64)

	if err!=nil{
		return 0,err
	}

	return uint(userId),nil
}