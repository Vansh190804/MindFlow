# PowerShell script to package MindFlow Extension for distribution
# Run this from the Extension directory

Write-Host "🎁 Packaging MindFlow Browser Extension..." -ForegroundColor Cyan

# Get the current directory
$extensionDir = Get-Location
$outputDir = Join-Path (Split-Path $extensionDir -Parent) "extension-builds"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$zipName = "mindflow-extension-$timestamp.zip"
$zipPath = Join-Path $outputDir $zipName

# Create output directory if it doesn't exist
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
    Write-Host "✅ Created output directory: $outputDir" -ForegroundColor Green
}

# Files and folders to include
$itemsToInclude = @(
    "manifest.json",
    "background.js",
    "content-script.js",
    "auth-callback.html",
    "popup",
    "icons"
)

Write-Host "📦 Creating zip archive..." -ForegroundColor Yellow

# Create temporary directory for packaging
$tempDir = Join-Path $env:TEMP "mindflow-extension-temp"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy items to temp directory
foreach ($item in $itemsToInclude) {
    $sourcePath = Join-Path $extensionDir $item
    if (Test-Path $sourcePath) {
        Write-Host "  📄 Adding: $item" -ForegroundColor Gray
        Copy-Item $sourcePath $tempDir -Recurse
    } else {
        Write-Host "  ⚠️  Warning: $item not found, skipping" -ForegroundColor Yellow
    }
}

# Create the zip file
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force

# Clean up temp directory
Remove-Item $tempDir -Recurse -Force

# Get file size
$fileSize = (Get-Item $zipPath).Length / 1KB

Write-Host ""
Write-Host "✨ Extension packaged successfully!" -ForegroundColor Green
Write-Host "📍 Location: $zipPath" -ForegroundColor Cyan
Write-Host "📊 Size: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Extract the zip file" -ForegroundColor White
Write-Host "  2. Open Chrome/Edge: chrome://extensions/" -ForegroundColor White
Write-Host "  3. Enable 'Developer mode'" -ForegroundColor White
Write-Host "  4. Click 'Load unpacked' and select the extracted folder" -ForegroundColor White
Write-Host ""

# Open the output directory
Start-Process $outputDir
