# UTF-8 video setup script for AIAN hero background
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$assets = Join-Path $root "assets"
$dest = Join-Path $assets "hero-bg.mp4"

if (-not (Test-Path $assets)) {
    New-Item -ItemType Directory -Path $assets | Out-Null
}

$searchDirs = @(
    (Join-Path $env:USERPROFILE "Downloads"),
    (Join-Path $env:USERPROFILE "Desktop"),
    (Join-Path $env:USERPROFILE "Videos"),
    (Join-Path $env:USERPROFILE "Documents"),
    $root
)

Write-Host ""
Write-Host "=== AIAN hero video setup ===" -ForegroundColor Cyan
Write-Host ""

$found = @()
foreach ($dir in $searchDirs) {
    if (-not (Test-Path $dir)) { continue }
    Get-ChildItem -Path $dir -Filter "*.mp4" -File -ErrorAction SilentlyContinue | ForEach-Object {
        $found += $_
    }
}

$found = $found | Sort-Object LastWriteTime -Descending | Select-Object -Unique FullName

if ($found.Count -eq 0) {
    Write-Host "[ERROR] No .mp4 file found in common folders." -ForegroundColor Red
    Write-Host ""
    Write-Host "Searched:" -ForegroundColor Yellow
    foreach ($dir in $searchDirs) { Write-Host "  - $dir" }
    Write-Host ""
    Write-Host "Manual steps:" -ForegroundColor Yellow
    Write-Host "  1. Find your video file in File Explorer"
    Write-Host "  2. Copy it to this folder:"
    Write-Host "     $assets"
    Write-Host "  3. Rename it to: hero-bg.mp4"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Found MP4 file(s):" -ForegroundColor Green
for ($i = 0; $i -lt $found.Count; $i++) {
    $f = $found[$i]
    $sizeMB = [math]::Round($f.Length / 1MB, 1)
    Write-Host "  [$($i + 1)] $($f.Name)  ($sizeMB MB)"
    Write-Host "      $($f.FullName)" -ForegroundColor DarkGray
}

$pick = $found[0]
if ($found.Count -gt 1) {
    Write-Host ""
    $choice = Read-Host "Enter number to use (default: 1)"
    if ($choice -match '^\d+$') {
        $idx = [int]$choice - 1
        if ($idx -ge 0 -and $idx -lt $found.Count) { $pick = $found[$idx] }
    }
}

Copy-Item -Path $pick.FullName -Destination $dest -Force

Write-Host ""
Write-Host "[OK] Video copied successfully!" -ForegroundColor Green
Write-Host "  From: $($pick.FullName)"
Write-Host "  To:   $dest"
Write-Host ""
Write-Host "Next: run start-server.bat and open http://127.0.0.1:8080/" -ForegroundColor Cyan
Write-Host "Then press Ctrl+Shift+R in the browser." -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
