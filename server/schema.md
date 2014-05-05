# LA Metro Data

Route:
  id: int
  display_name: String
  bg_color: String
  fg_color: String

Stops:
  id: int
  display_name: String
  latitude: float
  longitude: float

# Transitr Data

User:
  id: int
  first_name: String
  last_name: String
  email: String

Status:
  id: int
  user_id: int
  route_id: int
  stop_id: int
  text: String
  date_time: Timestamp
