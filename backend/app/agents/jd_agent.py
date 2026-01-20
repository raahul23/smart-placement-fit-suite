from pydantic_ai import Agent
from app.schemas.analysis import JDAnalysis

jd_agent = Agent(
    model="openai:gpt-4.1-mini",
    output_type=JDAnalysis,
    system_prompt="""
Analyze the job description and extract:
- required_keywords
- preferred_keywords
- role_level
Return structured data.
"""
)
