// const text =
// 	'N.O.R.E. & DJ EFN are the Drink Champs. In this episode the Champs chop it up with the legend himself, Large Professor! Large Pro talks his journey in music, helping create Main Source, working with NAS and much much more! Lots of great stories that you don’t want to miss!!Make some noise for Large Professor!! 💐💐💐🏆🏆🏆 *Subscribe to Patreon NOW for exclusive content, discount codes, M&G’s + more:  🏆* https://www.patreon.com/drinkchamps *Listen and subscribe at https://www.drinkchamps.com  Follow Drink Champs: https://www.instagram.com/drinkchamps https://www.twitter.com/drinkchamps https://www.facebook.com/drinkchamps https://www.youtube.com/drinkchamps  DJ EFN https://www.crazyhood.com https://www.instagram.com/whoscrazy https://www.twitter.com/djefn https://www.facebook.com/crazyhoodproductions  N.O.R.E. https://www.instagram.com/therealnoreaga https://www.twitter.com/noreaga See omnystudio.com/listener for privacy information.';

// const separarEnlaces = (text) => {
// 	const partes = text.split(' ');
// 	//console.log(partes);
// 	return partes.map((parte, index) => {
// 		if (parte.includes('https://')) {
// 			return (
// 				<span key={index}>
// 					<a href={parte} target='_blank' rel='noopener noreferrer'>
// 						{parte}
// 					</a>
// 					&nbsp;
// 				</span>
// 			);
// 		} else {
// 			return <span key={index}>{parte} &nbsp </span>;
// 		}
// 	});
// };
// console.log(separarEnlaces(text));

const dateString = '2023-07-21';

// Crear un objeto de fecha usando la cadena
const date = new Date(dateString);

// Obtener la fecha y hora en la zona horaria local
const fechaLocal = date.toLocaleString();

console.log(fechaLocal);
