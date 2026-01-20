from pydantic_ai import Agent
from app.schemas.analysis import ResumeAnalysis

resume_agent = Agent(
    model="openai:gpt-4.1-mini",
    output_type=ResumeAnalysis,
    system_prompt="""
Analyze the resume and extract:
- skills
- tools
- strengths
- weaknesses
Return structured data.
"""
)
