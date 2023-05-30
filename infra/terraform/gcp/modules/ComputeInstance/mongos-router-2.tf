resource "google_compute_instance" "mongos_router_2" {
  boot_disk {
    auto_delete = false
    source      = "mongos-router-2"
  }

  labels = {
    "env"  = "prod"
  }

  machine_type = "e2-medium"

  metadata = {
    startup-script = "sudo ufw allow ssh"
  }

  name = "mongos-router-2"

  network_interface {
    access_config {
      network_tier = "PREMIUM"
    }

    network    = "default"
    network_ip = "10.132.0.56"
  }

  project = var.project_id

  reservation_affinity {
    type = "ANY_RESERVATION"
  }

  scheduling {
    automatic_restart   = true
    on_host_maintenance = "MIGRATE"
    provisioning_model  = "STANDARD"
  }

  service_account {
    email  = "${var.project_number}-compute@developer.gserviceaccount.com"
    scopes = ["https://www.googleapis.com/auth/devstorage.read_write", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/trace.append"]
  }

  tags = ["http-server", "https-server"]
  zone = var.zone["d"]
}
# terraform import google_compute_instance.mongos_router_2 projects/${var.project_id}/zones/${var.zone["b"]}/instances/mongos-router-2
