# run everytime
linux https://fastapi.tiangolo.com/virtual-environments/#activate-the-virtual-environment 
windows powershell `.\.venv\Scripts\activate` `Get-Command python` `python -m pip install --upgrade pip` `pip install "fastapi[standard]"`
pip install azure-ai-inference
<!-- Export environment variable -->
$Env:GITHUB_TOKEN="<Your GitHub access token here>" 

# Initialization
`python -m venv .venv`


# Supabase
org: nwHacks2025
pwd: mhsatlgwdnlnvbacmcue
project_id: 
database_restful_endpoint: https://mhsatlgwdnlnvbacmcue.supabase.co
api_key: REDACTED

# Supabase
https://supabase.com/docs/guides/self-hosting/docker

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
"fastapi[standard]"
azure-ai-inference

