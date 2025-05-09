from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User, Post, Comment
from auth import hash_password, verify_password, create_token
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class PostCreate(BaseModel):
    content: str

class CommentCreate(BaseModel):
    post_id: int
    content: str
    user_id: Optional[int] = None

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email exists")
    hashed = hash_password(user.password)
    db_user = User(email=user.email, hashed_password=hashed)
    db.add(db_user)
    db.commit()
    return {"msg": "registered"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid")
    token = create_token({"sub": db_user.email})
    return {"access_token": token}

@router.post("/post")
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    db_post = Post(content=post.content)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return {"id": db_post.id, "msg": "post created"}

@router.post("/comment")
def comment(data: CommentCreate, db: Session = Depends(get_db)):
    db_comment = Comment(content=data.content, post_id=data.post_id, user_id=data.user_id)
    db.add(db_comment)
    db.commit()
    return {"msg": "comment added"}

@router.get("/posts")
def list_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Post).offset(skip).limit(limit).all()

@router.get("/comments")
def list_comments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Comment).offset(skip).limit(limit).all()
