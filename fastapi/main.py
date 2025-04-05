import logging
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import (
    List,
    AsyncIterator,
)
import os
from openai import OpenAI
from dotenv import load_dotenv  # type: ignore

from crayonai_stream import (
    CrayonMessage,
    templates_to_response_format,
    Error,
    TemplateDefinition,
    # setup_logging,
)
from crayonai_stream.integrations.openai import (
    openai_crayon_stream,
    toOpenAIMessage,
)

# Load environment variables from .env.local file at the project root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# setup_logging(logging.DEBUG)


@app.get("/")
def read_root():
    return {"status": "ok"}


class ChatRequest(BaseModel):
    messages: List[CrayonMessage]

    class Config:
        extra = "allow"  # Allow extra fields

class StepItem(BaseModel):
    title: str
    details: str

class Recipe(BaseModel):
    title: str
    cuisine: str
    cookingTime: int
    difficulty: str
    rating: float
    servings: int
    ingredients: List[str]
    steps: List[StepItem]


class BarChartDataItem(BaseModel):
    label: str
    value: float


class BarChart(BaseModel):
    title: str
    categoryKey: str
    data: List[BarChartDataItem]
    description: str = ""
    theme: str = "ocean"


class TemplateConfig:
    def __init__(self, schema, name, description):
        self.schema = schema
        self.name = name
        self.description = description

def create_response_format(template_config: TemplateConfig):
    return templates_to_response_format(
        TemplateDefinition(
            schema=template_config.schema,
            name=template_config.name,
            description=template_config.description,
        )
    )

# Template configurations
RECIPE_TEMPLATE = TemplateConfig(
    schema=Recipe,
    name="recipe",
    description="Use this template to display a recipe"
)

BARCHART_TEMPLATE = TemplateConfig(
    schema=BarChart,
    name="barchart",
    description="Use this template to display a bar chart visualization of data"
)

async def generate_stream(messages: List[CrayonMessage], template_config: TemplateConfig = RECIPE_TEMPLATE) -> AsyncIterator[str]:
    # Convert CrayonMessages to OpenAI format
    openai_messages = [toOpenAIMessage(msg) for msg in messages]
    try:
        response_format = create_response_format(template_config)
        stream = client.chat.completions.create(
            messages=openai_messages,
            model="gpt-4o",
            response_format=response_format,
            stream=True,
        )
        for chunk in openai_crayon_stream(stream):
            yield chunk
    except Exception as e:
        logging.error(e)
        yield Error(error=str(e)).toSSEString()


@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    # Determine which template to use based on the last message content
    # This is a simple approach - in a real app, you might want a more sophisticated method
    template_config = RECIPE_TEMPLATE  # Default to recipe template
    
    if request.messages:
        last_message = request.messages[-1]
        if hasattr(last_message, "message") and isinstance(last_message.message, str):
            message_lower = last_message.message.lower()
            # Check for keywords to determine the appropriate template
            if any(keyword in message_lower for keyword in ["chart", "graph", "data visualization", "bar chart", "barchart"]):
                template_config = BARCHART_TEMPLATE
    
    return StreamingResponse(
        generate_stream(request.messages, template_config),
        media_type="text/event-stream",
    )