package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name string `json:"name"`
	Image string `json:"image"`
	Description string `json:"description"`
	Brand string `json:"brand"`
	Category string `json:"category"`
	Price float32 `json:"price"`
	CountInStock float32 `json:"count_inStock"`
	Rating float32 `json:"rating"`
	NumReviews float32 `json:"num_reviews"`
	Categories  []Category `json:"categories,omitempty" gorm:"many2many:product_categories;"`
}