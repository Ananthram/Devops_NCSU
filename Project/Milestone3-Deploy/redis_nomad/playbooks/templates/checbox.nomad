job "checkbox" {
  datacenters = [ "dc1" ]
  group "default" {
    task "check" {
      driver = "raw_exec"
      env {
        "MONGO_PORT" = "3002"
        "MONGO_IP" = "127.0.0.1"
        "MONGO_USER" = "admin"
        "MONGO_PASSWORD" = "admin"
      }
      config {
        command = "/usr/bin/nodejs"
        args = [
          "/home/checkboxio/server-side/site/server.js" 
        ]
      }
    }
  }
}