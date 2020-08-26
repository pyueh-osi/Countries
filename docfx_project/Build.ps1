# Build all our sources

Write-Host "Building metadata..."
docfx metadata docfx.json

Write-Host "Building articles..."
docfx build docfx.json

Write-Host "Building PDF..."
docfx pdf docfx.json


# Copy our pdf to the _site

copy .\_site_pdf\*.pdf .\_site


