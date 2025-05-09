import http from 'k6/http';
import { check } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export function sc_01(BASE){
    // 1. Sing In
  const userUid = uuidv4()
  const reg = http.post(`${BASE}/register`, JSON.stringify({
    email: `test${userUid}@k6.io`,
    password: '123456'
  }), { headers: { 'Content-Type': 'application/json' } });
  check(reg, { 'register ok': (r) => r.status === 200 });

  // 2. Log In
  const login = http.post(`${BASE}/login`, JSON.stringify({
    email: `test${userUid}@k6.io`,
    password: '123456'
  }), { headers: { 'Content-Type': 'application/json' } });
  check(login, { 'login ok': (r) => r.status === 200 });

  const token = login.json('access_token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
  
  // 3. Create post
  const post = http.post(`${BASE}/post`, JSON.stringify({
    content: `k6 post content ${userUid}`
  }), { headers: { 'Content-Type': 'application/json', ...authHeaders.headers } });
  check(post, { 'post ok': (r) => r.status === 200 });
  
  const postId = post.json('id');
  
  // 4. Create comment
  const authComment = http.post(`${BASE}/comment`, JSON.stringify({
    content: `k6 comment content ${userUid}`,
    post_id: postId
  }), { headers: { 'Content-Type': 'application/json', ...authHeaders.headers } });
  check(authComment, { 'auth comment ok': (r) => r.status === 200 });
  
  // 6. list posts
  const listPosts = http.get(`${BASE}/posts`);
  check(listPosts, { 'posts listed': (r) => r.status === 200 });

  // 7. list comments
  const listComments = http.get(`${BASE}/comments`);
  check(listComments, { 'comments listed': (r) => r.status === 200 });
}