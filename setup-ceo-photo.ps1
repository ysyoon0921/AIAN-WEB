# CEO photo setup for AIAN about page
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$assets = Join-Path $root "assets"
$dest = Join-Path $assets "ceo-kim.jpg"

if (-not (Test-Path $assets)) {
    New-Item -ItemType Directory -Path $assets | Out-Null
}

$searchDirs = @(
    (Join-Path $env:USERPROFILE "Downloads"),
    (Join-Path $env:USERPROFILE "Desktop"),
    (Join-Path $env:USERPROFILE "Pictures"),
    $root
)

Write-Host ""
Write-Host "=== AIAN CEO photo setup ===" -ForegroundColor Cyan
Write-Host ""

$found = @()
foreach ($dir in $searchDirs) {
    if (-not (Test-Path $dir)) { continue }
    Get-ChildItem -Path $dir -File -ErrorAction SilentlyContinue | Where-Object {
        $_.Extension -match '^\.(jpg|jpeg|png|webp)$'
    } | ForEach-Object {
        $found += $_
    }
}

$found = $found | Sort-Object LastWriteTime -Descending | Select-Object -Unique FullName

if ($found.Count -eq 0) {
    Write-Host "[ERROR] No image file found in common folders." -ForegroundColor Red
    Write-Host ""
    Write-Host "Manual steps:" -ForegroundColor Yellow
    Write-Host "  1. Save the CEO photo to your PC"
    Write-Host "  2. Copy it to:"
    Write-Host "     $assets"
    Write-Host "  3. Rename it to: ceo-kim.jpg"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Found image file(s):" -ForegroundColor Green
for ($i = 0; $i -lt [Math]::Min($found.Count, 10); $i++) {
    $f = $found[$i]
    $sizeKB = [math]::Round($f.Length / 1KB, 0)
    Write-Host "  [$($i + 1)] $($f.Name)  ($sizeKB KB)"
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
Write-Host "[OK] CEO photo copied successfully!" -ForegroundColor Green
Write-Host "  From: $($pick.FullName)"
Write-Host "  To:   $dest"
Write-Host ""
Write-Host "Next: run start-server.bat and open http://127.0.0.1:8080/about/ceo.html" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
