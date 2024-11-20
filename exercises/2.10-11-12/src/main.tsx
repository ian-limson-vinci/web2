import './index.css'
import { HomePage,CinemaPage, MovieListPage } from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "cinema",
        element: <CinemaPage />
      },
      {
        path: "movieList",
        element: <MovieListPage />
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
