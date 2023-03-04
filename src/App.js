import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import './index.css'
import PostList from './pages/PostList'
import EditPost from './pages/EditPost'
import AddNewPost from './pages/AddPost'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />
          <Route path="/posts/:postId?" element={<EditPost />} />
          <Route path="/posts/add" element={<AddNewPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App