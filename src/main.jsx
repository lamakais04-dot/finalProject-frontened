import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
)


//  יוזר 1 – בית ג׳ן
// {
//   "firstname": "סאלח",
//   "lastname": "אבו רוקון",
//   "birthdate": "1996-03-14",
//   "address": "בית ג׳ן",
//   "gender": "male",
//   "email": "saleh.aburokon@test.com",
//   "password": "Saleh!1996",
//   "phonenumber": "0523456781",
//   "imageurl": null
// }

//  יוזר 2 – בית ג׳ן
// {
//   "firstname": "רנא",
//   "lastname": "חלבי",
//   "birthdate": "1999-08-22",
//   "address": "בית ג׳ן",
//   "gender": "female",
//   "email": "rana.halabi@test.com",
//   "password": "Rana@1999",
//   "phonenumber": "0546789123",
//   "imageurl": null
// }

//  יוזר 3 – בית ג׳ן
// {
//   "firstname": "ואסים",
//   "lastname": "פרחאת",
//   "birthdate": "1994-01-09",
//   "address": "בית ג׳ן",
//   "gender": "male",
//   "email": "wasim.farhat@test.com",
//   "password": "Wasim#9401",
//   "phonenumber": "0508899776",
//   "imageurl": null
// }

//  יוזר 4 – בית ג׳ן
// {
//   "firstname": "לינא",
//   "lastname": "סעיד",
//   "birthdate": "2001-06-30",
//   "address": "בית ג׳ן",
//   "gender": "female",
//   "email": "lina.saeed@test.com",
//   "password": "Lina!2001",
//   "phonenumber": "0532211445",
//   "imageurl": null
// }