from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.resume_agent import resume_agent
from app.agents.jd_agent import jd_agent
from app.agents.fit_agent import fit_agent

router = APIRouter()


class AnalyzeRequest(BaseModel):
    resume: str
    jd: str


@router.post("/analyze")
async def analyze_resume(data: AnalyzeRequest):

    resume_result = await resume_agent.run(data.resume)
    jd_result = await jd_agent.run(data.jd)

    fit_result = await fit_agent.run({
        "resume_analysis": resume_result.data.model_dump(),
        "jd_analysis": jd_result.data.model_dump(),
    })

    return {
        "success": True,
        "data": {
            "resume_analysis": resume_result.data.model_dump(),
            "jd_analysis": jd_result.data.model_dump(),
            "fit_analysis": fit_result.data.model_dump(),
        }
    }
