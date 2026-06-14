from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from groq import Groq

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

class ChatRequest(BaseModel):
    message: str
    
class RecommendRequest(BaseModel):
    prompt: str
    movies: list

@app.post("/api/ai/chat")
async def chat(req: ChatRequest):
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are Binge Sensei, a highly knowledgeable and enthusiastic anime guru. Help users find their next favorite anime or answer their anime-related questions. Keep responses concise and engaging!"},
                {"role": "user", "content": req.message}
            ],
            temperature=0.7,
            max_tokens=500,
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ai/recommend")
async def recommend(req: RecommendRequest):
    try:
        movie_context = "\n".join([f"ID: {m['id']} Title: {m['title']} Description: {m['description']}" for m in req.movies])
        
        prompt = f"""Based on the user's prompt, recommend EXACTLY ONE movie from the following list. Return ONLY the ID of the movie. No other text.
User Prompt: {req.prompt}

Available Movies:
{movie_context}"""
        
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,
            max_tokens=10,
        )
        
        best_match_id = completion.choices[0].message.content.strip()
        
        try:
            best_match_id = int(best_match_id)
        except:
            best_match_id = -1
            
        return {"recommendation_id": best_match_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
