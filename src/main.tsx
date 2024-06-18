import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from './components/auth/Auth0Provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </Router>,
)
