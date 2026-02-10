from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# Mount the static directory to serve CSS, JS, Images
app.mount("/static", StaticFiles(directory="."), name="static")

@app.get("/")
async def read_index():
    return FileResponse('index.html')

# Explicitly serve specific files if needed, or let StaticFiles handle them if organized differently.
# Currently, everything is in the root, so we might need a specific handling or reorganize.
# However, common pattern is to putting assets in 'static' folder.
# Since the user has everything in root, let's serve specific files or mount root (be careful with security in prod, but fine for local tool).

@app.get("/styles.css")
async def get_css():
    return FileResponse('styles.css')

@app.get("/script.js")
async def get_js():
    return FileResponse('script.js')

@app.get("/logo.png")
async def get_logo():
    return FileResponse('logo.png')
