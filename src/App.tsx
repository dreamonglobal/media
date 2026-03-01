import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import BrowsePage from './pages/BrowsePage'
import SearchPage from './pages/SearchPage'
import UploadPage from './pages/UploadPage'
import VideoPage from './pages/VideoPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BrowsePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="video/:id" element={<VideoPage />} />
            <Route path="trip/:year/:trip" element={<BrowsePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
