package models

import "time"

type User struct {
	UserID     string   `json:"user_id"`
	UserPeerID string   `json:"user_peer_id"`
	Settings   Settings `json:"settings"`
	Meta       Meta     `json:"meta"`
}

type Settings struct {
	Username      string `json:"username"`
	Difficulty    string `json:"difficulty"`
	QuestionCount int    `json:"questionCount"`
	Sound         bool   `json:"sound"`
	Volume        int    `json:"volume"`
	Animations    bool   `json:"animations"`
	Notifications bool   `json:"notifications"`
}

type Meta struct {
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Platform  string    `json:"platform"`
}

func NewUser(
	userID string,
	userPeerID string,
	username string,
	difficulty string,
	questionCount int,
	sound bool,
	volume int,
	animations bool,
	notifications bool,
	platform string,
) *User {
	now := time.Now().UTC()

	return &User{
		UserID:     userID,
		UserPeerID: userPeerID,
		Settings: Settings{
			Username:      username,
			Difficulty:    difficulty,
			QuestionCount: questionCount,
			Sound:         sound,
			Volume:        volume,
			Animations:    animations,
			Notifications: notifications,
		},
		Meta: Meta{
			CreatedAt: now,
			UpdatedAt: now,
			Platform:  platform,
		},
	}
}

func (u *User) UpdateTimestamp() {
	u.Meta.UpdatedAt = time.Now().UTC()
}
