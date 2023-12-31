import './Cards.scss';

//This function render every individual card
export const Cards = ({ img, name, author }) => {
	return (
		<div id='card'>
			<div className='image'>
				<img src={img} alt={name} />
			</div>

			<div className='text shadow p-2 m-3 rounded bg w-75'>
				<div className='name'>
					<h5 className='card-title text-center align-text-bottom'>{name}</h5>
					<p className='card-text text-center'>Author: {author}</p>
				</div>
			</div>
		</div>
	);
};
