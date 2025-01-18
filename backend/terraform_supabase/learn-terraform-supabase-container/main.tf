terraform {
  required_providers {
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }
}

provider "supabase" {
  access_token = file("${path.cwd}/access-token")
}

# Define a linked project variable as user input
variable "linked_project" {
  type = string
}

# Import the linked project resource
import {
  to = supabase_project.production
  id = var.linked_project
}

resource "supabase_project" "production" {
  organization_id   = "<TODO>"
  name              = "nwHacks2025"
  database_password = "<TODO>"
  region            = "us-west-1"

  lifecycle {
    ignore_changes = [database_password]
  }
}

# Configure api settings for the linked project
resource "supabase_settings" "production" {
  project_ref = var.linked_project

  api = jsonencode({
    db_schema            = "public,storage,graphql_public"
    db_extra_search_path = "public,extensions"
    max_rows             = 1000
  })
}
