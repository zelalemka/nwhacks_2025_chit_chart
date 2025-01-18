# run everytime
linux https://fastapi.tiangolo.com/virtual-environments/#activate-the-virtual-environment 
windows powershell `nw2025\Scripts\Activate.ps1` `Get-Command python` `python -m pip install --upgrade pip` `pip install "fastapi[standard]"`

# Initialization
`python -m venv .venv`


# Supabase
org: nwHacks2025
pwd: EUzJv9gjMyaxJ3NS
project_id: kbunoygknhuzlucepxhn
database_restful_endpoint: https://kbunoygknhuzlucepxhn.supabase.co
api_key: REDACTED


# Terraform validation
`terraform -help`
- to init follow this [link](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
`terraform apply` Provision the NGINX server container with apply
`terraform destroy` to stop the NGINX server you are serving

# python packages
matplotlib
pandas
scikit-learn
requests
numpy
spacy
supabase
fastapi