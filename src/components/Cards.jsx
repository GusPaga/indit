import './Cards.scss';

export const Cards = ({ img, name, author }) => {
	return (
		<div className='shadow p-3 m-3 rounded'>
			<img className='mx-auto' src={img} alt={name} />
			<div>
				<h5 className='card-title text-center'>{name}</h5>
				<p className='card-text text-center'>Author: {author}</p>
			</div>
		</div>
	);
};
