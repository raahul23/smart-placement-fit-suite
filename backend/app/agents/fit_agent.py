from pydantic_ai import Agent
from app.schemas.analysis import FitAnalysis

fit_agent = Agent(
    model="openrouter:openai/gpt-4o-mini",
    output_type=FitAnalysis,
    system_prompt="""
Compare resume analysis and JD analysis.
Return:
- fit_score
- missing_keywords
- improvements
- recommended_projects
- seven_day_plan
"""
)
