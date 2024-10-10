import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import PasswordChange from './Components/PasswordChange';
import DisplayFlag from './Components/DisplayFlag';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/changePassword" element={<PasswordChange/>} />
        <Route path="/displayFlag" element={<DisplayFlag/>} />
      </Routes>
    </Router>
  );
}

export default App;