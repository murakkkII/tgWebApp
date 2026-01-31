package controllers

import (
	"net/http"
	"sync"

	"backend/models"

	"github.com/gin-gonic/gin"
)

var (
	users map[string]*models.User = make(map[string]*models.User)
	mu    sync.RWMutex
)

func TelegramAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		platform := c.GetHeader("X-Platform")
		if platform != "telegram_webapp" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Пожалуйста, войдите через Telegram"})
			c.Abort()
			return
		}

		userID := c.GetHeader("X-User-ID")
		if userID == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		c.Set("userID", userID)
		c.Next()
	}
}

type CreateInput struct {
	Username string `json:"username" binding:"required"`
}

func Create(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	id := userID.(string)

	mu.RLock()
	_, alreadyExists := users[id]
	mu.RUnlock()

	if alreadyExists {
		c.JSON(http.StatusConflict, gin.H{"error": "profile already exists"})
		return
	}

	var input CreateInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.NewUser(
		id,
		id,
		input.Username,
		"normal",
		10,
		true,
		80,
		true,
		true,
		"telegram_webapp",
	)

	mu.Lock()
	users[id] = user
	mu.Unlock()

	c.JSON(http.StatusCreated, user)
}

func Index(c *gin.Context) {
	mu.RLock()
	list := make([]*models.User, 0, len(users))
	for _, u := range users {
		list = append(list, u)
	}
	mu.RUnlock()

	c.JSON(http.StatusOK, gin.H{"users": list})
}

func Show(c *gin.Context) {
	id := c.Param("id")

	mu.RLock()
	user, exists := users[id]
	mu.RUnlock()

	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func Update(c *gin.Context) {
	userID, _ := c.Get("userID")
	id := userID.(string)

	if c.Param("id") != id {
		c.JSON(http.StatusForbidden, gin.H{"error": "you can only update your own profile"})
		return
	}

	mu.RLock()
	user, exists := users[id]
	mu.RUnlock()

	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "profile not found"})
		return
	}

	var payload map[string]interface{}
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if username, ok := payload["username"].(string); ok {
		user.Settings.Username = username
	}
	if difficulty, ok := payload["difficulty"].(string); ok {
		user.Settings.Difficulty = difficulty
	}
	if questionCount, ok := payload["questionCount"].(float64); ok {
		user.Settings.QuestionCount = int(questionCount)
	}
	if sound, ok := payload["sound"].(bool); ok {
		user.Settings.Sound = sound
	}
	if volume, ok := payload["volume"].(float64); ok {
		user.Settings.Volume = int(volume)
	}
	if animations, ok := payload["animations"].(bool); ok {
		user.Settings.Animations = animations
	}
	if notifications, ok := payload["notifications"].(bool); ok {
		user.Settings.Notifications = notifications
	}

	user.UpdateTimestamp()

	mu.Lock()
	users[id] = user
	mu.Unlock()

	c.JSON(http.StatusOK, user)
}

func Delete(c *gin.Context) {
	userID, _ := c.Get("userID")
	id := userID.(string)

	if c.Param("id") != id {
		c.JSON(http.StatusForbidden, gin.H{"error": "you can only delete your own profile"})
		return
	}

	mu.RLock()
	_, exists := users[id]
	mu.RUnlock()

	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	mu.Lock()
	delete(users, id)
	mu.Unlock()

	c.JSON(http.StatusOK, gin.H{"success": true})
}
