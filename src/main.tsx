import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import I18n from './locales'
import Router from './Router.tsx'
import routes from './routes.ts'

import './reset.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <I18n>
      <Router routes={routes} />
    </I18n>
  </RecoilRoot>,
)
