import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Menu from './pages/Menu'
import Reservation from './pages/Reservation'
import Item from './pages/Item'
import AddProduct from './pages/AddProduct'
import FoodMenu from './pages/FoodMenu'
import BrunchMenu from './pages/BrunchMenu'



function App() {
  

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/menus' element={<Menu/>} />
      <Route path='/reservation' element={<Reservation/>} />
      <Route path='/menu/:id' element={<Item/>} />
      <Route path='/addproduct' element={<AddProduct/>} />
      <Route path='/foodmenu' element={<FoodMenu/>} />
      <Route path='/brunch' element={<BrunchMenu/>} />
      
      
     </Routes>
    </>
  )
}

export default App
