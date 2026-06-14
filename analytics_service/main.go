package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Event struct {
	Action    string `json:"action"`
	Tier      string `json:"tier"`
	Timestamp string `json:"timestamp"`
}

var (
	events   []Event
	eventsMu sync.Mutex
)

func main() {
	r := gin.Default()

	// Enable CORS for frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/track", func(c *gin.Context) {
		var newEvent Event
		if err := c.ShouldBindJSON(&newEvent); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		newEvent.Timestamp = time.Now().Format(time.RFC3339)

		eventsMu.Lock()
		events = append(events, newEvent)
		eventsMu.Unlock()

		log.Printf("Analytics Event Received: Action=%s, Tier=%s", newEvent.Action, newEvent.Tier)

		c.JSON(http.StatusOK, gin.H{"status": "tracked successfully"})
	})

	r.GET("/stats", func(c *gin.Context) {
		eventsMu.Lock()
		defer eventsMu.Unlock()

		c.JSON(http.StatusOK, gin.H{
			"total_events": len(events),
			"events":       events,
		})
	})

	fmt.Println("🚀 Go Analytics Engine starting on port 8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
