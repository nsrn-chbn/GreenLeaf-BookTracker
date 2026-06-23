import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Homepage from './pages/homepage/homepage'
import MyBooks from './pages/my books/mybooks'
import AddBook from './pages/add book/AddBook'

function App() {
  return (

<div>

<Router>
<Routes>

<Route path="/" element={<Homepage/>}/>
<Route path="/mybooks" element={<MyBooks/>}/>
<Route path="/addbook" element={<AddBook/>}/>
<Route path="*" element={<div>no page found</div>} />


</Routes>
</Router>

</div>
)
}

export default App