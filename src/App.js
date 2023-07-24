import {
	BrowserRouter as Browser,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Detail from './components/Pages/Detail/Detail.jsx';
import DataState from './context/podCast/dataState';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar/NavBar';

function App() {
	return (
		<Browser>
			<DataState>
				<NavBar />
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</DataState>
		</Browser>
	);
}

export default App;
