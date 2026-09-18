$root = $PSScriptRoot
$port = 8791
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".xml"  = "application/xml; charset=utf-8"
  ".txt"  = "text/plain; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".ico"  = "image/x-icon"
  ".pdf"  = "application/pdf"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $req = $context.Request
  $res = $context.Response
  try {
    $path = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
    if ($path -eq "/") { $path = "/index.html" }
    $filePath = Join-Path $root ($path.TrimStart("/"))
    if ((-not (Test-Path $filePath -PathType Leaf)) -and ([System.IO.Path]::GetExtension($filePath) -eq "")) {
      # Emulate Vercel's cleanUrls: /about -> about.html
      $filePath = "$filePath.html"
    }
    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $contentType = $mime[$ext]
      if (-not $contentType) { $contentType = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $res.ContentType = $contentType
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $notFoundPath = Join-Path $root "404.html"
      $bytes = [System.IO.File]::ReadAllBytes($notFoundPath)
      $res.StatusCode = 404
      $res.ContentType = "text/html; charset=utf-8"
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    }
  } catch {
  } finally {
    $res.OutputStream.Close()
  }
}
