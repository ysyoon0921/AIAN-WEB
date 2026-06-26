# AIAN logo setup — copy mark + wordmark PNG files into assets/
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$assets = Join-Path $root "assets"
$markDest = Join-Path $assets "aian-mark.png"
$wordDest = Join-Path $assets "aian-wordmark.png"

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
Write-Host "=== AIAN logo setup ===" -ForegroundColor Cyan
Write-Host ""

$images = @()
foreach ($dir in $searchDirs) {
    if (-not (Test-Path $dir)) { continue }
    Get-ChildItem -Path $dir -File -ErrorAction SilentlyContinue | Where-Object {
        $_.Extension -match '^\.(png|jpg|jpeg|webp|svg)$'
    } | ForEach-Object { $images += $_ }
}

$images = $images | Sort-Object LastWriteTime -Descending | Select-Object -Unique FullName

if ($images.Count -lt 2) {
    Write-Host "[ERROR] Need at least 2 image files (mark icon + AIAN wordmark)." -ForegroundColor Red
    Write-Host ""
    Write-Host "Manual steps:" -ForegroundColor Yellow
    Write-Host "  1. Save the mark icon as:  $markDest"
    Write-Host "  2. Save the AIAN text as:  $wordDest"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Found image file(s):" -ForegroundColor Green
for ($i = 0; $i -lt [Math]::Min($images.Count, 12); $i++) {
    $f = $images[$i]
    Write-Host "  [$($i + 1)] $($f.Name)"
    Write-Host "      $($f.FullName)" -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "Pick the MARK icon (two peaks / M shape):" -ForegroundColor Cyan
$markChoice = Read-Host "Enter number (default: 2)"
$markIdx = 1
if ($markChoice -match '^\d+$') { $markIdx = [Math]::Max(0, [int]$markChoice - 1) }

Write-Host "Pick the WORDMARK (AIAN text):" -ForegroundColor Cyan
$wordChoice = Read-Host "Enter number (default: 1)"
$wordIdx = 0
if ($wordChoice -match '^\d+$') { $wordIdx = [Math]::Max(0, [int]$wordChoice - 1) }

$markSrc = $images[$markIdx]
$wordSrc = $images[$wordIdx]

Copy-Item -Path $markSrc.FullName -Destination $markDest -Force
Copy-Item -Path $wordSrc.FullName -Destination $wordDest -Force

Write-Host ""
Write-Host "[OK] Logo files copied!" -ForegroundColor Green
Write-Host "  Mark:      $markDest"
Write-Host "  Wordmark:  $wordDest"
Write-Host ""
Write-Host "Refresh http://127.0.0.1:8080/ with Ctrl+Shift+R" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
