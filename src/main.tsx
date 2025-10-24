import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import About from './pages/About.tsx'
import Home from './pages/Home.tsx'
import BookSingle from './pages/BookSingle.tsx'

// Creer une route /livre/10
// Creer un composant BookSingle lie a cette route
// Mettre un lien vers la page sur la liste des livres
// Dans le composant faire un fetch pour aller chercher le livre 10 sur l'api et l'afficher
// Modifier la route /livre/10 pour que 10 soit dynamique
// Modifier les liens pour que cela corresponde a chacun des livres
// Modifier le composant pour recuperer le parametre dynamique dans l'url (hook de react router)

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <>4044444</>, // 404 globale
    children: [
      { index: true, Component: Home },
      { path: 'a-propos', Component: About },
      { path: 'livre/:id', Component: BookSingle },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
