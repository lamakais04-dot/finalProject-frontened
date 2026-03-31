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

// -----BEGIN RSA PRIVATE KEY-----
// MIIEowIBAAKCAQEAo698Efxdd0TIKKe/PxQwt6EYFfh3r4f0HchpqSp50PEQ1Cfk
// T3Q8RgmFn2H136SOqy+dbMYFaBGl9IHc0sQuNowo4r+xsQu1jyUDMjdMItmKZyrg
// BRsP6AUi6A1GR/qw0WjE2tW/wYji61pC9jKp+GLYdJfXuxQXaafuRUHyGdcZSv75
// WhAAgRzSEi7bxeWT7SM2lcg4OXkYlzFQidV3QF8iJBFsFrxdOO7dFTrDk0sQ4Zt8
// 1KFKsep4RJdML9nFs4ww09xiu1+q1uck5kgx3p9yaIvLRThykzOmFCiOPIaFy/P8
// Izbow05WB+Cmxt4a51UijZMr+KkVMolDGtjniQIDAQABAoIBAEnOhARcJgz0j8h9
// MygPQ5RZaFHn0pfslq+jQbmMtJb5TBxNzI3jHJZ8Dqt6cXKhcc9QzgxREfkGFC23
// LMpAuZHRC1KLG2V4oSplhxZqhsMkEltIovDKbhax0jaOXcVxDa+vLSx7u1ZaEfAL
// qCv5VljwwSd5nEX33kK+/RpvjOoHMcB4/f8K9sID4j54nPoPNhf9BsSiitTa8Hgr
// JiRF4NYcGe8RbrkLezo/T9yv0QyYOqF0dKBGM7jUAZEE/EZwfGoKoeFTQCGGpUG9
// F9tMdRLztkU6ZTiV/Q/2zKCZTEgqW+pZ0Lr7MBSuNW2v5nVT1lgXIPl9+gAKHOql
// Ai+yI60CgYEA127vKRaVnL3sbiiiawyih3eAn7RblYZd6csVPrdvqhWTCuhqXsbC
// tMBwu804FLj8is79sfD+3sIsUYUar957hh78FaIMCIWwf1dxNl3wQUiaHGYNEYt1
// /jkjwdTd6S1Dq3PRoCS4iLC+jrahok7NHxu7j2KEA82VnbNUjuTZgj8CgYEAwoIF
// WDYp1ZO11S2FB5M9CQTBXMfkT4pHjUQqJye4Ii+UadDaH0RC1zW47L2CZ1y5wsta
// l9CGgDde6DN0EzR84cgU0LOwMzgyzlDBZgj+roks7IVjE/fYbUiA3oJGQye4SaYc
// s6Or7LwPJkpmSRhhjV5qiMahLQ3WZKGJtx/PFDcCgYByZrSWCyoz7B9LeESXuEPu
// 0CT7qhkgVBQ2/OMxRNQFbCODnVwvLDllJvQ2ponrZziktbq+7Y1K2a4TNC2xyuGp
// nXacPktJk0TgupyiFExrPpSoFAFImdh0wf8dBV86XhEbUQu2kQl1fPYUbyNyP4pp
// xJ5bTCNyqY+UCREUOK7QnQKBgQCcNDzEjaLlEV2qmIbIAZe3oWkD8MfKlNtHeKF9
// lmlKkvlWTVKOX4xqNouPG9YY2h+YbyUO3HjXiSAfzAqAzdsomz0UKensCErM44+d
// OMYHNsSsIabix1y4zswnZWm1zrUx+EP+hAey84gbEQ65zumw1U0rEJEplH5DjHMD
// bHkp2wKBgA8eubye8ZmqzQKW36FkUWu4tnRjZYwm3bPzkDXaj8kC4VrmBxVt2YRv
// pDlYeMBq7M1COvLYpgRg7gSh5NhMJ2FjB5/RY41+dZ5s3zd+piiV0Lxm4lVv/Pgk
// qVd3s6LdlGTHwqhkEYVRUlpcySTbfGk9II1me7UNAo85qKBgZc+o
// -----END RSA PRIVATE KEY-----



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