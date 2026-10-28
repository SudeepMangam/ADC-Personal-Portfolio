
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI()


# Step 4: Define the data model
class Project(BaseModel):
    id: int
    title: str = Field(min_length=1)
    description: str = Field(min_length=1)


# Temporary in-memory database
projects = [
    Project(
        id=1,
        title="Portfolio Website",
        description="Personal website built with React"
    ),
    Project(
        id=2,
        title="Research Project",
        description="A project showcasing my research"
    )
]




# Endpoint 1: GET project with ID
@app.get("/projects/{project_id}")
def get_project(project_id: int):
    for project in projects:
        if project.id == project_id:
            return project

    raise HTTPException(
        status_code=404,
        detail="Project not found"
    )


# Endpoint 2: POST new project
@app.post("/projects", status_code=201)
def add_project(project: Project):
    for existing in projects:
        if existing.id == project.id:
            raise HTTPException(
                status_code=409,
                detail="Project added"
            )

    projects.append(project)
    return project


# Endpoint 3: DELETE project with ID
@app.delete("/projects/{project_id}")
def delete_project(project_id: int):
    for project in projects:
        if project.id == project_id:
            projects.remove(project)
            return {"message": "Project deleted"}

    raise HTTPException(
        status_code=404,
        detail="Project not found"
    )
