# Script para fazer upload do projeto NITRON FLOW para GitHub
# Execute este script no PowerShell

Write-Host "=== Upload NITRON FLOW para GitHub ===" -ForegroundColor Cyan

# Verificar se Git está instalado
$gitPath = $null
$possiblePaths = @(
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\bin\git.exe"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $gitPath = $path
        break
    }
}

if (-not $gitPath) {
    Write-Host "ERRO: Git não está instalado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Git de: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Ou use GitHub Desktop: https://desktop.github.com/" -ForegroundColor Yellow
    exit 1
}

Write-Host "Git encontrado em: $gitPath" -ForegroundColor Green

# Navegar para o diretório do projeto
$projectPath = "C:\Users\lucca\Downloads\VALENSTECHNOVAVERSAO\VALENSTECHNOVAVERSAO-main"
Set-Location $projectPath

Write-Host "`nConfigurando Git..." -ForegroundColor Cyan
& $gitPath config --global user.name "luccavalentin"
& $gitPath config --global user.email "luccasantana88@gmail.com"

Write-Host "`nInicializando repositório..." -ForegroundColor Cyan
& $gitPath init

Write-Host "`nAdicionando arquivos..." -ForegroundColor Cyan
& $gitPath add .

Write-Host "`nFazendo commit..." -ForegroundColor Cyan
& $gitPath commit -m "Initial commit: NITRON FLOW - Landing page completa com logo e design moderno"

Write-Host "`nConfigurando remote..." -ForegroundColor Cyan
& $gitPath remote remove origin 2>$null
& $gitPath remote add origin https://github.com/luccavalentin/NITRON-FLOW-1.-PAGINA.git

Write-Host "`nRenomeando branch para main..." -ForegroundColor Cyan
& $gitPath branch -M main

Write-Host "`nFazendo push para GitHub..." -ForegroundColor Cyan
Write-Host "NOTA: Você precisará fazer login no GitHub quando solicitado." -ForegroundColor Yellow
& $gitPath push -u origin main

Write-Host "`n=== Upload concluído! ===" -ForegroundColor Green
Write-Host "Acesse: https://github.com/luccavalentin/NITRON-FLOW-1.-PAGINA" -ForegroundColor Cyan

