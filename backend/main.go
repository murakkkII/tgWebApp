package backend

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/user-auth", controllers.Index)
	r.GET("/user-auth/:id", controllers.Show)

	auth := r.Group("/")
	auth.Use(controllers.TelegramAuthMiddleware())
	{
		auth.POST("/user-auth", controllers.Create)       // создание профиля
		auth.PATCH("/user-auth/:id", controllers.Update)  // обновление своего профиля
		auth.DELETE("/user-auth/:id", controllers.Delete) // удаление своего профиля
	}

	r.Run(":5173") // запускаем сервер на порту 5173
}
