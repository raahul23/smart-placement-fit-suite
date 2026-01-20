from pydantic import BaseModel
from typing import List


class ResumeAnalysis(BaseModel):
    skills: List[str]
    tools: List[str]
    strengths: List[str]
    weaknesses: List[str]


class JDAnalysis(BaseModel):
    required_keywords: List[str]
    preferred_keywords: List[str]
    role_level: str


class FitAnalysis(BaseModel):
    fit_score: int
    missing_keywords: List[str]
    improvements: List[str]
    recommended_projects: List[str]
    seven_day_plan: List[str]
