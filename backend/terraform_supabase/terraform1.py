# Supabase Provider Configuration
provider "supabase" {
  supabase_api_url     = "https://api.supabase.io"   # Base API URL for Supabase
  supabase_api_key     = var.supabase_api_key       # Your Supabase API Key
  organization_id      = var.supabase_org_id        # Your Supabase Organization ID
  project_ref          = var.supabase_project_ref   # Reference ID of the Supabase Project
}

# Create a Supabase Database Instance
resource "supabase_instance" "db_instance" {
  name          = "hackathon-db"               # Name of the database instance
  plan          = "pro"                        # The subscription plan (e.g., free, pro, enterprise)
  region        = "us-east-1"                  # Region for the database instance
  disk_size_gb  = 10                           # Disk size in GB for the database
  description   = "Database for Hackathon App" # Description of the instance

  # User and password for database access
  credentials {
    username = "admin"
    password = var.db_password                # Avoid hardcoding passwords; use variables or secrets.
  }
}

# Output the Supabase Database Connection URL
output "supabase_db_url" {
  value = supabase_instance.db_instance.connection_url
  description = "Connection URL for the Supabase database"
}

'''
Terraform is an open-source Infrastructure as Code (IaC) tool developed by HashiCorp.
It allows you to define, provision, and manage infrastructure in a declarative configuration language called HCL
(HashiCorp Configuration Language). Terraform is cloud-agnostic, meaning it can work with multiple cloud providers,
such as AWS, Azure, Google Cloud, and even on-premise solutions.
'''