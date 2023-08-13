import { Footer } from './Footer/Footer';
import { NavBar } from './NavBar/NavBar';

export const Layout = (props) => {
	return (
		<div>
			<NavBar />
			{props.children}
			<Footer />
		</div>
	);
};
