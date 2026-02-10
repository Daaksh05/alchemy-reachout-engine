# Kill any process running on port 8000
Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | ForEach-Object {
    $process = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "Killing process on port 8000: $($process.Name) (PID: $($process.Id))"
        Stop-Process -Id $process.Id -Force
    }
}

Write-Host "Starting Alchemy AI Backend & Frontend..."
Write-Host "Open http://localhost:8000 in your browser"
Write-Host "Press Ctrl+C to stop"

# Start the uvicorn server
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
