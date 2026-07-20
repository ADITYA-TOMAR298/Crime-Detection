import uvicorn
from backend.database import engine
from backend.models import Base

Base.metadata.create_all(bind=engine)


if __name__ == "__main__":

    uvicorn.run(
        "backend.api:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
    )